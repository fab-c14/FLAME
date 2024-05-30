// CodeEditor.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useMonaco, Editor } from '@monaco-editor/react';
import axios from 'axios';
import FileManagement from './FileManagement';
import Output from './Output';
const CodeEditor = ({ questionId }) => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
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
      const response = await axios.post('/api/execute', {
        code,
        language,
        questionId,
      });
      setOutput(response.data.output);
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };

  const handleFileSave = () => {
    const element = document.createElement('a');
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
          <Editor
            height="600px"
            language={language}
            value={code}
            theme="vs-dark"
            onChange={handleCodeChange}
          />
        </Col>
        <Col xs={12} md={4} className="pa3">
          <Output output={output} />
          <Button className="mt-3" onClick={handleExecuteCode}>
            Run Code
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CodeEditor;
