import React from 'react';
import { 
  Container, 
  SimpleGrid, 
  Box, 
  Heading, 
  Text, 
  Button,
  Card,
  CardBody,
  VStack
} from '@chakra-ui/react';
import { FaBook } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { Fade, Zoom } from 'react-awesome-reveal';
import './Docs.css';

const Docs = () => {
  const navigate = useNavigate();

  const docsSections = [
    {
      title: "Getting Started",
      description: "Learn how to set up your profile, start coding, and use the editor effectively.",
      direction: "left"
    },
    {
      title: "Features",
      description: "Discover key features like real-time test cases, language support, and solution history.",
      direction: "up"
    },
    {
      title: "FAQs",
      description: "Get answers to common questions about account setup, usage, and troubleshooting.",
      direction: "right"
    }
  ];

  return (
    <Box
      as="section"
      className="py-5 shadow-2 br3 ma3 pa2 b--black bw2 ba docs-background"
    >
      <Container maxW="container.xl">
        <VStack spacing={10}>
          <Fade direction="down" cascade damping={0.1}>
            <VStack spacing={4}>
              <Heading 
                size="xl" 
                textAlign="center" 
                className="docs-title"
                fontFamily="'Poppins', sans-serif"
              >
                Documentation
              </Heading>
              <Text 
                textAlign="center" 
                className="docs-text"
                fontSize="lg"
                color="gray.600"
                fontFamily="'Roboto', sans-serif"
              >
                Explore our documentation to learn more about FLAME and how to get started.
              </Text>
            </VStack>
          </Fade>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
            {docsSections.map((section, index) => (
              <Fade key={index} direction={section.direction} delay={index * 100}>
                <Card 
                  className="shadow-sm"
                  transition="transform 0.3s"
                  _hover={{ transform: "translateY(-5px)" }}
                >
                  <CardBody>
                    <VStack align="start" spacing={3}>
                      <Heading 
                        size="md" 
                        className="docs-subtitle"
                        fontFamily="'Poppins', sans-serif"
                      >
                        {section.title}
                      </Heading>
                      <Text 
                        color="gray.600"
                        fontFamily="'Roboto', sans-serif"
                      >
                        {section.description}
                      </Text>
                    </VStack>
                  </CardBody>
                </Card>
              </Fade>
            ))}
          </SimpleGrid>

          <Zoom delay={300}>
            <Button
              colorScheme="yellow"
              size="lg"
              onClick={() => navigate('/docs')}
              className="hover-button"
              leftIcon={<FaBook />}
              fontFamily="'Roboto', sans-serif"
              _hover={{ transform: 'scale(1.05)' }}
              transition="transform 0.2s"
            >
              View Full Documentation
            </Button>
          </Zoom>
        </VStack>
      </Container>
    </Box>
  );
};

export default Docs;
