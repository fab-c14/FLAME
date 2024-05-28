import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

import { Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';


const ChatBubble = ({ message, isCurrentUser, timestamp, userName, isTeacher }) => {
  return (
    <Card className={`chat-bubble ${isCurrentUser ? 'current-user' : ''} mb-2`}>
      <Card.Body>
        <Card.Text>{message}</Card.Text>
        <Card.Subtitle className="text-muted">
          {timestamp} by {userName} {isTeacher && <span className="teacher-tag">(Teacher)</span>}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};



const Chatbox = ({user}) => {


    const [userMessage, setUserMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = () => {
        if (userMessage.trim()) {
        setChatHistory([...chatHistory, { message: userMessage, isCurrentUser: true,userName,isTeacher }]);
        setUserMessage('');
        }
    };

    return (
        <Container className="bg-black pa3 mt-3 b--black white shadow-5 br3">
        <Row>
            <Col>
            {chatHistory.map((chat, index) => (
                <ChatBubble
                key={index}
                message={chat.message}
                isCurrentUser={chat.isCurrentUser}
                timestamp={new Date().toLocaleTimeString()}
                userName={user.name}
                isTeacher={user.role}
                /> 
            ))}
            <Form>
                <Form.Group controlId="userMessage">
                <Form.Control
                    type="text"
                    placeholder="Type your message..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                />
                </Form.Group>
                <Button variant="primary" className="mt-3" onClick={handleSendMessage}>
                Send
                </Button>
            </Form>
            </Col>
        </Row>
        </Container>
    );
};

export default Chatbox;
