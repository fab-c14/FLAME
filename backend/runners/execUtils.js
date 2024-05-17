import { exec } from 'child_process';

export const runCode = (command, res) => {
  exec(command, { shell: '/bin/bash' }, (error, stdout, stderr) => {
    if (error) {
      res.status(400).json({ error: stderr || error.message });
    } else {
      res.json({ output: stdout, error: stderr });
    }
  });
};
