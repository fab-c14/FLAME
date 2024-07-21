import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const CustomNavbar = ({isLoggedIn}) => {

    
    return (
        <Navbar expand="lg" className="py-3 black shadow-3 ma3 br2 bw1 b pa2 ba  hover-navbar b--black ">
            <Navbar.Brand href="" className="mr-auto ml4 ma2">
                <div>
                    <img src={logo} alt="Logo" height="45" className="d-inline-block align-top br2 b--black dim" />
                </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav pa2 ma2 glow" />
            <Navbar.Collapse id="basic-navbar-nav ma2 pa2 py-3">
                <Nav className="ml-auto">
                    <Link to="/" className="nav-link hover-bg-light-red ma2 pa2 br2 grow">Home</Link>
                    <Link to="/about" className="nav-link hover-bg-light-red ma2 pa2 br2 grow">About</Link>
                    <Link to="/docs" className="nav-link hover-bg-light-red ma2 pa2 br2 grow">Docs</Link>
                
                    <Link to={isLoggedIn ? `/Profile` : `/login`} className="nav-link hover-bg-light-red ma2 pa2 br2 d-flex align-items-center grow">
                            {isLoggedIn? <><FiUser className="mr2" /> Profile</> : "Login" }
                    </Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
