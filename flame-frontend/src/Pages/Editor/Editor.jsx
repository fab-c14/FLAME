import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import MonacoEditor from './MonacoEditor';
import Output from './Output';
import FileManagement from './FileManagement';
import axios from 'axios';
const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState({
    id: 63,
    name: 'JavaScript',
    editorLang: 'javascript',
  });
  const [output, setOutput] = useState('');
  const [fileName, setFileName] = useState('Untitled');

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleExecuteCode = async () => {
    try {
      const response = await axios.post('https://online-code-compiler.p.rapidapi.com/v1/', {
        source_code: code,
        language_id: language.id,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'x-rapidapi-key': '6ba5bba27dmsh201c6a5962bbe59p1165e0jsn5a975c661f9f',
          'x-rapidapi-host': 'online-code-compiler.p.rapidapi.com',
        }
      });

      const token = response.data.token;

      setTimeout(async () => {
        const resultResponse = await axios.get(`online-code-compiler.p.rapidapi.com/submissions/${token}`, {
          headers: {
            'x-rapidapi-key': 'YOUR_API_KEY',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
          }
        });
        setOutput(resultResponse.data.stdout || resultResponse.data.stderr);
      }, 3000);
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };

  const handleFileSave = () => {
    const element = document.createElement("a");
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <Container fluid className="pa3">
      <Row>
        <Col xs={12} md={8}>
          <FileManagement
            fileName={fileName}
            setFileName={setFileName}
            language={language}
            onLanguageChange={handleLanguageChange}
            onSaveFile={handleFileSave}
          />
          <MonacoEditor
            code={code}
            language={language}
            onChange={handleCodeChange}
            onExecute={handleExecuteCode}
          />
        </Col>
        <Col xs={12} md={4} className="pa3">
          <Output output={output} />
        </Col>
      </Row>
    </Container>
  );
};

export default CodeEditor;
