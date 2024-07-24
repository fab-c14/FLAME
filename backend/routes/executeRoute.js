import { Router } from "express";
import { CodeExecutor, Worker } from "code-executor";
import { createClient } from "redis";
import SnippetStore from "../models/SnippetStore.js";
import dotenv from "dotenv";

const router = Router();
dotenv.config();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Create Redis client with provided connection details
const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: "redis-19823.c98.us-east-1-4.ec2.redns.redis-cloud.com",
    port: 19823,
  },
});

client.on("connect", () => {
  console.log("Connected to Redis");

  // Route setup after successful Redis connection
  router.post("/execute", async (req, res) => {
    let inputs = req.body;
    inputs = inputs.input;

    let buildLang = inputs.language;
    if (buildLang === "Cpp") {
      buildLang = "Cplusplus";
      inputs.language = buildLang;
    } else if (buildLang === "Csharp") {
      buildLang = "csharp";
      inputs.language = buildLang;
    } else if (buildLang === "Java") {
      buildLang = "Java";
      inputs.language = buildLang;
    }
    console.log(buildLang);

    const randNO = getRandomInt(1000);
    const redisUrl = `redis://:${process.env.REDIS_PASSWORD}@redis-19823.c98.us-east-1-4.ec2.redns.redis-cloud.com:19823`;

    const codeExecutor = new CodeExecutor("myExecutor", redisUrl);
    const worker = new Worker("myExecutor", redisUrl);

    try {
      await worker.build([buildLang]);
      worker.start();

      console.log("Received input:", inputs);

      const results = await codeExecutor.runCode(inputs);
      let i = 0;
      if (inputs.testCases) {
        const testResults = inputs.testCases.map((testCase) => {
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
      res
        .status(500)
        .json({ error: "Code execution failed", details: error.message });
    } finally {
      await codeExecutor.stop();
    }
    console.log("Execution finished.");
  });
});

client.on("error", (error) => {
  console.error("Redis error:", error);
});

client.connect();

export default router;
