import { Container, Row, Col, Button } from 'react-bootstrap';
import './About.css';
const About = () => {
    // Placeholder URL for the flame logo image
    const flameLogoUrl = 'https://tse1.mm.bing.net/th?id=OIP.lNXQHdQHsQzfUXxwcsyLiQHaJ1&pid=Api';

    return (
        <section className="shadow-2 py-5 ma3 br2 bw1 bt bb b--dark-pink about-background hover-about ">
            <Container>
                <Row>
                   
                    <Col md={6} className="d-flex flex-column align-items-center justify-content-center ">
                        {/* Flame Logo */}
                        <img src={flameLogoUrl} alt="Flame Logo" className="mb-3" style={{ width: '200px', height: 'auto' }} />

                        {/* Login and Register Buttons */}
                       
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
                            <Button className="mr-2  b dib grow" variant="warning" style={{ width: '100px', height: '50px' }}>
                                Login
                            </Button> &nbsp;&nbsp;
                            <Button variant="info" className=' b dib grow' style={{ width: '100px', height: '50px' }}>
                                Register
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}

export default About;
