import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  Stack,
  Text,
} from "@chakra-ui/react";

const Registration = () => {
  const [userType, setUserType] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(registerUser(name, email, password, userType)).then(() => {
      navigate("/");
    });
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Registration
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>User Type</FormLabel>
            <Select
              value={userType}
              onChange={(e) => handleUserTypeChange(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button colorScheme="blue" type="submit" isLoading={isLoading}>
            {isLoading ? "Loading..." : "Register"}
          </Button>

          {error && <Text color="red.500">{error}</Text>}

          <Button as={Link} to="/login" colorScheme="orange" variant="outline">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Registration;
