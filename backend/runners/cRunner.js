import { runCode } from './execUtils.js';

export const runC = (code, res) => {
  const filename = `temp.c`;
  const command = `gcc "${filename}" -o temp.out && ./temp.out`;
  runCode(filename, code, command, res);
};
