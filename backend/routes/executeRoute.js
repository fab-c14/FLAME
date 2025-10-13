import { Router } from "express";
import { CodeExecutor, Worker } from "code-executor";
import { createClient } from "redis";
import dotenv from "dotenv";
import fs from 'fs';
import os from 'os';
import path from 'path';
import { exec } from 'child_process';

dotenv.config();

const router = Router();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// If Redis is configured, use the existing Redis-backed executor.
if (process.env.REDIS_HOST) {
  // Connect to Redis Cloud
  const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    },
  });

  client.on("connect", () => {
    console.log("Connected to Redis Cloud");

    // Setup route once connected
    router.post("/execute", async (req, res) => {
      let inputs = req.body.input;

      let buildLang = inputs.language;
      if (buildLang === "Cpp") {
        buildLang = "Cplusplus";
        inputs.language = buildLang;
      } else if (buildLang === "Csharp") {
        buildLang = "csharp";
        inputs.language = buildLang;
      }

      console.log("Build language:", buildLang);

      const redisUrl = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

      const codeExecutor = new CodeExecutor("myExecutor", redisUrl);
      const worker = new Worker("myExecutor", redisUrl);

      try {
        await worker.build([buildLang]);
        worker.start();

        console.log("Received input:", inputs);

        const results = await codeExecutor.runCode(inputs);
        if (inputs.testCases) {
          const testResults = inputs.testCases.map((testCase, i) => {
            const obtainedOutput = results.tests[i].obtainedOutput.trim() || "";
            const remarks = results.tests[i].remarks;
            return {
              ...testCase,
              obtainedOutput,
              remarks,
              exitCode: results.run?.exitCode || 0,
            };
          });
          res.status(200).json({ tests: testResults });
        } else {
          res.status(200).json(results);
        }
      } catch (error) {
        console.error("Code execution failed:", error);
        res.status(500).json({
          error: "Code execution failed",
          details: error.message,
        });
      } finally {
        await codeExecutor.stop();
      }

      console.log("Execution finished.");
    });
  });

  client.on("error", (error) => {
    console.error("Redis error:", error);
  });

  // Connect to Redis Cloud
  client.connect().catch((err) => {
    console.error('Failed to connect to Redis:', err.message || err);
  });
} else {
  // Redis not configured — provide a local in-process executor so tests can run without Redis.

  const TMP = os.tmpdir();

  const runCommand = (command, input, opts = {}) => {
    const timeout = opts.timeout || 10000; // default 10s
    return new Promise((resolve) => {
      const child = exec(command, { timeout, maxBuffer: 10 * 1024 * 1024 }, (error, stdout, stderr) => {
        const exitCode = error && error.code ? error.code : 0;
        resolve({ stdout: stdout || '', stderr: stderr || '', exitCode });
      });
      if (input != null) {
        try {
          child.stdin.write(String(input));
        } catch (e) {
          // ignore
        }
      }
      try { child.stdin.end(); } catch (e) {}
    });
  };

  const writeTemp = (ext, content) => {
    const id = Date.now() + '-' + Math.floor(Math.random() * 10000);
    const filename = path.join(TMP, `flame-${id}.${ext}`);
    fs.writeFileSync(filename, content, { encoding: 'utf8' });
    return filename;
  };

  async function runLocalCode(code, language, input) {
    language = (language || '').toLowerCase();
    if (language === 'javascript' || language === 'js') {
      const file = writeTemp('js', code);
      const r = await runCommand(`node "${file}"`, input, { timeout: 8000 });
      try { fs.unlinkSync(file); } catch (e) {}
      return r;
    }
    if (language === 'python' || language === 'py') {
      const file = writeTemp('py', code);
      const r = await runCommand(`python "${file}"`, input, { timeout: 8000 });
      try { fs.unlinkSync(file); } catch (e) {}
      return r;
    }
    if (language === 'c') {
      const src = writeTemp('c', code);
      const exe = path.join(TMP, `flame-${Date.now()}.out`);
      const build = await runCommand(`gcc "${src}" -o "${exe}"`, null, { timeout: 10000 });
      if (build.exitCode !== 0 || build.stderr) {
        try { fs.unlinkSync(src); } catch (e) {}
        return { stdout: '', stderr: build.stderr || 'compile error', exitCode: 1 };
      }
      const run = await runCommand(`"${exe}"`, input, { timeout: 8000 });
      try { fs.unlinkSync(src); fs.unlinkSync(exe); } catch (e) {}
      return run;
    }
    if (language === 'c++' || language === 'cpp' || language === 'cplusplus') {
      const src = writeTemp('cpp', code);
      const exe = path.join(TMP, `flame-${Date.now()}.out`);
      const build = await runCommand(`g++ "${src}" -o "${exe}"`, null, { timeout: 10000 });
      if (build.exitCode !== 0 || build.stderr) {
        try { fs.unlinkSync(src); } catch (e) {}
        return { stdout: '', stderr: build.stderr || 'compile error', exitCode: 1 };
      }
      const run = await runCommand(`"${exe}"`, input, { timeout: 8000 });
      try { fs.unlinkSync(src); fs.unlinkSync(exe); } catch (e) {}
      return run;
    }

    // default: try node execution
    const file = writeTemp('txt', code);
    const r = await runCommand(`node "${file}"`, input, { timeout: 8000 });
    try { fs.unlinkSync(file); } catch (e) {}
    return r;
  }

  router.post('/execute', async (req, res) => {
    const inputs = req.body.input || {};
    let buildLang = inputs.language || '';
    if (buildLang === 'Cpp') {
      buildLang = 'Cplusplus';
      inputs.language = buildLang;
    } else if (buildLang === 'Csharp') {
      buildLang = 'csharp';
      inputs.language = buildLang;
    }

    try {
      if (inputs.testCases && Array.isArray(inputs.testCases)) {
        const results = [];
        for (let i = 0; i < inputs.testCases.length; ++i) {
          const tc = inputs.testCases[i];
          const runRes = await runLocalCode(inputs.code || inputs.template || '', buildLang, tc.input || '');
          const obtainedOutput = (runRes.stdout || '').toString().trim();
          const expected = (tc.expectedOutput || tc.output || '').toString().trim();
          const pass = expected ? obtainedOutput === expected : false;
          results.push({
            ...tc,
            obtainedOutput,
            remarks: pass ? 'PASS' : 'FAIL',
            exitCode: pass ? 0 : (runRes.exitCode || 1),
            rawStdout: runRes.stdout,
            rawStderr: runRes.stderr,
          });
        }
        return res.status(200).json({ tests: results });
      } else {
        // single run
        const runRes = await runLocalCode(inputs.code || inputs.template || '', buildLang, inputs.stdin || inputs.input || '');
        return res.status(200).json({ run: { stdout: runRes.stdout, stderr: runRes.stderr, exitCode: runRes.exitCode } });
      }
    } catch (err) {
      console.error('Local execution error:', err);
      return res.status(500).json({ error: 'Local execution failed', details: err.message || String(err) });
    }
  });
}

export default router;
