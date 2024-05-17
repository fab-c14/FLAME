import { runCode } from './execUtils.js';
import path from 'path';

export const runJava = (code, res) => {
  const filename = `temp.java`;
  const command = `javac "${filename}" && java ${path.basename(filename, '.java')}`;
  runCode(filename, code, command, res);
};
