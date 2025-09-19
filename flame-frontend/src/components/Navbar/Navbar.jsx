import React, { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  Image,
  IconButton,
  useDisclosure,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const CustomNavbar = ({ isLoggedIn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavLink = ({ children, to, ...rest }) => (
    <ChakraLink
      as={Link}
      to={to}
      className="hover-bg-light-red ma2 pa2 br2 grow transition-colors"
      _hover={{
        textDecoration: 'none',
        bg: 'red.100',
      }}
      {...rest}
    >
      {children}
    </ChakraLink>
  );

  return (
    <Box className="py-3 shadow-3 ma3 br2 bw1 b pa2 ba hover-navbar b--black">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box>
            <Image 
              src={logo} 
              alt="Logo" 
              height="45px" 
              className="br2 b--black dim" 
            />
          </Box>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/docs">Docs</NavLink>
          </HStack>
        </HStack>
        
        <Flex alignItems="center">
          <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink to={isLoggedIn ? '/Profile' : '/login'}>
              <Flex align="center" gap={2}>
                {isLoggedIn ? (
                  <>
                    <FiUser /> Profile
                  </>
                ) : (
                  'Login'
                )}
              </Flex>
            </NavLink>
          </HStack>
          
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            className="pa2 ma2 glow"
          />
        </Flex>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            <NavLink to="/" onClick={onClose}>Home</NavLink>
            <NavLink to="/about" onClick={onClose}>About</NavLink>
            <NavLink to="/docs" onClick={onClose}>Docs</NavLink>
            <NavLink to={isLoggedIn ? '/Profile' : '/login'} onClick={onClose}>
              <Flex align="center" gap={2}>
                {isLoggedIn ? (
                  <>
                    <FiUser /> Profile
                  </>
                ) : (
                  'Login'
                )}
              </Flex>
            </NavLink>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default CustomNavbar;
