// Community.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PostQuestion from './PostQuestion';
import QuestionList from './QuestionList';

const Community = ({ user }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center mt-4">Community</h1>
          {user.role === 'teacher' && <PostQuestion user={user} />}
          <QuestionList user={user} />
        </Col>
      </Row>
    </Container>
  );
};

export default Community;
