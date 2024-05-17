import { runCode } from './execUtils.js';

export const runCpp = (code, res) => {
  const filename = `temp.cpp`;
  const command = `g++ "${filename}" -o temp.out && ./temp.out`;
  runCode(filename, code, command, res);
};
