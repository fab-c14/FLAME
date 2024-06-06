import React, { useState } from 'react';
import { Button, Form, InputGroup, Card, ListGroup, Container, Row, Col } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import { BACKEND_URL } from '../../config';

const Chatbox = ({ userType, user}) => {
  const [question, setQuestion] = useState('');
  const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '' }]);
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState([]);
  const handlePostQuestion = async () => {
    if (question.trim() === '' || testCases.some(tc => tc.input === '' || tc.expectedOutput === '')) return;
    const selectedBatch = JSON.parse(localStorage.getItem('selectedBatch'));

    try {
      // Create the payload (data) for the request
      const payload = {
        title: question,
        createdBy: user.name,
        testCases: testCases,
        batchId:selectedBatch._id
      };
  
      // Make the POST request
      const response = await axios.post(`${BACKEND_URL}/api/questions/createQuestion`, payload);
  
      // Handle the response (e.g., show a success message)
      console.log('Question created successfully:', response.data);
  
      // Clear the input fields
      setQuestion('');
      setTestCases([{ input: '', expectedOutput: '' }]);
    } catch (error) {
      console.error('Error creating question:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };


  const handleSolveQuestion = async (index) => {
    const answer = response;
    const { testCases } = messages[index];

    try {
      const res = await axios.post(`${BACKEND_URL}/execute`, {
        code: answer,
        testCases: testCases.map(tc => ({ input: tc.input, expectedOutput: tc.expectedOutput }))
      });

      const results = res.data.results;
      const newMessage = { type: 'answer', content: response, result: results };
      const updatedMessages = [...messages];
      updatedMessages[index].answers = updatedMessages[index].answers || [];
      updatedMessages[index].answers.push(newMessage);
      setMessages(updatedMessages);
      setResponse('');
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };

  const addTestCase = () => {
    setTestCases([...testCases, { input: '', expectedOutput: '' }]);
  };

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  return (
    <Container className="mt-4">
    <Row className="justify-content-md-center">
      <Col xs={12} md={8}>
        <Card className="pa3">
          <Card.Body>
            <Card.Title className="tc">Classroom Chatbox</Card.Title>
            <ListGroup variant="flush">
              {messages.map((msg, index) => (
                <ListGroup.Item key={index} className="mb-2">
                  <div className="mb-2">
                    <strong>{msg.type === 'question' ? 'Question' : 'Answer'}:</strong> {msg.content}
                  </div>
                  {msg.type === 'question' && userType === 'teacher' && (
                    <>
                      <InputGroup className="mb-2">
                        <Form.Control
                          as="textarea"
                          placeholder="Enter your solution"
                          value={response}
                          onChange={(e) => setResponse(e.target.value)}
                        />
                      </InputGroup>
                      <Button variant="success" onClick={() => handleSolveQuestion(index)}>
                        Solve <FaPaperPlane />
                      </Button>
                    </>
                  )}
                  {msg.answers && msg.answers.map((answer, i) => (
                    <div key={i} className="mt-2">
                      <strong>Answer:</strong> {answer.content}
                      <div><strong>Result:</strong> {JSON.stringify(answer.result)}</div>
                    </div>
                  ))}
                </ListGroup.Item>
              ))}
            </ListGroup>
            {userType === 'teacher' && (
              <>
                {/* Display questions with a "Solve" button */}
                {questions.map((question, qIndex) => (
                  <div key={qIndex} className="mt-3">
                    <strong>Question:</strong> {question.title}
                    <Button variant="success" onClick={() => handleSolveQuestion(question._id)}>
                      Solve <FaPaperPlane />
                    </Button>
                  </div>
                ))}
                {/* Add input fields for posting a new question */}
                {/* ... (existing input fields for posting a new question) ... */}
              </>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
  );
};

export default Chatbox;
