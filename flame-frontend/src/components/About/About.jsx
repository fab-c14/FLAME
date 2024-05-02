import React from 'react';
import { FaBook, FaCode, FaUsers } from 'react-icons/fa'; // Importing icons from React Icons
import { Container, Row, Col } from 'react-bootstrap';

import './About.css'
const About = () => {
    return (
        <section  className="shadow-5 py-5 ma3 br2  b--dark-pink about-background">
        <Container >
            <Row>
                <Col className=" black " >
                    <h2 className="f2 mb3">About FLAME</h2>
                    <p className="f4">
                        Welcome to FLAME (Foundation for Learning Assistance and Management Environment), your platform for interactive learning. Our mission is to empower students with the tools and resources they need to excel in their academic journey.
                    </p>
                    <p className="f4">
                        At FLAME, we believe in the power of hands-on learning. Our platform provides a rich environment for students to practice coding, experiment with different programming languages, and collaborate with peers on exciting projects.
                    </p>
                   
                </Col>
            </Row>
        </Container>
        </section>
    );
}

export default About;
