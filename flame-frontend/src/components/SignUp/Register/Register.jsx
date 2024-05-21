import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const navigate = useNavigate();

  const handleUserTypeChange = (type) => {
    setRole(type);
  };
  const BACKEND_URL = "https://5000-fabc14-flame-wwrk1tz66i7.ws-us114.gitpod.io";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`${BACKEND_URL}/api/auth/register`, {
        name,
        email,
        password,
        role,
      });
      console.log('Registration successful:', data);
      navigate('/login');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <section className='ma3 pa2 py-3 b br4 b--white gradient-background'>
      <Container className='card '>
        <Row className="justify-content-center">
          <Col md={6}>
            <h2 className="text-center ma-2">Registration</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group controlId="formRole">
                <Form.Label>User Type</Form.Label>
                <Form.Control
                  as="select"
                  value={role}
                  onChange={(e) => handleUserTypeChange(e.target.value)}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mb-3"
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mb-3"
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
