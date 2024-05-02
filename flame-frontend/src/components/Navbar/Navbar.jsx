import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import logo from '../../assets/logo.svg';


const CustomNavbar = () => {
    return (
        <Navbar  expand="lg"  className="py-3 black shadow-3 ma3 br2 bw1 b pa2 ba b--white-80">
            <Navbar.Brand href="#" className="mr-auto ml4 ma2">
                <div>
                    <img src={logo} alt="Logo" height="45"  className="d-inline-block align-top  br2 b--black" />
                </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav pa2 ma2" />
            <Navbar.Collapse id="basic-navbar-nav ma2 pa2 py-3">
                <Nav className="ml-auto ">
                    <Nav.Link href="#" className=" hover-bg-light-red hover-b-light-blue ma2 pa2 br2">Home</Nav.Link>
                    <Nav.Link href="#" className=" hover-bg-light-red hover- ma2 pa2 br2">About</Nav.Link>
                    <Nav.Link href="#" className=" hover-bg-light-red hover- ma2 pa2 br2">Docs</Nav.Link>
                    <Nav.Link href="#" className=" hover-bg-light-red hover- ma2 pa2 br2">Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
