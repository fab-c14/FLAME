import React from 'react';
import { Container, VStack, HStack, Text, Link, Icon, Divider, Box } from '@chakra-ui/react';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { Fade, Zoom } from 'react-awesome-reveal';

const Footer = () => {
    return (
        <Box 
            as="footer" 
            className="shadow-3 bg-green ma3 pa2 br3 bw2 b--red"
            bg="gray.800"
            color="white"
            py={8}
        >
            <Container maxW="container.xl">
                <VStack spacing={6}>
                    <Divider borderColor="gray.300" />
                    
                    {/* Footer Text with Fade animation */}
                    <Fade direction="up" cascade>
                        <Text 
                            textAlign="center" 
                            fontFamily="'Roboto', sans-serif"
                            fontSize="sm"
                        >
                            © {new Date().getFullYear()} FLAME. All rights reserved.
                        </Text>
                    </Fade>

                    {/* Social Media Links with Zoom animation */}
                    <Zoom delay={300}>
                        <HStack spacing={6}>
                            <Link 
                                href="https://github.com/fab-c14" 
                                isExternal
                                _hover={{ transform: 'scale(1.1)' }}
                                transition="transform 0.2s"
                            >
                                <Icon as={FaGithub} boxSize={8} className="grow" />
                            </Link>
                            <Link 
                                href="https://twitter.com/fab14c" 
                                isExternal
                                _hover={{ transform: 'scale(1.1)' }}
                                transition="transform 0.2s"
                            >
                                <Icon as={FaTwitter} boxSize={8} className="grow" />
                            </Link>
                            <Link 
                                href="https://www.linkedin.com/in/faisal-ahmad-bhat-aaba29229/" 
                                isExternal
                                _hover={{ transform: 'scale(1.1)' }}
                                transition="transform 0.2s"
                            >
                                <Icon as={FaLinkedin} boxSize={8} className="grow" />
                            </Link>
                        </HStack>
                    </Zoom>
                    
                    <Divider borderColor="gray.300" />
                </VStack>
            </Container>
        </Box>
    );
}

export default Footer;
