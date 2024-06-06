import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, ListGroup, InputGroup, Form, Button } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';
import { createQuestion, fetchQuestions } from '../../actions/questionActions';
const ChatBox = ({ userType, user }) => {
    const [question, setQuestion] = useState('');
    const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '' }]);
    const [response, setResponse] = useState('');

    const dispatch = useDispatch();
    const { questions, loading, error } = useSelector((state) => state.questions);
    console.log(questions,loading,error);
  
    useEffect(() => {
        const selectedBatch = JSON.parse(localStorage.getItem('selectedBatch'));
        if (selectedBatch && selectedBatch._id) {
            dispatch(fetchQuestions(selectedBatch._id));
        }
    }, [dispatch]);

    const handlePostQuestion = () => {
        if (question.trim() === '' || testCases.some(tc => tc.input === '' || tc.expectedOutput === '')) return;
        const selectedBatch = JSON.parse(localStorage.getItem('selectedBatch'));

        const newQuestion = {
            title: question,
            testCases: testCases,
            createdBy:user.name,
            batchId:selectedBatch._id
        };

        dispatch(createQuestion(newQuestion, user, selectedBatch._id));

        // Clear the input fields
        setQuestion('');
        setTestCases([{ input: '', expectedOutput: '' }]);
    };

    const handleTestCaseChange = (index, field, value) => {
        const newTestCases = [...testCases];
        newTestCases[index][field] = value;
        setTestCases(newTestCases);
    };

    const addTestCase = () => {
        setTestCases([...testCases, { input: '', expectedOutput: '' }]);
    };

    const handleSolveQuestion = (index) => {
        // Implement the logic for solving the question here
        console.log('Solve question at index:', index);
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-md-center">
                <Col xs={12} md={8}>
                    <Card className="pa3">
                        <Card.Body>
                            <Card.Title className="tc">Classroom Chatbox</Card.Title>
                            <ListGroup variant="flush">
                                {questions.map((msg, index) => (
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
                                    <InputGroup className="mt-3 mb-2">
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Enter your question"
                                            value={question}
                                            onChange={(e) => setQuestion(e.target.value)}
                                        />
                                    </InputGroup>
                                    {testCases.map((testCase, index) => (
                                        <InputGroup className="mb-2" key={index}>
                                            <Form.Control
                                                type="text"
                                                placeholder="Input"
                                                value={testCase.input}
                                                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                                            />
                                            <Form.Control
                                                type="text"
                                                placeholder="Expected Output"
                                                value={testCase.expectedOutput}
                                                onChange={(e) => handleTestCaseChange(index, 'expectedOutput', e.target.value)}
                                            />
                                        </InputGroup>
                                    ))}
                                    <Button variant="secondary" className="mt-2" onClick={addTestCase}>
                                        Add Test Case
                                    </Button> &nbsp; &nbsp;
                                    <Button variant="primary" onClick={handlePostQuestion} className="mt-2">
                                        Post Question <FaPaperPlane />
                                    </Button>
                                </>
                            )}
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error}</p>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ChatBox;
