import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const runPython = (code, res) => {
  const filename = `temp.py`;
  const filepath = path.join(__dirname, filename);
  fs.writeFileSync(filepath, code);

  exec(`python "${filepath}"`, (error, stdout, stderr) => {
    fs.unlinkSync(filepath); // Clean up temporary file
    if (error) {
      res.status(400).json({ error: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
};
