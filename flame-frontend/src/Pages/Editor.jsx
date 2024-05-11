import React, { useState, useRef, useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';

const Editor = () => {
  const [activeFile, setActiveFile] = useState('untitled.js'); // Default to untitled.js
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    // Example custom command for saving the file
    const saveFileCommand = {
      name: 'saveFile',
      bindKey: { win: 'Ctrl-S', mac: 'Cmd-S' },
      exec: () => {
        saveFile();
      }
    };

    // Register custom commands
    if (editorRef.current) {
      editorRef.current.editor.commands.addCommand(saveFileCommand);
    }
  }, []);

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleNewFile = () => {
    setActiveFile(`untitled-${Math.random().toString(36).substring(7)}.js`); // Generate a random file name
  };

  const handleRunCode = () => {
    // Run code logic here
    console.log('Running code...');
  };

  const handleRenameFile = () => {
    const newFileName = prompt('Enter new file name:', activeFile);
    if (newFileName) {
      setActiveFile(newFileName);
    }
  };

  const saveFile = () => {
    // Save file logic here
    console.log('Saving file...');
  };

  return (
    <div className='editor-container'>
      <div className='toolbar'>
        <div>Active File: {activeFile}</div>
        <button onClick={handleNewFile}>New File</button>
        <button onClick={handleRunCode}>Run</button>
        <button onClick={handleRenameFile}>Rename File</button>
        <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="html">HTML</option>
          <option value="java">Java</option>
          <option value="c">C</option>
          <option value="c++">C++</option>
        </select>
      </div>

      <AceEditor
        ref={editorRef}
        placeholder="Write Your Code Here"
        mode={language}
        name=''
        theme="terminal"
        fontSize={14}
        lineHeight={32}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={code}
        onChange={setCode}
        setOptions={{
          // enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          enableEmmet:true,
          enableMultiselect:true,
          tabSize: 4,
        }}
        style={{ width: '100%', height: 'calc(100vh - 50px)' }} // Adjust height based on toolbar height
      />
    </div>
  );
};

export default Editor;
