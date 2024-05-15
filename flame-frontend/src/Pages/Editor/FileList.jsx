import React from 'react';
import { ListGroup, Button,Col } from 'react-bootstrap';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const FileList = ({ activeFile, setActiveFile, files, visible, toggleVisible }) => {
  return (
    <Col className={`file-list ${visible ? 'visible' : 'hidden'}`} >
   
        <Button onClick={toggleVisible} className="toggle-button mb3"> Files : 
            {visible ? <FiChevronUp /> : <FiChevronDown />}
        </Button>
      
      {visible && (
        <ListGroup className='w5 h5' style={{zIndex:"2", position:"fixed", overflowY:"scroll"}}>
          {files.map((fileName, index) => (
            <div key={index} className="file-item "  >
              <ListGroup.Item
                action
                active={fileName === activeFile}
                onClick={() => setActiveFile(fileName)}
              >
                {fileName}
              </ListGroup.Item>
            </div>
          ))}
        </ListGroup>
      )}
    </Col>
  );
};

export default FileList;
