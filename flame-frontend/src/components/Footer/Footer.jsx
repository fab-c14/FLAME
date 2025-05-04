import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'; // Importing icons from React Icons
import { Fade, Zoom } from 'react-awesome-reveal'; // Importing animations from react-awesome-reveal

const Footer = () => {
    return (
        <footer className="bg-dark text-light py-4 shadow-3 bg-green ma3 pa2 br3 bw2 b--red">
            <Container>
                <hr className="bg-light-gray mw-100" />
                <Row className="justify-content-center align-items-center">
                    {/* Footer Text with Fade animation */}
                    <Col xs={12} className="text-center mb-3 mb-md-0">
                        <Fade direction="up" cascade>
                            <p className="mb-3">© {new Date().getFullYear()} FLAME. All rights reserved.</p>
                        </Fade>
                    </Col>

                    {/* Social Media Links with Zoom animation */}
                    <Col xs={12} className="text-center">
                        <Zoom delay={300}>
                            <div>
                                <a href="https://github.com/fab-c14" className="text-light mr3" target="_blank" rel="noopener noreferrer">
                                    <FaGithub size={32} className="icon grow" />
                                </a>
                                <a href="https://twitter.com/fab14c" className="text-light mr3" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter size={32} className="icon grow" />
                                </a>
                                <a href="https://www.linkedin.com/in/faisal-ahmad-bhat-aaba29229/" className="text-light" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin size={32} className="icon grow" />
                                </a>
                            </div>
                        </Zoom>
                        <hr className="bg-light-gray mw-100" />
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
