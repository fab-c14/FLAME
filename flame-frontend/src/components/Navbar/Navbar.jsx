import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  useColorMode,
  useColorModeValue,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { FiUser } from "react-icons/fi";
import logo from "../../assets/logo.svg";

const CustomNavbar = ({ isLoggedIn }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      bg={bg}
      px={4}
      borderBottomWidth={1}
      borderColor={borderColor}
      boxShadow="sm"
    >
      <Flex h={16} alignItems={"center"}>
        <Link as={RouterLink} to="/">
          <HStack spacing={3} alignItems="center">
            <Image src={logo} alt="FLAME" height="10" />
            <Text fontWeight="bold">FLAME</Text>
          </HStack>
        </Link>

        <Spacer />

        <HStack
          as={"nav"}
          spacing={4}
          alignItems="center"
          display={{ base: "none", md: "flex" }}
        >
          <Link
            as={RouterLink}
            to="/"
            px={3}
            py={2}
            rounded={"md"}
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.100", "gray.700"),
            }}
          >
            Home
          </Link>
          <Link
            as={RouterLink}
            to="/about"
            px={3}
            py={2}
            rounded={"md"}
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.100", "gray.700"),
            }}
          >
            About
          </Link>
          <Link
            as={RouterLink}
            to="/docs"
            px={3}
            py={2}
            rounded={"md"}
            _hover={{
              textDecoration: "none",
              bg: useColorModeValue("gray.100", "gray.700"),
            }}
          >
            Docs
          </Link>
          {isLoggedIn ? (
            <Link
              as={RouterLink}
              to="/Profile"
              px={3}
              py={2}
              rounded={"md"}
              display="flex"
              alignItems="center"
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.100", "gray.700"),
              }}
            >
              <FiUser style={{ marginRight: 8 }} /> Profile
            </Link>
          ) : (
            <Link
              as={RouterLink}
              to="/login"
              px={3}
              py={2}
              rounded={"md"}
              _hover={{
                textDecoration: "none",
                bg: useColorModeValue("gray.100", "gray.700"),
              }}
            >
              Login
            </Link>
          )}

          <IconButton
            aria-label="Toggle color mode"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            size="sm"
          />
        </HStack>

        <Box display={{ base: "flex", md: "none" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<HamburgerIcon />}
              aria-label="Open menu"
            />
            <MenuList>
              <MenuItem as={RouterLink} to="/">
                Home
              </MenuItem>
              <MenuItem as={RouterLink} to="/about">
                About
              </MenuItem>
              <MenuItem as={RouterLink} to="/docs">
                Docs
              </MenuItem>
              {isLoggedIn ? (
                <MenuItem as={RouterLink} to="/Profile">
                  Profile
                </MenuItem>
              ) : (
                <MenuItem as={RouterLink} to="/login">
                  Login
                </MenuItem>
              )}
              <MenuItem onClick={toggleColorMode}>
                {colorMode === "light" ? "Dark" : "Light"} Mode
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default CustomNavbar;
