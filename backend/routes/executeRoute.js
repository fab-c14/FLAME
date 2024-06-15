import { Router } from 'express';
import { CodeExecutor,Worker } from 'code-executor';

const router = Router();
const executorUrl = process.env.REDIS_URL;

// random worker generator
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  



router.post('/execute', async (req, res) => {
    const randNO = getRandomInt(1000);
    const codeExecutor = new CodeExecutor('myExecutor' + randNO);

    const worker = new Worker('myExecutor' + randNO);
    await worker.build(['Python']);
    await worker.start();

    const pythonCode = `print('hello')`;

    const inputs = {
        language: 'Python',
        code: pythonCode,
        testCases: [
            {
                input: '',
                output: 'hello\n',
    
            },{
                input:'',
                output:'tello',
            }
        ],
        timeout: 2,
    };
   

    try {
        console.log('Received input:', inputs);
       
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
