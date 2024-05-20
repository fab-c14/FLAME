const express = require('express');
const router = express.Router();
const Batch = require('../models/Batch');
const User = require('../models/User');

// Create a new batch
router.post('/', async (req, res) => {
    const { name } = req.body;
    try {
        const newBatch = new Batch({ name });
        await newBatch.save();
        res.json(newBatch);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Get all batches
router.get('/', async (req, res) => {
    try {
        const batches = await Batch.find().populate('students', 'name email');
        res.json(batches);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Join a batch
router.post('/:batchId/join', async (req, res) => {
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

        res.json(batch);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
