import { exec } from 'child_process';

export const runJavaScript = (code, res) => {
  exec(`node -e "${code.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
    if (error) {
      res.status(400).json({ error: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
};
