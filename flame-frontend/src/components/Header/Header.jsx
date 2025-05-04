import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaRocket } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Slide, Fade, Zoom } from 'react-awesome-reveal';
import './Header.css';

function Header({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(isLoggedIn ? '/editor' : '/login');
  };

  const goToDocs = () => {
    navigate('/Docs');
  };

  return (
    <header className="shadow-2 py-5 ma3 br2 bw1 bt bb b--dark-pink header-background">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-4 mb-md-0">

            <Slide direction="left" >
              <h1 className="display-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Welcome to FLAME
              </h1>
            </Slide>

            <Fade delay={200} >
              <p className="lead">Your platform for interactive learning</p>
            </Fade>

            {/* Flexbox container for buttons */}
            <div className="d-flex mt-3 gap-3">
              <Zoom direction="bottom" delay={400} >
                <Button variant="warning" className="hover-button b" onClick={handleClick}>
                  <FaRocket className="mr-2" /> Get Started
                </Button>
              </Zoom>

              <Zoom direction="right" delay={400} >
                <Button variant="outline-light bg-washed-red black" className="b" onClick={goToDocs}>
                  Learn More
                </Button>
              </Zoom>
            </div>
          </Col>
        </Row>
      </Container>

      <Fade delay={700} >
        <hr className="mt-5 mb-4" />
      </Fade>

      <Container>
        <Row>
          <Col>
            <Slide direction="up" delay={800} >
              <h2>Discover the Possibilities</h2>
            </Slide>
            <Fade delay={1000} >
              <p>
                Explore our interactive coding labs, access a wide range of coding choices,
                and solve questions with testcases and sharpen your skills.
              </p>
            </Fade>
          </Col>
        </Row>
      </Container>
    </header>
  );
}

export default Header;
