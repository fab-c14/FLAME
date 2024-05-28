// Community.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Chatbox from './ChatBox';


const Community = ({ user }) => {
  return (
    <Container>
      <Row>
        <Col>
         <Chatbox user={user} />
        </Col>
      </Row>
    </Container>
  );
};

export default Community;
