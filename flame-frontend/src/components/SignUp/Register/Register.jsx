import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../../config';

const Registration = () => {
    const [userType, setUserType] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${BACKEND_URL}/api/users/register`, {
                name,
                email,
                password,
                role: userType,
            });
            if (response.data) {
                navigate('/login');
            }
        } catch (error) {
            console.error('Error registering user:', error);
        }
    };

    return (
      <section className='ma3 pa2 py-3 b br4 b--white gradient-background'>
        <Container className='card '>
            <Row className="justify-content-center">
                <Col md={6}>
                    <h2 className="text-center ma-2">Registration</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUserType">
                            <Form.Label>User Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={userType}
                                onChange={(e) => handleUserTypeChange(e.target.value)}
                            >
                                <option value="student">Student</option>
                                <option value="teacher">Teacher</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                className="mb-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                className="mb-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                className="mb-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 mb-4">
                            Register
                        </Button>
                        <Link to="/login">
                            <Button variant='warning' className='w-100 mb-3'>Login</Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
      </section>
    );
};

export default Registration;
