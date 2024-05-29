import React from 'react';

const Output = ({ output }) => {
  return (
    <div>
      <h2 className="tc">Output</h2>
      <pre className="bg-light-gray pa3">{output}</pre>
    </div>
  );
};

export default Output;
