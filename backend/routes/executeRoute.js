import { Router } from 'express';
import { CodeExecutor,Worker } from 'code-executor';

const router = Router();
const executorUrl = process.env.REDIS_URL;
const codeExecutor = new CodeExecutor('myExecutor','redis://127.0.0.1:6379');

const worker = new Worker('myExecutor', 'redis://127.0.0.1:6379');

router.post('/execute', async (req, res) => {

    const pythonCode = `
    print('hello')`;

    const inputs = {
        language: 'Python',
        code: pythonCode,
        testCases: [
            {
                input: '',
                output: 'hello\n',
            },
        ],
        timeout: 2,
    };
   

    try {
        console.log('Received input:', inputs);
        await worker.build();
        await worker.start();
        const results = await codeExecutor.runCode(inputs);
       console.log("promise solved");
        
        // Return the results to the client
        res.status(200).json(results);
    } catch (error) {
        console.error('Code execution failed:', error);
        res.status(500).json({ error: 'Code execution failed', details: error.message });
    } finally {
        // Stop the code executor to clean up resources
        await codeExecutor.stop();
    }
    console.log("executed finished");
});

export default router;
