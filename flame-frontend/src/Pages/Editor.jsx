import React, { useState } from 'react';
import AceEditor from 'react-ace';

// Import necessary language modes and themes from ace-builds
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-html';
// Import the desired theme
import 'ace-builds/src-noconflict/theme-monokai';

const CodeEditor = () => {
  const [activeFile, setActiveFile] = useState('untitled.js'); // Default to untitled.js
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleNewFile = () => {
    // Logic to create a new file
    // For example, you could add a new tab in a tabbed interface
    setActiveFile(`untitled-${Math.random().toString(36).substring(7)}.js`); // Generate a random file name
  };

  return (
    <div>
      {/* File management controls */}
      <button onClick={handleNewFile}>New File</button>
      
      {/* Display the currently active file */}
      <div>Active File: {activeFile}</div>
      
      {/* Language selection dropdown */}
      <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      
      {/* Code editor */}
      <AceEditor
        mode={language}
        theme="monokai"
        onChange={(newCode) => setCode(newCode)}
        value={code}
        name="code-editor"
        editorProps={{ $blockScrolling: true }}
        width="100%"
        height="500px"
      />
    </div>
  );
};

export default CodeEditor;
