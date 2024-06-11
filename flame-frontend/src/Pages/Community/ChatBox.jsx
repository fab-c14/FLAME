import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, ListGroup, InputGroup, Form, Button } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';
import { createQuestion, fetchQuestions } from '../../actions/questionActions';
import {Link, useNavigate} from 'react-router-dom';
const ChatBox = ({ user }) => {
    const [question, setQuestion] = useState('');
    const [testCases, setTestCases] = useState([{ input: '', expectedOutput: '' }]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { questions, loading, error } = useSelector((state) => state.questions);

    const userType = user.role;
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
        console.log('Solve question at index:', index);

    };

    return (
<Container className="mt-4">
    <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
            <Card className="pa3 bg-navy">
                <Card.Body>
                    <Card.Title className="tc br3 white">Classroom Chatbox</Card.Title>
                        <ListGroup variant="flush br3">
                        {questions.map((question, index) => (
                            <ListGroup.Item key={question._id} className="mb-2 bg-light-blue br3 pa3 shadow-1">
                                <div className="mb-2">
                                    <h4 className="f4 b">{question.title}</h4>
                                    <p className="f6"><strong>Posted By:</strong> {question.createdBy}</p>
                                </div>
                                {question.testCases.map((testCase, idx) => (
                                    <div key={idx} className="mt-2">
                                        <Form.Group>
                                            <Form.Label className="f6 b db mb2">Test Case {idx + 1}</Form.Label>
                                            <div className="mb2">
                                                <Form.Text className="f6 b">Input:</Form.Text> {idx === 0 ? testCase.input : '*****'}
                                            </div>
                                            <div className="mb2">
                                                <Form.Text className="f6 b">Expected Output:</Form.Text> {idx === 0 ? testCase.expectedOutput : '*****'}
                                            </div>
                                        </Form.Group>
                                    </div>
                                ))}

                                {userType === 'student' && (
                                    <Link className='dib link dim br2 ph3 pv2 mb2 white bg-dark-blue' state={{ question: { question } }}  to="/editor" onClick={() => handleSolveQuestion(question._id)}>
                                        Solve <FaPaperPlane />
                                    </Link>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    {userType === 'teacher' && (
                            <>
                            <InputGroup className="mt-3 mb-2">
                                        <Form.Control
                                            as="input"
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
