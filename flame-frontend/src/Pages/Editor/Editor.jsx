import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const Judge0_API_KEY = 'YOUR_JUDGE0_API_KEY';
const Judge0_URL = 'https://judge0.p.rapidapi.com/submissions';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const executeCode = async () => {
    try {
      const response = await axios.post(Judge0_URL, {
        source_code: code,
        language_id: 63, // Corresponds to JavaScript
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': Judge0_API_KEY,
          'x-rapidapi-host': 'judge0.p.rapidapi.com',
        }
      });
      const token = response.data.token;

      // Polling for the result
      setTimeout(async () => {
        const result = await axios.get(`${Judge0_URL}/${token}`, {
          headers: {
            'x-rapidapi-key': Judge0_API_KEY,
            'x-rapidapi-host': 'judge0.p.rapidapi.com',
          }
        });
        setOutput(result.data.stdout || result.data.stderr);
      }, 3000);
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Code Editor</h1>
          <Editor
            height="60vh"
            language={language}
            value={code}
            onChange={handleCodeChange}
          />
          <button className="btn btn-primary mt-3" onClick={executeCode}>Run Code</button>
          <h2>Output</h2>
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
