import React, { useState } from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { FiFilePlus, FiPlay, FiEdit2, FiDownload } from 'react-icons/fi';
import CodeEditor from './CodeEditor';
import FileList from './FileList';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Editor = () => {
  const [activeFile, setActiveFile] = useState('untitled');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [files, setFiles] = useState(['untitled']);
  const [fileListVisible, setFileListVisible] = useState(false);
  const [output, setOutput] = useState('Default Output');
  const [error, setError] = useState('');

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleNewFile = () => {
    const newFileName = `untitled-${Math.random().toString(36).substring(7)}.js`;
    setActiveFile(newFileName);
    setFiles([...files, newFileName]);
    toast.info('New file created');
  };

  const handleFileClick = (fileName) => {
    setActiveFile(fileName);
  };

  const handleRenameFile = () => {
    const newFileName = prompt('Enter new file name:', activeFile);
    if (newFileName) {
      setActiveFile(newFileName);
      toast.info('File renamed');
    }
  };

  const saveFile = () => {
    console.log('Saving file...');
    toast.info('File saved');
  };

  const toggleFileList = () => {
    setFileListVisible(!fileListVisible);
  };

  const url = "https://5000-fabc14-flame-lfwgw44zban.ws-us110.gitpod.io";
  const instance = axios.create({
    baseURL: url, 
  });

  const handleRunCode = async () => {
    toast.info('Running code...');
    try {
      const response = await instance.post('/run', { code, language });
      setOutput(response.data.output);
      setError(response.data.error || '');
    } catch (error) {
      console.error(error);
      setOutput('');
      setError('Error occurred while running code');
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8}>
          <div className="editor-container mb-4">
            <div className="toolbar pa2 mb2 d-flex justify-content-between align-items-center shadow-2">
              <FiDownload onClick={saveFile} style={{ cursor: 'pointer', fontSize: '1.5rem', marginRight: '1rem' }} />
              <div className="active-file">{activeFile}</div>
              <div className="d-flex center">
                <FileList
                  activeFile={activeFile}
                  setActiveFile={setActiveFile}
                  files={files}
                  visible={fileListVisible}
                  toggleVisible={toggleFileList}
                />
              </div>
              <div>
                <FiFilePlus onClick={handleNewFile} style={{ cursor: 'pointer', fontSize: '1.5rem', marginRight: '1rem' }} />
                <FiPlay onClick={handleRunCode} style={{ cursor: 'pointer', fontSize: '1.5rem', marginRight: '1rem' }} />
                <FiEdit2 onClick={handleRenameFile} style={{ cursor: 'pointer', fontSize: '1.5rem', marginRight: '1rem' }} />
                <Form.Group className="mr2">
                  <Form.Control as="select" value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="html">HTML</option>
                    <option value="java">Java</option>
                    <option value="c">C</option>
                    <option value="c++">C++</option>
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
            <CodeEditor language={language} code={code} setCode={setCode} />
          </div>
        </Col>
        <Col xs={12} md={4}>
          <div>
            <h5>Output:</h5>
            <pre>{output}</pre>
            {error && (
              <>
                <h5 style={{ color: 'red' }}>Error:</h5>
                <pre style={{ color: 'red' }}>{error}</pre>
              </>
            )}
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Editor;
