import { Router } from 'express';
import { CodeExecutor } from 'code-executor';

const router = Router();
const codeExecutor = new CodeExecutor('myExecutor', 'redis://127.0.0.1:6379');

router.post('/execute', async (req, res) => {
    const inputs = Object.values(req.body);

    try {
        const results = await Promise.all(
            inputs.map(async (input) => {
                const result = await codeExecutor.runCode(input);
                return result;
            })
        );
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Code execution failed', details: error.message });
    } finally {
        await codeExecutor.stop();  // Ensure this line waits for the codeExecutor to stop
    }
});

export default router;
