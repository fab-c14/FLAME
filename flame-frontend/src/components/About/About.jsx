import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Heading,
  Text,
  Button,
  Icon,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaCheckCircle, FaBookOpen } from 'react-icons/fa';
import { GiLaurelsTrophy } from 'react-icons/gi';
import { GiPencilBrush } from 'react-icons/gi';
import { motion } from 'framer-motion';

const About = ({ isLoggedIn }) => {
  return (
    <Box as="section" py={{ base: 8, md: 14 }} px={4}>
      <Container maxW="container.lg">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
            <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }}>
            <Box bg="rgba(255,255,255,0.8)" p={8} borderRadius="md" shadow="md">
              <Stack spacing={4}>
                <Heading as="h2" size="xl">FLAME — Learn by Doing</Heading>
                <Text fontSize="lg" color="gray.700">
                  FLAME is a lightweight learning platform designed for college and university courses.
                  Practice with auto-graded labs, track your progress, and build confidence with hands-on
                  programming exercises.
                </Text>

                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.400" /> Auto-graded testcases for immediate feedback
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.400" /> Versioned submissions & progress history
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.400" /> Multi-language support and starter templates
                  </ListItem>
                </List>

                <Text fontSize="sm" color="gray.500">
                  FLAME helps students focus on learning concepts while giving instructors
                  simple tools for assignment distribution and grading.
                </Text>
              </Stack>
            </Box>
          </motion.div>

            <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
            <Box p={6} borderRadius="md">
              <Stack spacing={6}>
                <Box bg="rgba(255,255,255,0.85)" p={6} borderRadius="md" shadow="sm">
                  <Heading as="h3" size="md" mb={3} display="flex" alignItems="center" gap={3}>
                    <Icon as={GiLaurelsTrophy} boxSize={6} color="orange.400" /> For Instructors
                  </Heading>
                  <Text color="gray.700">
                    Create batches, share assignments, and review submissions with private testcases. Export grade
                    reports in CSV for LMS import.
                  </Text>
                </Box>

                 <Box bg="rgba(255,255,255,0.85)" p={6} borderRadius="md" shadow="sm">
                  <Heading as="h3" size="md" mb={3} display="flex" alignItems="center" gap={3}>
                    <Icon as={GiPencilBrush} boxSize={6} color="orange.400" /> For Students
                  </Heading>
                  <Text color="gray.700">
                    Join batches, Solve Questions, Submit and run test cases on Code.
                    Explore variety of language.
                  </Text>
                </Box>

                <Box bg="rgba(255,255,255,0.85)" p={6} borderRadius="md" shadow="sm">
                  <Heading as="h3" size="md" mb={3} display="flex" alignItems="center" gap={3}>
                    <Icon as={FaBookOpen} boxSize={5} color="teal.400" /> How to Start
                  </Heading>
                  <Text color="gray.700" mb={3}>
                    Join a batch from your instructor, open an assignment in the Editor, run testcases locally and submit when ready.
                  </Text>

                  <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
                    <Button as={RouterLink} to={isLoggedIn ? '/profile' : '/login'} colorScheme="green">{isLoggedIn ? 'Go To Profile' : 'Login'}</Button>
                    <Button as={RouterLink} to={isLoggedIn ? '/editor' : '/register'} colorScheme="orange" variant="outline">{isLoggedIn ? 'Start Coding' : 'Register'}</Button>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </motion.div>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default About;
//