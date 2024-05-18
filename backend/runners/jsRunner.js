import runCode from './baseRunner.js';

const runJavaScript = (code, res) => {
  const command = `node -e "${code.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  runCode(command, res);
};

export default runJavaScript;
