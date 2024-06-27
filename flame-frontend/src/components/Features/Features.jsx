import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCode, FaChalkboardTeacher, FaUsers } from 'react-icons/fa'; 

function Features() {
    return (
        <section className="py-5 shadow-3 ma3 pa2 bb bt b--black-20">
            <Container >
                <h2 className="text-center mb-5">Key Features</h2>
                <Row>
                    <Col md={4} className="mb-4">
                        <div className="text-center">
                            <FaCode size={60} className="mb-3 text-primary" />
                            <h3>Interactive Coding Labs</h3>
                            <p>Practice coding skills with hands-on labs covering various programming languages and topics.</p>
                        </div>
                    </Col>
                    <Col md={4} className="mb-4">
                        <div className="text-center">
                            <FaChalkboardTeacher size={60} className="mb-3 text-primary" />
                            <h3>Solve Questions</h3>
                            <p>Access expert-led batches, where you/others can share tips, and resources to enhance your learning experience.</p>
                        </div>
                    </Col>
                    <Col md={4} className="mb-4">
                        <div className="text-center">
                            <FaUsers size={60} className="mb-3 text-primary" />
                            <h3>Community Collaboration</h3>
                            <p>Connect with a global community of learners, share ideas, and solve questions.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default Features;
