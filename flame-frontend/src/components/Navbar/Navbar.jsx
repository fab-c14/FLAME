import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const CustomNavbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Mock user authentication for demonstration
    useEffect(() => {
        // Simulate a login status check
        const userLoggedIn = localStorage.getItem('token') !== null; // Check if 'user' exists in local storage
        setIsLoggedIn(userLoggedIn);
    }, []);

    const handleLogout = async () => {
        // Perform actual logout logic (e.g., clear local storage, invalidate tokens, etc.)
        // Then update the state to reflect that the user is logged out
        setIsLoggedIn(false);
    };

    return (
        <Navbar expand="lg" className="py-3 black shadow-3 ma3 br2 bw1 b pa2 ba b--white-80 hover-navbar">
            <Navbar.Brand href="#" className="mr-auto ml4 ma2">
                <div>
                    <img src={logo} alt="Logo" height="45" className="d-inline-block align-top br2 b--black" />
                </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav pa2 ma2" />
            <Navbar.Collapse id="basic-navbar-nav ma2 pa2 py-3">
                <Nav className="ml-auto">
                    <Link to="/" className="nav-link hover-bg-light-red ma2 pa2 br2">Home</Link>
                    <Link to="/about" className="nav-link hover-bg-light-red ma2 pa2 br2">About</Link>
                    <Link to="/docs" className="nav-link hover-bg-light-red ma2 pa2 br2">Docs</Link>
                    {isLoggedIn ? (
                        <>
                        <Link to="/profile" className="nav-link hover-bg-light-red ma2 pa2 br2 d-flex align-items-center">
                            <FiUser className="mr2" /> Profile
                        </Link>
                    
                        </>
                        ) : (
                            <Link to="/login" className="nav-link hover-bg-light-red ma2 pa2 br2">Login</Link>
                        )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
