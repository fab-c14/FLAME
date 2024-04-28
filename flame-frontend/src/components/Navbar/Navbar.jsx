import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import logo from '../../assets/logo.svg';
import { Flame } from '../../assets/Flame';

const CustomNavbar = () => {
    return (
        <Navbar  expand="lg"  className="py-3 black shadow-3 ma3 br2 bw3 b">
            <Navbar.Brand href="#" className="mr-auto ml4 ma2">
                <div>
                    <img src={logo} alt="Logo" height="45"  className="d-inline-block align-top  br2 b--black" />
                </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ma2">
                <Nav className="ml-auto">
                    <Nav.Link href="#" className=" hover-bg-light-blue hover-white ma2 pa2">Home</Nav.Link>
                    <Nav.Link href="#" className=" hover-bg-light-blue hover-white ma2 pa2">About</Nav.Link>
                    <Nav.Link href="#" className=" hover-bg-light-blue hover-white ma2 pa2">Services</Nav.Link>
                    <Nav.Link href="#" className=" hover-bg-light-blue hover-white ma2 pa2">Contact</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
