import React from 'react';
import MonacoEditor from '@monaco-editor/react';

const Editor = ({ code, language, onChange, theme }) => {
  const options = {
    selectOnLineNumbers: true,
    roundedSelection: true,
    readOnly: false,
    cursorStyle: 'line',

    automaticLayout: true,
  };

  return (
    <MonacoEditor
      width="100%"
      height="600"
      language={language}
      theme={theme || 'vs-dark'}
      value={code}
      options={options}
      onChange={onChange}
    />
  );
};

export default Editor;
