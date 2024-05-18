import express from 'express';
import cors from 'cors';
import runJavaScript from './runners/jsRunner.js';
import runPython from './runners/pyRunner.js';
import runC from './runners/cRunner.js';
import runCPP from './runners/cppRunner.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/run', (req, res) => {
  const { code, language } = req.body;
  console.log(`running your code ${language}`);

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
