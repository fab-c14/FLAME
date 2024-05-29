import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';

const ChatBubble = ({ message, isCurrentUser, timestamp, userName, isTeacher, isQuestion, testCases, answers, onSolve }) => {
  return (
    <Card className={`chat-bubble ${isCurrentUser ? 'current-user' : ''} mb-2`}>
      <Card.Body>
        <Card.Text>{message}</Card.Text>
        <Card.Subtitle className="text-muted">
          {timestamp} by {userName} {isTeacher && <span className="teacher-tag">(Teacher)</span>}
        </Card.Subtitle>
        {isQuestion && !isCurrentUser && (
          <Button variant="secondary" className="mt-2" onClick={() => onSolve(testCases, answers)}>
            Solve
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

const Chatbox = ({ user }) => {
  const [userMessage, setUserMessage] = useState('');
  const [isQuestion, setIsQuestion] = useState(false);
  const [testCases, setTestCases] = useState('');
  const [answers, setAnswers] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const isStudent = user.role === 'student';

  const handleSendMessage = () => {
    if (userMessage.trim()) {
      setChatHistory([...chatHistory, { message: userMessage, isCurrentUser: true, userName: user.name, isTeacher: !isStudent, isQuestion, testCases, answers }]);
      setUserMessage('');
      setIsQuestion(false);
      setTestCases('');
      setAnswers('');
    }
  };

  const handleSolve = async (testCases, answers) => {
    try {
      const response = await axios.post('/api/solve', { testCases, answers });
      const solution = response.data.solution;
      setChatHistory([...chatHistory, { message: solution, isCurrentUser: false, userName: 'System', isTeacher: false }]);
    } catch (error) {
      console.error('Error solving the question:', error);
    }
  };
  const timeStamp = new Date().toLocaleDateString();

  return (
    <Container className="bg-black pa3 mt-3 b--black white shadow-5 br3">
      <Row>
        <Col>
          {chatHistory.map((chat, index) => (
            <ChatBubble
              key={index}
              message={chat.message}
              isCurrentUser={chat.isCurrentUser}
              timestamp={timeStamp.toString()}
              userName={chat.userName}
              isTeacher={chat.isTeacher}
              isQuestion={chat.isQuestion}
              testCases={chat.testCases}
              answers={chat.answers}
              onSolve={handleSolve}
            />
          ))}
          {!isStudent && (
            <Form>
              <Form.Group controlId="userMessage">
                <Form.Control
                  type="text"
                  placeholder="Type your message..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="isQuestion">
                <Form.Check
                  type="checkbox"
                  label="Is this a question?"
                  checked={isQuestion}
                  onChange={() => setIsQuestion(!isQuestion)}
                />
              </Form.Group>
              {isQuestion && (
                <>
                  <Form.Group controlId="testCases">
                    <Form.Control
                      type="text"
                      placeholder="Test cases (comma-separated)"
                      value={testCases}
                      onChange={(e) => setTestCases(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group controlId="answers">
                    <Form.Control
                      type="text"
                      placeholder="Answers (comma-separated)"
                      value={answers}
                      onChange={(e) => setAnswers(e.target.value)}
                    />
                  </Form.Group>
                </>
              )}
              <Button variant="primary" className="mt-3" onClick={handleSendMessage}>
                Send
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Chatbox;
