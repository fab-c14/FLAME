import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button as ChakraButton,
  HStack,
} from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Header.css";

function Header({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(isLoggedIn ? "/editor" : "/login");
  };

  const goToDocs = () => {
    navigate("/Docs");
  };

  return (
    <Box
      as="header"
      className="header-background"
      py={{ base: 8, md: 16 }}
      px={4}
    >
      <Container maxW="container.lg">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Heading as="h1" size="2xl" fontFamily="Montserrat, sans-serif">
            FLAME — Interactive Coding Labs for University Students
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Text fontSize="lg" mt={4}>
            Build projects, practice algorithms, and prepare for technical
            interviews — designed for college coursework and lab assignments.
          </Text>
        </motion.div>

        <HStack spacing={4} mt={6}>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <ChakraButton
              colorScheme="orange"
              onClick={handleClick}
              leftIcon={<FaRocket />}
            >
              Get Started
            </ChakraButton>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.45 }}
          >
            <ChakraButton variant="outline" onClick={goToDocs}>
              Learn More
            </ChakraButton>
          </motion.div>
        </HStack>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Box as="hr" my={8} />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Heading as="h2" size="lg">
            Tools for Coursework, Labs & Interviews
          </Heading>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <Text mt={3}>
            Use curated practice problems, auto-graded testcases, and
            collaborative features to learn faster and stay organized.
          </Text>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Header;
