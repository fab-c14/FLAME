// CodeSandboxEmbed.js

import React from 'react';

const CodeSandboxEmbed = ({ embedUrl }) => {
  return (
    <div>
      <iframe
        src={embedUrl}
        style={{ width: '100%', height: '500px', border: 0, borderRadius: '4px', overflow: 'hidden' }}
        title="CodeSandbox Embed"
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
      ></iframe>
    </div>
  );
};

export default CodeSandboxEmbed;
