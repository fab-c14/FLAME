import { runCode } from './execUtils.js';

export const runPython = (code, res) => {
  const filename = `temp.py`;
  const command = `python "${filename}"`;
  runCode(filename, code, command, res);
};
