import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Documentation = () => {
    return (
        <Container className="shadow-2 pa2 ma3 bb b--pink-45">
            <h2 className="f2 mb3">Original Documentation</h2>
            <Row>
                <Col md={12}>
                    <p className="f4">
                        Welcome to the FLAME documentation! 📚 Here, you'll find detailed information on how to use FLAME and its features to enhance your learning experience. Whether you're a beginner or an advanced user, this documentation will help you get started and make the most out of FLAME.
                    </p>
                    <p className="f4">
                        Below, you'll find instructions, examples, and best practices for using FLAME's various components, including its interactive labs, coding exercises, and collaborative projects. If you have any questions or need further assistance, don't hesitate to reach out to our support team.
                    </p>
                    <h3 className="f3 mt-4">Getting Started</h3>
                    <p className="f4">
                        To begin using FLAME, simply sign up for an account and log in to access the platform. Once logged in, you'll be greeted with a dashboard where you can explore different labs, join projects, and track your progress.
                    </p>
                    <h3 className="f3 mt-4">Interactive Labs</h3>
                    <p className="f4">
                        FLAME's interactive labs allow you to practice coding in real-time within your web browser. Choose from a variety of languages and frameworks, and start coding immediately without the need for any setup or installation.
                    </p>
                    <h3 className="f3 mt-4">Coding Exercises</h3>
                    <p className="f4">
                        Test your coding skills with FLAME's coding exercises. These challenges cover a range of topics and difficulty levels, helping you improve your coding proficiency and problem-solving abilities.
                    </p>
                    <h3 className="f3 mt-4">Collaborative Projects</h3>
                    <p className="f4">
                        Collaborate with your peers on exciting projects using FLAME's collaborative project feature. Work together in real-time, share code snippets, and build amazing projects together.
                    </p>
                    <h3 className="f3 mt-4">Additional Resources</h3>
                    <p className="f4">
                        For more information and resources, be sure to check out the official FLAME website and community forums. Here, you'll find tutorials, guides, and discussions to help you make the most out of your learning journey with FLAME.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}

export default Documentation;
