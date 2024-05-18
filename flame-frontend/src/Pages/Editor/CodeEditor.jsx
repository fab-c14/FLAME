import React, { useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-terminal';
import 'ace-builds/src-noconflict/ext-language_tools';

const CodeEditor = ({ language, code, setCode }) => {
  const editorRef = useRef(null);

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('Text');
    const editor = editorRef.current.editor;
    const range = editor.getSelectionRange();
    editor.session.insert(range.start, pastedText);
    e.preventDefault();
  };

  return (
    <AceEditor
      ref={editorRef}
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
      onPaste={handlePaste} // Handle the paste event
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
