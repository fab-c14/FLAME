import React from 'react';
import { FaRocket } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Slide, Fade, Zoom } from 'react-awesome-reveal';
import Button from '../ui/Button';
import Container from '../ui/Container';
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
    <header className="relative overflow-hidden py-20 m-4 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border border-white/20 shadow-2xl">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Slide direction="left">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  FLAME
                </span>
              </h1>
            </Slide>

            <Fade delay={200}>
              <p className="text-xl text-white/90 mb-8 leading-relaxed">
                Your platform for interactive learning and coding excellence. 
                Master programming skills with hands-on practice and expert guidance.
              </p>
            </Fade>

            <div className="flex flex-col sm:flex-row gap-4">
              <Zoom direction="bottom" delay={400}>
                <Button
                  onClick={handleClick}
                  icon={FaRocket}
                  className="group"
                >
                  Get Started
                </Button>
              </Zoom>

              <Zoom direction="right" delay={400}>
                <Button
                  variant="secondary"
                  onClick={goToDocs}
                >
                  Learn More
                </Button>
              </Zoom>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <Fade delay={600}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
                  <div className="space-y-4">
                    <div className="h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded"></div>
                    <div className="h-3 bg-white/30 rounded w-3/4"></div>
                    <div className="h-3 bg-white/20 rounded w-1/2"></div>
                    <div className="space-y-2">
                      <div className="h-2 bg-white/10 rounded"></div>
                      <div className="h-2 bg-white/10 rounded w-5/6"></div>
                      <div className="h-2 bg-white/10 rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
        </div>

        <Fade delay={700}>
          <div className="mt-20 pt-12 border-t border-white/20">
            <Slide direction="up" delay={800}>
              <h2 className="text-3xl font-bold text-white text-center mb-6">
                Discover the Possibilities
              </h2>
            </Slide>
            <Fade delay={1000}>
              <p className="text-lg text-white/80 text-center max-w-3xl mx-auto leading-relaxed">
                Explore our interactive coding labs, access a wide range of programming languages,
                solve challenging problems with test cases, and sharpen your development skills
                in a collaborative learning environment.
              </p>
            </Fade>
          </div>
        </Fade>
      </Container>
    </header>
  );
}

export default Header;
