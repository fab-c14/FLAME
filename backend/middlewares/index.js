import express from 'express';
import { protect, teacherOnly } from '../middleware/authMiddleware.js';
import { createBatch, joinBatch } from '../controllers/batchController.js';

const router = express.Router();

router.post('/', protect, teacherOnly, createBatch);
router.post('/join', protect, joinBatch);

export default router;
