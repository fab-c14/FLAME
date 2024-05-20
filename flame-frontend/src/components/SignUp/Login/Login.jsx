import React,{useState} from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Login.css'
const Login = () => {
    const BACKEND_URL = "https://5000-fabc14-flame-vemxsjxiy69.ws-us114.gitpod.io";
    const handleSubmit = (event) => {
        event.preventDefault();
       
    };

    const [userType, setUserType] = useState('student');

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    return (
      <section className='ma3 pa2 py-3 b br4 center '>
        <Container className='card mb-3'>
            <Row className="justify-content-center align-items-center">
                <Col md={6}>
                    <h2 className="text-center mb-4">Login</h2>
                   
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
                            Login
                        </Button>
                        <Link to="/register">
                            <Button  variant='warning' className='w-100 mb-3'>Register</Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
      </section>
    );
};

export default Login;
