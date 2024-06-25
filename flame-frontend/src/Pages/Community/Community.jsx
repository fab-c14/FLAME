// Community.jsx
import React,{useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Chatbox from './ChatBox';


const Community = ({ user }) => {


  return (
    <Container className="mt5">
      <Chatbox userType={user.role} user={user} />
    </Container> )
};

export default Community;
