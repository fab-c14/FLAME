import { Router } from "express";
import Question from '../models/Question.js';
import User from '../models/User.js';
const router = Router();


router.post('/updateUserStats', async (req, res) => {
    const { userId, testResult } = req.body;
    const result = testResult.some(test=>test.remarks==='Pass')
    console.log(userId,testResult);
    try {
        // Find the user by userId
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(result);
        // Analyze test results
        if (result) {
            user.stats.successfulRuns += 1;
        } else if (!result) {
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