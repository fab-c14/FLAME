import { runCode } from './execUtils.js';

export const runJava = (code, res) => {
  const command = `echo '${code.replace(/'/g, `'\\''`)}' > /tmp/Temp.java && javac /tmp/Temp.java && java -cp /tmp Temp`;
  runCode(command, res);
};
