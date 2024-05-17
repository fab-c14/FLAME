import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const runCode = (filename, code, command, res) => {
  const filepath = path.join(__dirname, filename);
  fs.writeFileSync(filepath, code);

  exec(command, (error, stdout, stderr) => {
    fs.unlinkSync(filepath); // Clean up temporary file
    const outputFile = path.basename(filepath, path.extname(filepath));
    if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
    if (error) {
      res.status(400).json({ error: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
};
