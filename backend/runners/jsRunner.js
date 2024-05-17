import { exec } from 'child_process';

export const runJavaScript = (code, res) => {
  const command = `node -e "${code.replace(/"/g, '\\"')}"`;
  exec(command, { shell: '/bin/bash' }, (error, stdout, stderr) => {
    if (error) {
      res.status(400).json({ error: stderr || error.message });
    } else {
      res.json({ output: stdout, error: stderr });
    }
  });
};
