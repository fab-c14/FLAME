import { Router } from 'express';
import { CodeExecutor, Worker } from 'code-executor';
import RedisServer from 'redis-server';


const router = Router();
const executorUrl = process.env.REDIS_URL;

// Random worker generator
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Initialize Redis server
const server = new RedisServer(6379);
server.open((err) => {
  if (err === null) {
    console.log('Redis server started successfully.');
  }
});

router.post('/execute', async (req, res) => {
  let inputs = req.body;
  console.log(inputs.input);
  inputs = inputs.input;
  const buildLang = inputs.language;
  const randNO = getRandomInt(1000);
  const codeExecutor = new CodeExecutor('myExecutor' + randNO, executorUrl);

  const worker = new Worker('myExecutor' + randNO, executorUrl);
  await worker.build([buildLang]);
  await worker.start();

  try {
    console.log('Received input:', inputs);

    const results = await codeExecutor.runCode(inputs);
    console.log('Promise resolved.');

    // Return the results to the client
    res.status(200).json(results);
  } catch (error) {
    console.error('Code execution failed:', error);
    res.status(500).json({ error: 'Code execution failed', details: error.message });
  } finally {
    // Stop the code executor to clean up resources
    await codeExecutor.stop();
  }
  console.log('Execution finished.');
});

export default router;
// Implement it here instead of starting the server separately
