import express from 'express';
import Batch from '../models/Batch.js';
import User from '../models/User.js'; // Make sure to import the User model
import mongoose from 'mongoose';
const router = express.Router();

// Create a new batch
router.post('/create', async (req, res) => {
  const { name , createdBy} = req.body;
  try {
    const newBatch = new Batch({ name , createdBy});
    await newBatch.save();
    res.json(newBatch);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all batches (with students' names and emails)
router.post('/', async (req, res) => {
  const { createdBy } = req.body;
  try {
    let batches;
    if (createdBy) {
      // Fetch batches created by the specified user
      batches = await Batch.find({ createdBy }).populate('students', 'name stats');
    } else {
      // Fetch all batches
      batches = await Batch.find().populate('students', 'name stats');
    }
    res.json(batches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});




// Join a batch
router.post('/:batchId', async (req, res) => {
  const { batchId } = req.params;
  const { studentId } = req.body;

  try {
    const batch = await Batch.findById(batchId);
    const student = await User.findById(studentId);

    if (!batch || !student) {
      return res.status(404).json({ msg: 'Batch or student not found' });
    }
    if (!batch.students.includes(studentId)) {
      batch.students.push(studentId);
      await batch.save();
    }
    if (!student.batches.includes(batchId)) {
      student.batches.push(batchId);
      await student.save();
    }

    

    

    res.json(batch);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
// for check if the batch exists or not , if not exists we'll throw an error
router.get('/:batchId', async (req, res) => {
  const { batchId } =req.params;

  try {
    const batch = await Batch.findById(batchId);
    
    if (!batch) {
      return res.json({ exists: false }); // Batch does not exist
    }

    res.json({ exists: true }); // Batch exists
  } catch (err) {

    res.status(500).send('Server Error');
  }
});



export default router;
