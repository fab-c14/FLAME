import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';
import { Form, Container, Row, Col, ListGroup } from 'react-bootstrap';
import { FiFilePlus, FiPlay, FiEdit2, FiDownload } from 'react-icons/fi'; 

const Editor = () => {
  const [activeFile, setActiveFile] = useState('untitled');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [files, setFiles] = useState(['untitled']); // List of opened files

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleNewFile = () => {
    const newFileName = `untitled-${Math.random().toString(36).substring(7)}.js`;
    setActiveFile(newFileName);
    setFiles([...files, newFileName]); // Add new file to files list
  };

  const handleFileClick = (fileName) => {
    setActiveFile(fileName);
  };

  const handleRunCode = () => {
    console.log('...Running code...');
  };

  const handleRenameFile = () => {
    const newFileName = prompt('Enter new file name:', activeFile);
    if (newFileName) {
      setActiveFile(newFileName);
    }
  };

  const saveFile = () => {
    console.log('Saving file...');
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={8}>
          <div className="editor-container mb-4">
            <div className="toolbar pa2 mb2 d-flex justify-content-between align-items-center shadow-2">
                <FiDownload onClick={saveFile} style={{ cursor: 'pointer', fontSize: '1.5rem', marginRight: '1rem' }} />
                <div className="d-flex align-items-center">
                    <div className="file-list mb-4">
                  {files.map((fileName, index) => (
                    <div key={index} className="file-item">
                      <ListGroup.Item
                        action
                        active={fileName === activeFile}
                        onClick={() => handleFileClick(fileName)}
                      >
                        {fileName}
                      </ListGroup.Item>
                    </div>
                  ))}
                </div>
                <div className="active-file">{activeFile}</div>
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

            <AceEditor
              className='center'
              placeholder="Write Your Code Here"
              mode={language}
              theme="terminal"
              fontSize={14}
              lineHeight={32}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={code}
              onChange={setCode}
              setOptions={{
                enableLiveAutocompletion: true,
                enableSnippets: true,
                showLineNumbers: true,
                enableEmmet: true,
                enableMultiselect: true,
                tabSize: 4,
              }}
              style={{ width: '100%', height: 'calc(100vh - 50px)', marginBottom: '20px' }}
            />
          </div>
        </Col>
        <Col xs={12} md={4}>
         
        </Col>
      </Row>
    </Container>
  );
};

export default Editor;
