// App.js

import React, { useState } from 'react';
import './App.css';
import CodeSandboxEmbed from './CodeSandboxEmbed';

function Editor() {
  const [labType, setLabType] = useState(null);

  const handleLabStart = (type) => {
    setLabType(type);
  };

  let embedUrl;
  switch (labType) {
    case 'javascript':
      embedUrl = 'https://codesandbox.io/embed/new?template=javascript';
      break;
    case 'python':
      embedUrl = 'https://repl.it/languages/python3';
      break;
    case 'web':
      embedUrl = 'https://codesandbox.io/embed/new?template=html';
      break;
    default:
      embedUrl = null;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Code IDE</h1>
      </header>
      <main className="App-main">
        <div>
          <button onClick={() => handleLabStart('javascript')}>Start JavaScript Lab</button>
          <button onClick={() => handleLabStart('python')}>Start Python Lab</button>
          <button onClick={() => handleLabStart('web')}>Start Web Development Lab</button>
        </div>
        {labType && <CodeSandboxEmbed embedUrl={embedUrl} />}
      </main>
    </div>
  );
}

export default Editor;
