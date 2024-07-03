import { Router } from "express";
import SnippetStore from '../models/SnippetStore.js';

const router = Router();

router.post("/saveCode", async (req, res) => {
    const { userId, sourceCode, language, name, questionId } = req.body;
    try {
        const newSnippet = new SnippetStore({ userId, language, code: sourceCode, submittedBy: name, questionId });
        await newSnippet.save();
        res.status(200).json({ data: "Saved Code Successfully", snippet: newSnippet });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/getAnswers", async (req, res) => {
    const {userId} = req.body;
    console.log(userId)
    try {
        const answers = await SnippetStore.find();
        res.status(200).json(answers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
