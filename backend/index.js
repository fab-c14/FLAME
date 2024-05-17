import express, { json } from 'express';
import cors from 'cors';
import { runJavaScript } from './runners/jsRunner.js';
import { runPython } from './runners/pyRunner.js';
import { runC } from './runners/cRunner.js';
import { runCpp } from './runners/cppRunner.js';
import { runJava } from './runners/javaRunner.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());
app.use(cors());

app.post('/run', (req, res) => {
  console.log('Started running your code');
  const { code, language } = req.body;

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
    case 'cpp':
      runCpp(code, res);
      break;
    case 'java':
      runJava(code, res);
      break;
    default:
      res.status(400).json({ error: 'Unsupported language' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
