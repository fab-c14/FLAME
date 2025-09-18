import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';
import { GiFlame } from "react-icons/gi";
import { Slide, Fade, Zoom } from 'react-awesome-reveal';
import Container from '../ui/Container';
import Button from '../ui/Button';

const About = ({ isLoggedIn }) => {
  return (
    <section className="py-20 m-4">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Icon */}
          <div className="flex justify-center">
            <Slide direction="left">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
                <GiFlame className="relative text-red-400 hover:text-red-300 transition-colors duration-300" size={300} />
              </div>
            </Slide>
          </div>

          {/* Right Text */}
          <div className="text-white space-y-6">
            <Fade direction="down" cascade damping={0.1}>
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-6 gradient-text">
                  About FLAME
                </h2>
                <p className="text-lg text-white/90 leading-relaxed mb-6">
                  Welcome to FLAME (Foundation for Learning Assistance and Management Environment), 
                  your platform for interactive learning. Our mission is to empower students with 
                  the tools and resources they need to excel in their academic journey.
                </p>
                <p className="text-lg text-white/80 leading-relaxed">
                  At FLAME, we believe in the power of hands-on learning. Our platform provides 
                  a rich environment for students to practice coding, experiment with different 
                  programming languages, and collaborate with peers on exciting projects.
                </p>
              </div>
            </Fade>

            {/* Buttons with animation */}
            <Zoom delay={600}>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to={isLoggedIn ? '/profile' : '/login'}>
                  <Button className="w-full sm:w-auto">
                    {isLoggedIn ? "Go To Profile" : "Login"}
                  </Button>
                </Link>

                <Link to={isLoggedIn ? "/editor" : "/register"}>
                  <Button variant="secondary" className="w-full sm:w-auto">
                    {isLoggedIn ? "Start Coding" : "Register"}
                  </Button>
                </Link>
              </div>
            </Zoom>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
