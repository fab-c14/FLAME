import React from 'react';
import {
  Box,
  Container,
  HStack,
  Text,
  Link,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export function Footer() {
  const border = useColorModeValue("gray.100", "gray.700");

  return (
    <Box as="footer" py={4} borderTopWidth={1} borderColor={border}>
      <Container maxW="container.lg">
        <HStack justify="space-between" align="center">
          <Text fontSize="sm" color="gray.600">
            © {new Date().getFullYear()} FLAME
          </Text>

          <HStack spacing={4}>
            <Link href="/docs" color="gray.600">
              Docs
            </Link>
            <Link href="/features" color="gray.600">
              Features
            </Link>
            <Link href="mailto:hello@flame.example" color="gray.600">
              Contact
            </Link>
          </HStack>

          <HStack spacing={3}>
            <Link href="https://github.com/fab-c14" isExternal>
              <Icon as={FaGithub} />
            </Link>
            <Link href="https://twitter.com/fab14c" isExternal>
              <Icon as={FaTwitter} />
            </Link>
            <Link
              href="https://www.linkedin.com/in/faisal-ahmad-bhat-aaba29229/"
              isExternal
            >
              <Icon as={FaLinkedin} />
            </Link>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}
export default Footer;