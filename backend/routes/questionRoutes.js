import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// Create a question
router.post('/', async (req, res) => {
  const { title, description, testCases, createdBy, batchId } = req.body;
  try {
    const newQuestion = new Question({ title, description, testCases, createdBy, batchId });
    await newQuestion.save();
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
