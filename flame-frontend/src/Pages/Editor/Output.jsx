// Output.jsx
import React from 'react';
import { Card } from 'react-bootstrap';

const Output = ({ output }) => {
  return (
    <Card className="mt-3">
      <Card.Header>Output</Card.Header>
      <Card.Body>
        <pre>{output}</pre>
      </Card.Body>
    </Card>
  );
};

export default Output;
