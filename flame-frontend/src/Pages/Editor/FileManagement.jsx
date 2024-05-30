// FileManagement.jsx
import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const FileManagement = ({ fileName, setFileName, language, onLanguageChange, onSaveFile }) => {
  return (
    <div className="mb-3">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="File Name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <Button onClick={onSaveFile}>Save File</Button>
      </InputGroup>
      <Form.Group controlId="languageSelect">
        <Form.Label>Select Language</Form.Label>
        <Form.Control
          as="select"
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="c">C</option>
          <option value="cpp">C++</option>
        </Form.Control>
      </Form.Group>
    </div>
  );
};

export default FileManagement;
