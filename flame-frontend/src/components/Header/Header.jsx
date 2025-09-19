import React from 'react';
import { Box, Container, Heading, Text, Button, Flex, Divider } from '@chakra-ui/react';
import { FaRocket } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Slide, Fade, Zoom } from 'react-awesome-reveal';
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
    <Box 
      as="header" 
      className="shadow-2 py-5 ma3 br2 bw1 bt bb b--dark-pink header-background"
    >
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between" className="mb-4">
          <Box flex="1" maxW="lg">
            <Slide direction="left">
              <Heading 
                as="h1" 
                size="2xl" 
                fontFamily="'Montserrat', sans-serif"
                className="mb-4"
              >
                Welcome to FLAME
              </Heading>
            </Slide>

            <Fade delay={200}>
              <Text fontSize="xl" className="mb-6 text-gray-600">
                Your platform for interactive learning
              </Text>
            </Fade>

            <Flex gap={4} className="flex-wrap">
              <Zoom direction="bottom" delay={400}>
                <Button
                  colorScheme="yellow"
                  size="lg"
                  className="hover-button font-bold"
                  onClick={handleClick}
                  leftIcon={<FaRocket />}
                >
                  Get Started
                </Button>
              </Zoom>

              <Zoom direction="right" delay={400}>
                <Button
                  variant="outline"
                  size="lg"
                  className="font-bold bg-washed-red"
                  colorScheme="gray"
                  color="black"
                  onClick={goToDocs}
                >
                  Learn More
                </Button>
              </Zoom>
            </Flex>
          </Box>
        </Flex>
      </Container>

      <Fade delay={700}>
        <Divider className="mt-5 mb-4" />
      </Fade>

      <Container maxW="container.xl">
        <Box>
          <Slide direction="up" delay={800}>
            <Heading as="h2" size="xl" className="mb-4">
              Discover the Possibilities
            </Heading>
          </Slide>
          <Fade delay={1000}>
            <Text fontSize="lg" className="text-gray-600">
              Explore our interactive coding labs, access a wide range of coding choices,
              and solve questions with testcases and sharpen your skills.
            </Text>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
}

export default Header;
