// src/routes/codeExecutorRoutes.js

import { Router } from 'express';
import { CodeExecutor } from 'code-executor';

const router = Router();
const codeExecutor = new CodeExecutor('myExecutor', 'redis://127.0.0.1:6379');

router.post('/execute', async (req, res) => {
    const inputs = req.body;

    try {
        const results = await Promise.all(
            inputs.map((input) => codeExecutor.runCode(input)),
        );
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ error: 'Code execution failed' });
    } finally {
        codeExecutor.stop();
    }
});

export default router;
