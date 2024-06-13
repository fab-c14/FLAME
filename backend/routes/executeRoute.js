import { Router } from 'express';
import { CodeExecutor, Worker } from 'code-executor';

const router = Router();
const executorUrl = 'https://6379-fabc14-flame-vap42gcrp5o.ws-us114.gitpod.io';
const codeExecutor = new CodeExecutor('myExecutor', executorUrl);
const worker = new Worker('myExecutor', executorUrl);

async function buildWorker() {
    await worker.build();
    console.log('containers build success');
}

// Build the worker containers when the application starts
buildWorker().catch(error => {
    console.error('Failed to build containers:', error);
});

router.post('/execute', async (req, res) => {
    const inputs = {
        language: "Python",
        code: 'print("hello\n")',
        testCases: [
            {
                input: "",
                output: "hello\n"
            }
        ],
        timeout: 2
    };

    try {
        console.log('Received input:', inputs);
        
        // Ensure the worker is started
        worker.start();
        
        // Run the code using CodeExecutor and wait for the result
        const results = await codeExecutor.runCode(inputs);
        
        // Return the results to the client
        res.status(200).json(results);
    } catch (error) {
        console.error('Code execution failed:', error);
        res.status(500).json({ error: 'Code execution failed', details: error.message });
    } finally {
        // Stop the code executor to clean up resources
        await codeExecutor.stop();
    }
});

export default router;
