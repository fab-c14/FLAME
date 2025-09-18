import React from 'react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Fade, Zoom } from 'react-awesome-reveal';
import Container from '../ui/Container';

const Footer = () => {
    const socialLinks = [
        {
            href: "https://github.com/fab-c14",
            icon: FaGithub,
            label: "GitHub"
        },
        {
            href: "https://twitter.com/fab14c", 
            icon: FaTwitter,
            label: "Twitter"
        },
        {
            href: "https://www.linkedin.com/in/faisal-ahmad-bhat-aaba29229/",
            icon: FaLinkedin,
            label: "LinkedIn"
        }
    ];

    return (
        <footer className="relative py-12 m-4 rounded-3xl bg-gradient-to-t from-black/20 to-white/5 backdrop-blur-lg border border-white/20 shadow-2xl">
            <Container>
                <div className="flex flex-col items-center space-y-8">
                    {/* Footer Text */}
                    <Fade direction="up" cascade>
                        <div className="text-center">
                            <p className="text-white/90 text-lg">
                                © {new Date().getFullYear()} FLAME. All rights reserved.
                            </p>
                            <p className="text-white/60 text-sm mt-2">
                                Foundation for Learning Assistance and Management Environment
                            </p>
                        </div>
                    </Fade>

                    {/* Social Media Links */}
                    <Zoom delay={300}>
                        <div className="flex space-x-6">
                            {socialLinks.map((link, index) => {
                                const IconComponent = link.icon;
                                return (
                                    <a
                                        key={index}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                        aria-label={link.label}
                                    >
                                        <IconComponent className="h-6 w-6 text-white/80 group-hover:text-white transition-colors duration-300" />
                                        
                                        {/* Tooltip */}
                                        <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                                            {link.label}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </Zoom>

                    {/* Decorative Line */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
