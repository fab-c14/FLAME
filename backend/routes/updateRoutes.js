import { Router } from "express";
import Question from '../models/Question.js';
import User from '../models/User.js';
const router = Router();

router.post("/updateQuestionAnswers", async (req, res) => {
    const { userId, questionId } = req.body;

    try {
        const updatedSolved = await Question.findOne({ questionId });
        if (updatedSolved.stats.solvedQuestions.includes(questionId)) {
            // Question ID already exists, return an appropriate message
            res.status(200).json({ message: "Question ID already added" });
        } else {
            // Add the question ID to the solvedQuestions array
            updatedSolved.stats.solvedQuestions.push(questionId);
            await updatedSolved.save();
            res.status(200).json({ message: "Answer updated successfully" });
        }
    } catch (error) {
        console.error("Error updating question ID:", error);
        res.status(500).json({ error: error.message });
    }
});



router.post('/updateUserStats', async (req, res) => {
    const { userId, testResult } = req.body;

    try {
        // Find the user by userId
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Analyze test results
        if (testResult === 'success') {
            user.stats.successfulRuns += 1;
        } else if (testResult === 'failed') {
            user.stats.failedRuns += 1;
        }

        // Update totalRuns
        user.stats.totalRuns = user.stats.successfulRuns + user.stats.failedRuns;

        // Save the updated user data
        await user.save();

        res.status(200).json({ message: 'User stats updated successfully' });
    } catch (error) {
        console.error('Error updating user stats:', error);
        res.status(500).json({ error: error.message });
    }
});

// Other routes and middleware...






export default router;