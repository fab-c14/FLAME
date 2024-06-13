import { Router } from 'express';
import { CodeExecutor, Worker } from 'code-executor';

const router = Router();
const executorUrl = process.env.REDIS_URL;
const codeExecutor = new CodeExecutor('myExecutor', executorUrl);


router.post('/execute', async (req, res) => {

    const pythonCode = `
        import time
        time.sleep(1)
        print('hello')
        `;

        const bashCode = `
        echo hello
        `;


    const inputs = [{
        language: 'Python',
        code: pythonCode,
        testCases: [
            {
                input: '',
                output: 'hello\n',
            },
        ],
        timeout: 2,
    },
    {
        language: 'Bash',
        code: bashCode,
        testCases: [
            {
                input: '',
                output: 'hello\n',
            },
        ],
        timeout: 2,
    }];

    try {
        console.log('Received input:', inputs);
        
      
        
        const results = await Promise.all(
            inputs.map((input) => codeExecutor.runCode(input)),
            codeExecutor.stop());
    
       
        
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
