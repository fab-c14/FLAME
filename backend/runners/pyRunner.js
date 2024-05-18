import runCode from './baseRunner.js';

const runPython = (code, res) => {
  const command = `python -c "${code.replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
  runCode(command, res);
};

export default runPython;
