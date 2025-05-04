import React from 'react';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { Fade, Zoom } from 'react-awesome-reveal';
import './Docs.css'; // Update your CSS file for fonts

const Docs = () => {
  const navigate = useNavigate();

  return (
    <section className="py-5 shadow-2 br3 ma3 pa2 b--black bw2 ba docs-background">
      <Container>
        <Fade direction="down" cascade damping={0.1}>
          <h2 className="text-center mb-4 docs-title">Documentation</h2>
          <p className="text-center mb-4 docs-text">
            Explore our documentation to learn more about FLAME and how to get started.
          </p>
        </Fade>

        <Row className="mb-5">
          <Col md={4}>
            <Fade direction="left">
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title className="docs-subtitle">Getting Started</Card.Title>
                  <Card.Text>
                    Learn how to set up your profile, start coding, and use the editor effectively.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Fade>
          </Col>
          <Col md={4}>
            <Fade direction="up" delay={100}>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title className="docs-subtitle">Features</Card.Title>
                  <Card.Text>
                    Discover key features like real-time test cases, language support, and solution history.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Fade>
          </Col>
          <Col md={4}>
            <Fade direction="right" delay={200}>
              <Card className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title className="docs-subtitle">FAQs</Card.Title>
                  <Card.Text>
                    Get answers to common questions about account setup, usage, and troubleshooting.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Fade>
          </Col>
        </Row>

        <Zoom delay={300}>
          <div className="text-center">
            <Button
              variant="warning"
              size="lg"
              onClick={() => navigate('/docs')}
              className="hover-button"
            >
              <FaBook className="mr-2" /> View Full Documentation
            </Button>
          </div>
        </Zoom>
      </Container>
    </section>
  );
};

export default Docs;
