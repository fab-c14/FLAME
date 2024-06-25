import { Container, Row, Col, Button } from 'react-bootstrap';
import './About.css';
import { Link } from 'react-router-dom';

import { GiFlame } from "react-icons/gi";
import { useState ,useEffect} from 'react';

const About = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const userLoggedIn = localStorage.getItem('token') !== null;
    useEffect(() => {
        setIsLoggedIn(userLoggedIn);
    },[userLoggedIn]);
    return (
        <section className="shadow-2 py-5 ma3 br2 bw1 bt bb b--dark-pink about-background hover-about ">
            <Container>
                <Row>
                    <Col md={6} className="d-flex flex-column align-items-center justify-content-center ">
        
                       <GiFlame size={400}  color='red'/>
                    </Col>
                    <Col md={6} className="black">
                        <h2 className="f2 mb3" id="about">About FLAME</h2>
                        <p className="f4">
                            Welcome to FLAME (Foundation for Learning Assistance and Management Environment), your platform for interactive learning. Our mission is to empower students with the tools and resources they need to excel in their academic journey.
                        </p>
                        <p className="f4">
                            At FLAME, we believe in the power of hands-on learning. Our platform provides a rich environment for students to practice coding, experiment with different programming languages, and collaborate with peers on exciting projects.
                        </p>
                        <div className="d-flex">
                           <Link to={isLoggedIn ? '/profile' : '/login'} className="f4 bg-light-green   link dim ba bw1 ph3 pv2 mb2 br4 dib dark-red b">
                                {isLoggedIn ? "Go To Profile" : "Login"}
                            </Link>
                                
                             &nbsp;&nbsp;
                             <Link to={isLoggedIn ? "/editor":"/register"} className='f4 bg-dark-red br4 link dim ba bw1 ph3 pv2 mb2 dib light-gray  b' >
                            {isLoggedIn ? "Start Coding":"Register"}
                            </Link>
                            
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default About;
