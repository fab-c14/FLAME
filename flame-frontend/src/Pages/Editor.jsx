import React, { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import 'tachyons/css/tachyons.min.css';

const Editor = () => {
  const [activeFile, setActiveFile] = useState('untitled');
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleNewFile = () => {
    setActiveFile(`untitled-${Math.random().toString(36).substring(7)}.js`);
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
    <div className="editor-container">
      <div className="toolbar pa2 mb2 center shadow-2">
        <ButtonGroup className="mr2">
          <Button variant="dark" onClick={handleNewFile}>New File</Button>
          <Button variant="dark" onClick={handleRunCode}>Run</Button>
          <Button variant="dark" onClick={handleRenameFile}>Rename File</Button>
        </ButtonGroup>
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
        <div className="active-file">Active File: {activeFile}</div>
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
        style={{ width: '98%' }}
      />
    </div>
  );
};

export default Editor;
