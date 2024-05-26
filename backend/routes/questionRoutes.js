import express from 'express';
import Question from '../models/Question.js';

const router = express.Router();

// Create a new question
router.post('/', async (req, res) => {
  const { title, description, testCases, createdBy } = req.body;

  try {
    const question = new Question({
      title,
      description,
      testCases,
      createdBy,
    });

    const savedQuestion = await question.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a question by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a question
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, testCases } = req.body;

  try {
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.title = title || question.title;
    question.description = description || question.description;
    question.testCases = testCases || question.testCases;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a question
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    await question.remove();
    res.json({ message: 'Question removed' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
