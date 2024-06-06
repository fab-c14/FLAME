// Community.jsx
import React,{useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Chatbox from './ChatBox';


const Community = ({ user }) => {
  const [userType, setUserType] = useState('teacher'); // Change to 'teacher' for teacher view
  return (
    <Container className="mt5">
      <h1 className="tc">Classroom App</h1>
      <Chatbox userType={userType} />
    </Container> )
};

export default Community;
