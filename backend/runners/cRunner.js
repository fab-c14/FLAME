import { createTempFile } from './utils/fileUtils.js';
import runCode from './baseRunner.js';

const runC = (code, res) => {
  const tempFile = createTempFile('c', code);
  const command = `gcc ${tempFile} -o temp.out && ./temp.out`;
  runCode(command, res);
};

export default runC;
