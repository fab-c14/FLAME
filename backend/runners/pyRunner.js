import { runCode } from './execUtils.js';

export const runPython = (code, res) => {
  const command = `python -c "${code.replace(/"/g, '\\"')}"`;
  runCode(command, res);
};
