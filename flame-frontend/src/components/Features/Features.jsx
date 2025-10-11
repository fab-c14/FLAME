import React from 'react';
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { FaCode, FaChalkboardTeacher, FaChartBar } from "react-icons/fa";
import { motion } from "framer-motion";

function Features() {
  return (
    <Box as="section" py={10} px={4}>
      <Container maxW="container.lg">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Heading as="h2" size="xl" textAlign="center" mb={8}>
            Key Features
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
            <motion.div whileHover={{ scale: 1.03 }}>
              <Stack spacing={4} textAlign="center" align="center">
                <FaCode size={60} />
                <Heading as="h3" size="md">
                  Interactive Coding Labs
                </Heading>
                <Text>
                  Hands-on labs tailored for assignments and practice problems
                  in university courses.
                </Text>
              </Stack>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }}>
              <Stack spacing={4} textAlign="center" align="center">
                <FaChalkboardTeacher size={60} />
                <Heading as="h3" size="md">
                  Collaborative Batches
                </Heading>
                <Text>
                  Join instructor-led batches, share solutions and discuss
                  approaches with peers.
                </Text>
              </Stack>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }}>
              <Stack spacing={4} textAlign="center" align="center">
                <FaChartBar size={60} />
                <Heading as="h3" size="md">
                  Performance Tracking
                </Heading>
                <Text>
                  Built-in analytics to help students track progress across
                  assignments and tests.
                </Text>
              </Stack>
            </motion.div>
          </SimpleGrid>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Features;
