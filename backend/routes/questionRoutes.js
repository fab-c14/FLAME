import express from 'express';
import Question from '../models/Question.js';
import Batch from '../models/Batch.js';
const router = express.Router();

// Create a question
// Create a question and associate it with a batch
router.post('/createQuestion', async (req, res) => {
  const { title, testCases, createdBy, batchId } = req.body;
  console.log(title, testCases, createdBy, batchId);
  try {
    // Create a new question
    const newQuestion = new Question({ title, testCases, createdBy, batchId });
    await newQuestion.save();

    // Update the batch with the new question
    const batch = await Batch.findById(batchId);
    if (batch) {
      batch.questions.push(newQuestion._id); // Assuming you have a 'questions' field in your Batch schema
      await batch.save();
    }

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create question', error });
  }
});



// Get questions by batch
router.get('/batch/:batchId', async (req, res) => {
  try {
    const questions = await Question.find({ batchId: req.params.batchId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions', error });
  }
});

// Mark question as solved
router.put('/:questionId/solve', async (req, res) => {
  const { userId } = req.body;
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question.solvedBy.includes(userId)) {
      question.solvedBy.push(userId);
    }
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: 'Failed to mark question as solved', error });
  }
});

export default router;
