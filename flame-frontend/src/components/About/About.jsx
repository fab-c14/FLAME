import React from 'react';
import { FaBook, FaCode, FaUsers } from 'react-icons/fa'; // Importing icons from React Icons
import { Container, Row, Col } from 'react-bootstrap';
import gifImage from '../../assets/flame.gif'; // Importing the GIF

const About = () => {
    return (
        <Container className="shadow-4 pa2 ma3 ba b--pink center br4 bw2" >
            <Row>
               
                <Col md={12} className=" black " style={{zIndex:1}}>
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
    );
}

export default About;
