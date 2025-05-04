import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './About.css';
import { Link } from 'react-router-dom';
import { GiFlame } from "react-icons/gi";
import { Slide, Fade, Zoom } from 'react-awesome-reveal';

const About = ({ isLoggedIn }) => {
  return (
    <section className="shadow-2 py-5 ma3 br2 bw1 bt bb b--dark-pink about-background hover-about">
      <Container>
        <Row>
          {/* Left Icon */}
          <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
            <Slide direction="left">
              <GiFlame size={400} color='red' />
            </Slide>
          </Col>

          {/* Right Text */}
          <Col md={6} className="black">
            <Fade direction="down" cascade damping={0.1}>
              <h2 className="f2 mb3" id="about" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>About FLAME</h2>
              <p className="f4" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                Welcome to FLAME (Foundation for Learning Assistance and Management Environment), your platform for interactive learning. Our mission is to empower students with the tools and resources they need to excel in their academic journey.
              </p>
              <p className="f4" style={{ fontFamily: 'Nunito Sans, sans-serif' }}>
                At FLAME, we believe in the power of hands-on learning. Our platform provides a rich environment for students to practice coding, experiment with different programming languages, and collaborate with peers on exciting projects.
              </p>
            </Fade>

            {/* Buttons with animation */}
            <Zoom delay={600}>
              <div className="d-flex gap-3 mt-3 flex-wrap">
                <Link to={isLoggedIn ? '/profile' : '/login'} className="f4 bg-light-green link dim ba bw1 ph3 pv2 mb2 br4 dib dark-red b">
                  {isLoggedIn ? "Go To Profile" : "Login"}
                </Link>

                <Link to={isLoggedIn ? "/editor" : "/register"} className="f4 bg-dark-red br4 link dim ba bw1 ph3 pv2 mb2 dib light-gray b">
                  {isLoggedIn ? "Start Coding" : "Register"}
                </Link>
              </div>
            </Zoom>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
