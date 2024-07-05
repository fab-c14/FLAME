import { Router } from "express";
import SnippetStore from '../models/SnippetStore.js';
import User from '../models/User.js'
import mongoose from "mongoose";
const router = Router();
router.post("/saveCode", async (req, res) => {
    const { userId, sourceCode, language, name, questionId,questionTitle} = req.body;
    try {
        // Check if an existing snippet with the same user ID and question ID exists
        const existingSnippet = await SnippetStore.findOne({ userId, questionId,language });

        if (existingSnippet) {
            
            existingSnippet.code = sourceCode;
            existingSnippet.save();
        } else {
            
            const newSnippet = new SnippetStore({ userId, language, code: sourceCode, submittedBy: name, questionId,questionTitle:questionTitle });
            await newSnippet.save();
        }

       
        const user = await User.findOne({ _id:userId });
        if (user.stats.solvedQuestions.includes(questionId)) {
            console.log("Question ID already exists in solvedQuestions");
           
        } else {
          
            user.stats.solvedQuestions.push(questionId);
            await user.save();
            console.log("Question ID added successfully");
        }
        await user.save();
        res.status(200).json({ message: "Code saved successfully" });
    } catch (error) {
        console.error("Error saving code:", error);
        res.status(500).json({ error: error.message });
    }
});



router.post("/getAnswers", async (req, res) => {
    const { userId } = req.body;
    try {
        const answers = await SnippetStore.find({ userId });
        res.status(200).json(answers);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});


export default router;
