import { runCode } from './execUtils.js';

export const runCpp = (code, res) => {
  const command = `echo '${code.replace(/'/g, `'\\''`)}' | g++ -x c++ -o /tmp/temp.out - && /tmp/temp.out`;
  runCode(command, res);
};
