import { Router } from 'express';
import { CodeExecutor, Worker } from 'code-executor';
import RedisServer from 'redis-server';
import SnippetStore from '../models/SnippetStore.js';
const router = Router();


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const server = new RedisServer(6379);
console.log(server)
server.open((err) => {
  if (err === null) {
    console.log('Redis server started successfully.');
  }
});

router.post("/saveCode",async(req,res)=>{
  let inputs = req.body;
  console.log(inputs);

})

router.post('/execute', async (req, res) => {
  let inputs = req.body;
  console.log(inputs.input);

  inputs = inputs.input;
  
  let buildLang = inputs.language;
  if(buildLang=='Cpp'){
    buildLang = 'Cplusplus'
    inputs.language = buildLang;
  }
  else if(buildLang=='Csharp'){
    buildLang='csharp'
    inputs.language=buildLang
  } else if(buildLang=='Java'){
    buildLang='Java'
    inputs.language=buildLang
  }
  console.log(buildLang);
  const randNO = getRandomInt(1000);
  const codeExecutor = new CodeExecutor('myExecutor' + randNO, server);

  const worker = new Worker('myExecutor' + randNO, server);

  await worker.build([buildLang]);
  worker.start();

  try {
    console.log('Received input:', inputs);

    const results = await codeExecutor.runCode(inputs);
    console.log('Results:', results);
    let i =0;
    if (inputs.testCases) {
      const testResults = inputs.testCases.map(testCase => {
        const obtainedOutput = results.tests[i].obtainedOutput.trim() || '';
        // console.log("outputs : ",testCase.output,results.tests[i].obtainedOutput);// thse line one code are for testing purpose
        const remarks = obtainedOutput === testCase.output ? 'Pass' : 'Fail';
    
        return { ...testCase, obtainedOutput, remarks, exitCode: results.run?.exitCode || 0 };
      });
      res.status(200).json({ tests: testResults });
    } else {
      res.status(200).json(results);
    }
  } catch (error) {
    console.error('Code execution failed:', error);
    res.status(500).json({ error: 'Code execution failed', details: error.message });
  } finally {
    await codeExecutor.stop();
  }
  console.log('Execution finished.');
});

export default router;
