import React from 'react';
import { Dropdown, Button } from 'react-bootstrap';

const languageOptions = [
  { id: 63, name: 'JavaScript', editorLang: 'javascript' },
  { id: 54, name: 'C++', editorLang: 'cpp' },
  { id: 62, name: 'Java', editorLang: 'java' },
  { id: 71, name: 'Python', editorLang: 'python' },
  { id: 80, name: 'R', editorLang: 'r' },
  { id: 50, name: 'C', editorLang: 'c' },
  { id: 86, name: 'Perl', editorLang: 'perl' },
  { id: 74, name: 'TypeScript', editorLang: 'typescript' },
];

const FileManagement = ({ fileName, setFileName, language, onLanguageChange, onSaveFile }) => {
  return (
    <div className="mb3">
      <div className="flex justify-between items-center">
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="pa2 ba b--black-20"
          placeholder="File name"
        />
        <Dropdown onSelect={(e) => onLanguageChange(languageOptions.find(lang => lang.id === parseInt(e)))}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {language.name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {languageOptions.map(lang => (
              <Dropdown.Item key={lang.id} eventKey={lang.id}>{lang.name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" onClick={onSaveFile}>Save</Button>
      </div>
    </div>
  );
};

export default FileManagement;
