import React from 'react';
import {
  Container,
  SimpleGrid,
  Box,
  Heading,
  Text,
  Button as ChakraButton,
  Stack,
} from "@chakra-ui/react";
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

const Docs = () => {
  const navigate = useNavigate();

  return (
    <Box as="section" py={10} px={4}>
      <Container maxW="container.lg">
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Heading as="h2" size="xl" textAlign="center" mb={4}>
            Documentation
          </Heading>
          <Text textAlign="center" mb={8}>
            Guides for students and instructors: quick start, assignments, and
            integration tips for coursework.
          </Text>
        </motion.div>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Box p={4} shadow="sm" borderWidth="1px" borderRadius="md">
              <Heading as="h3" size="md" mb={2}>
                Getting Started
              </Heading>
              <Text>
                Setup guides for students & instructors, plus sample assignments
                and grading workflows.
              </Text>
            </Box>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <Box p={4} shadow="sm" borderWidth="1px" borderRadius="md">
              <Heading as="h3" size="md" mb={2}>
                Features
              </Heading>
              <Text>
                Real-time testcases, language support, versioned submissions and
                solution history.
              </Text>
            </Box>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }}>
            <Box p={4} shadow="sm" borderWidth="1px" borderRadius="md">
              <Heading as="h3" size="md" mb={2}>
                FAQs
              </Heading>
              <Text>
                Answers for common questions about using FLAME in coursework and
                labs.
              </Text>
            </Box>
          </motion.div>
        </SimpleGrid>

        {/* <Zoom delay={300}> */}
        <Stack align="center">
          <ChakraButton
            colorScheme="orange"
            size="lg"
            onClick={() => navigate("/docs")}
            leftIcon={<FaBook />}
          >
            View Full Documentation
          </ChakraButton>
        </Stack>
        {/* </Zoom> */}
      </Container>
    </Box>
  );
};

export default Docs;
