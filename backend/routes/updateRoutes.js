import { Router } from "express";
import Question from '../models/Question.js';
import User from '../models/User.js';
const router = Router();

router.post("/updateQuestionAnswers",async (req, res)=>{
    const questionId = req.body;
    console.log(questionId);

    res.status(200).json("success in updating question id of answers");
})

router.post('/updateUserStats',async(req,res)=>{
    const {userId,...newStats} = req.body;
    console.log(userId,newStats);
    res.status(200).json("success");
})


export default router;