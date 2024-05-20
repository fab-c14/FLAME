import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import runJavaScript from './runners/jsRunner.js';
import runPython from './runners/pyRunner.js';
import runC from './runners/cRunner.js';
import runCPP from './runners/cppRunner.js';
import Batch from './models/Batch.js';  // Import Batch model
import User from './models/User.js';    // Import User model

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/school', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.use(cors());
app.use(express.json());

app.post('/run', (req, res) => {
  const { code, language } = req.body;
  console.log(`Running your code in ${language}`);

  switch (language) {
    case 'javascript':
      runJavaScript(code, res);
      break;
    case 'python':
      runPython(code, res);
      break;
    case 'c':
      runC(code, res);
      break;
    case 'c++':
      runCPP(code, res);
      break;
    default:
      res.status(400).json({ error: 'Unsupported language' });
  }
});

// Batch routes
app.post('/api/batches', async (req, res) => {
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

app.get('/api/batches', async (req, res) => {
  try {
    const batches = await Batch.find().populate('students', 'name email');
    res.json(batches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/api/batches/:batchId/join', async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
