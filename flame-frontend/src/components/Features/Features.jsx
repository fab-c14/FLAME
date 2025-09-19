import React from 'react';
import { Container, SimpleGrid, Box, Heading, Text, VStack, Icon } from '@chakra-ui/react';
import { FaCode, FaChalkboardTeacher, FaChartBar } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import './Features.css';

function Features() {
    const features = [
        {
            icon: FaCode,
            title: "Interactive Coding Labs",
            description: "Practice coding skills with hands-on labs covering various programming languages and topics."
        },
        {
            icon: FaChalkboardTeacher,
            title: "Solve Questions",
            description: "Access expert-led batches, where you/others can solve questions posted by batch instructors."
        },
        {
            icon: FaChartBar,
            title: "Performance Tracking",
            description: "Monitor student performance and progress using our detailed tracking system."
        }
    ];

    return (
        <Box
            as="section"
            className="py-5 shadow-3 ma3 pa2 bb bt b--black-20 features-background"
        >
            <Container maxW="container.xl">
                <Fade direction="up" cascade damping={0.15}>
                    <VStack spacing={12}>
                        <Heading 
                            size="xl" 
                            textAlign="center" 
                            className="feature-title"
                            fontFamily="'Poppins', sans-serif"
                        >
                            Key Features
                        </Heading>
                        
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
                            {features.map((feature, index) => (
                                <VStack 
                                    key={index}
                                    spacing={4} 
                                    textAlign="center"
                                    p={6}
                                    borderRadius="lg"
                                    transition="transform 0.3s"
                                    _hover={{ transform: "translateY(-5px)" }}
                                >
                                    <Icon 
                                        as={feature.icon} 
                                        boxSize={16} 
                                        color="blue.500"
                                        className="mb-3"
                                    />
                                    <Heading 
                                        size="md" 
                                        className="feature-subtitle"
                                        fontFamily="'Poppins', sans-serif"
                                    >
                                        {feature.title}
                                    </Heading>
                                    <Text 
                                        className="feature-text"
                                        color="gray.600"
                                        fontFamily="'Roboto', sans-serif"
                                    >
                                        {feature.description}
                                    </Text>
                                </VStack>
                            ))}
                        </SimpleGrid>
                    </VStack>
                </Fade>
            </Container>
        </Box>
    );
}

export default Features;
