

import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Flame, } from '../../assets/Flame';

function Header() {
    return (
        <header className=" shadow-2 py-5 ma3 br2 bw3">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="mb-4 mb-md-0">
                        <h1 className="display-4">Welcome to FLAME</h1>
                        <p className="lead">Your platform for interactive learning</p>
                        <Button variant="primary" className="mr-2">Get Started</Button>
                        <Button variant="outline-light">Learn More</Button>
                    </Col>
                    <Col md={6} className="text-center">
                        <div className="mx-auto" style={{ maxWidth: '300px' }}>
                            <Flame />
                            {/* <WoodFlame /> */}
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

export default Header;
