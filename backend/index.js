import express, { json } from 'express';
import { exec } from 'child_process';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());
app.use(cors()); // Add CORS middleware

app.post('/run', (req, res) => {
  console.log('started running your code');
  const { code, language } = req.body;

  switch (language) {
    case 'javascript':
      // For JavaScript, we can simply execute the code using Node.js
      exec(`node -e "${code}"`, (error, stdout, stderr) => {
        if (error) {
          console.log("there is error in compilter")
          console.log(error)
          res.status(400).json({ error: stderr });
        } else {
          res.json({ output: stdout });
        }
      });
      break;
    case 'python':
      // For Python, we execute the code using Python interpreter
      exec(`python -c "${code}"`, (error, stdout, stderr) => {
        if (error) {
          res.status(400).json({ error: stderr });
        } else {
          res.json({ output: stdout });
        }
      });
      break;
    default:
      res.status(400).json({ error: 'Unsupported language' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
