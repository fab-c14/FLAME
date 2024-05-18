import { exec } from 'child_process';

const runCode = (command, res) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      res.status(400).json({ error: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
};

export default runCode;
