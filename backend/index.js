import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import batchRoutes from './routes/batchRoutes.js';
import authRoutes from './routes/authRoutes.js';
import questionRoutes from './routes/questionRoutes.js'; // Import question routes
import runJavaScript from './runners/jsRunner.js';
import runPython from './runners/pyRunner.js';
import runC from './runners/cRunner.js';
import runCPP from './runners/cppRunner.js';
import executeRoute from './routes/executeRoute.js'
import updateRoutes from './routes/updateRoutes.js';
import answerRoutes from './routes/answerRoutes.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
connectDB();

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

app.use('/api/batches', batchRoutes);
app.use('/api/users', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/',executeRoute);
app.use('/api/',answerRoutes);
app.use('/api/',updateRoutes);


// accidently removed this part from last commit
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});