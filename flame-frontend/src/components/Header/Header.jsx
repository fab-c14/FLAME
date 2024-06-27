import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Flame } from '../../assets/Flame';
import { FaRocket } from 'react-icons/fa'; // Importing the Rocket icon from React Icons
import {useNavigate} from 'react-router-dom'
import './Header.css';
function Header({isLoggedIn}) {

    const navigate = useNavigate();

    const handleClick = () => {
        if(isLoggedIn){
            navigate('/editor');
        }else{
            navigate('/login');
        }
    };

    const goToDocs = ()=>{
        navigate("/Docs");
    };

    return (
        <header className="shadow-2 py-5 ma3 br2 bw1 bt bb b--dark-pink header-background">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="mb-4 mb-md-0">
                        <h1 className="display-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>Welcome to FLAME</h1>
                        <p className="lead">Your platform for interactive learning</p>
                        <Button variant="warning" className="mr-2 hover-button b" onClick={handleClick}><FaRocket className="mr-2" /> Get Started</Button>&nbsp;&nbsp;
                        <Button variant="outline-light bg-washed-red black" className='b' onClick={goToDocs}>Learn More</Button>
                    </Col>
                </Row>
            </Container>
            <hr className="mt-5 mb-4" />
            <Container>
                <Row>
                    <Col>
                        <h2>Discover the Possibilities</h2>
                        <p>Explore our interactive coding labs, access a wide range of coding choices, and solve questions with testcases and sharpen you skills.</p>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}

export default Header;
