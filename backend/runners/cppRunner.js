import { createTempFile } from './utils/fileUtils.js';
import runCode from './baseRunner.js';

const runCPP = (code, res) => {
  const tempFile = createTempFile('cpp', code);
  const command = `g++ ${tempFile} -o temp.out && ./temp.out`;
  runCode(command, res);
};

export default runCPP;
