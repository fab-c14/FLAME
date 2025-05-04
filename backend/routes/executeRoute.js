import { Router } from "express";
import { CodeExecutor, Worker } from "code-executor";
import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

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
client.connect();

export default router;
