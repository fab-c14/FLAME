import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const userType = formData.get("userType");

    dispatch(loginUser(email, password, userType))
      .then(() => {
        if (!error) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // Show an error toast using your custom Toaster component
        setToastProps({
          type: "error",
          message:
            "There was an error logging you in. Please check your credentials.",
        });
      });
  };

  const [userType, setUserType] = useState("student");

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  return (
    <Box maxW="md" mx="auto" mt={8} p={6} borderWidth={1} borderRadius="md">
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>User Type</FormLabel>
            <Select
              name="userType"
              onChange={(e) => handleUserTypeChange(e.target.value)}
              defaultValue={userType}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" name="email" placeholder="Enter email" />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" name="password" placeholder="Password" />
          </FormControl>

          <Button
            colorScheme="blue"
            type="submit"
            isLoading={isLoading}
            loadingText="Loading..."
          >
            Login
          </Button>

          <Button
            as={Link}
            to="/register"
            colorScheme="orange"
            variant="outline"
          >
            Register
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
