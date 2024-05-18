import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';

const CodeEditor = ({ language, code, setCode }) => {
  return (
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
  );
};

export default CodeEditor;
