import { runCode } from './execUtils.js';

export const runC = (code, res) => {
  const command = `echo '${code.replace(/'/g, `'\\''`)}' | gcc -x c -o /tmp/temp.out - && /tmp/temp.out`;
  runCode(command, res);
};
