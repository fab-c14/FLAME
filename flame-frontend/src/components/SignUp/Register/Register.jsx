import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';
const Registration = () => {
    const [userType, setUserType] = useState('student');

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
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
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" className="mb-3" />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" className="mb-3" />
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
