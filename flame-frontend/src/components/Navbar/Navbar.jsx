import React, { useState } from 'react';
import { FiUser, FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const CustomNavbar = ({ isLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/docs', label: 'Docs' },
  ];

  return (
    <nav className="relative bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg m-4 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="transition-transform duration-300 group-hover:scale-110">
              <img 
                src={logo} 
                alt="FLAME Logo" 
                className="h-12 w-12 rounded-lg border border-white/30 shadow-lg"
              />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">FLAME</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={isLoggedIn ? '/Profile' : '/login'}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium"
            >
              <FiUser className="h-4 w-4" />
              <span>{isLoggedIn ? 'Profile' : 'Login'}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-300"
          >
            {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 border-t border-white/20 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to={isLoggedIn ? '/Profile' : '/login'}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium"
            >
              <FiUser className="h-4 w-4" />
              <span>{isLoggedIn ? 'Profile' : 'Login'}</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CustomNavbar;
