import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCode, FaChalkboardTeacher, FaChartBar } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import './Features.css'; // Optional external styling

function Features() {
    return (
        <section className="py-5 shadow-3 ma3 pa2 bb bt b--black-20 features-background">
            <Container>
                <Fade direction="up" cascade damping={0.15} >
                    <h2 className="text-center mb-5 feature-title">Key Features</h2>
                    <Row>
                        <Col md={4} className="mb-4">
                            <div className="text-center">
                                <FaCode size={60} className="mb-3 text-primary" />
                                <h3 className="feature-subtitle">Interactive Coding Labs</h3>
                                <p className="feature-text">
                                    Practice coding skills with hands-on labs covering various programming languages and topics.
                                </p>
                            </div>
                        </Col>
                        <Col md={4} className="mb-4">
                            <div className="text-center">
                                <FaChalkboardTeacher size={60} className="mb-3 text-primary" />
                                <h3 className="feature-subtitle">Solve Questions</h3>
                                <p className="feature-text">
                                    Access expert-led batches, where you/others can solve questions posted by batch instructors.
                                </p>
                            </div>
                        </Col>
                        <Col md={4} className="mb-4">
                            <div className="text-center">
                                <FaChartBar size={60} className="mb-3 text-primary" />
                                <h3 className="feature-subtitle">Performance Tracking</h3>
                                <p className="feature-text">
                                    Monitor student performance and progress using our detailed tracking system.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Fade>
            </Container>
        </section>
    );
}

export default Features;
