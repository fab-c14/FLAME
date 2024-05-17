import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const runJava = (code, res) => {
  const filename = `temp.java`;
  const filepath = path.join(__dirname, filename);
  fs.writeFileSync(filepath, code);
  const javaFilename = path.basename(filepath, '.java');

  exec(`javac "${filepath}" && java ${javaFilename}`, (error, stdout, stderr) => {
    fs.unlinkSync(filepath); // Clean up temporary file
    if (fs.existsSync(`${javaFilename}.class`)) fs.unlinkSync(`${javaFilename}.class`);
    if (error) {
      res.status(400).json({ error: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
};
