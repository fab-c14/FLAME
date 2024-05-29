import React, { useRef } from 'react';
import Editor, { useMonaco } from '@monaco-editor/react';
import { FaPlay } from 'react-icons/fa';

const MonacoEditor = ({ code, language, onChange, onExecute }) => {
  const editorRef = useRef(null);
  const monaco = useMonaco();

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;

    // Enable auto-completion for all languages
    monaco.languages.registerCompletionItemProvider(language.editorLang, {
      provideCompletionItems: () => {
        const suggestions = [
          {
            label: 'console.log',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'console.log(${1});',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Log output to console'
          },
          // Add more suggestions for each language as needed
        ];
        return { suggestions: suggestions };
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <FaPlay className="pointer dim" size={36} onClick={onExecute} />
      </div>
      <Editor
        height="60vh"
        theme="vs-dark"
        language={language.editorLang}
        value={code}
        onChange={onChange}
        editorDidMount={handleEditorDidMount}
        options={{
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          autoIndent: 'full',
          formatOnType: true,
          snippetSuggestions: 'top',
        }}
      />
  
    </div>
  );
};

export default MonacoEditor;
