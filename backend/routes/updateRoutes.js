import { Router } from "express";
import Question from '../models/Question.js';
import User from '../models/User.js';
const router = Router();

router.post("/updateQuestionAnswers",async (req, res)=>{
    const {userId,questionId} = req.body;
    console.log(userId,questionId);
    
    const updatedSolved = await Question.findOne({ questionId });
    updatedSolved.stats.solvedQuestions = updatedSolved.stats.solvedQuestions.push(questionId)
    await updatedSolved.save();
    res.status(200).json({ message: "Answer updated successfully" });
    res.status(200).json("success in updating question id of answers");
})

router.post('/updateUserStats',async(req,res)=>{
    const {userId,...newStats} = req.body;
    console.log(userId,newStats);
    res.status(200).json("success");
})


export default router;