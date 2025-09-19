import React, { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../actions/authActions';
import './Login.css';
import Skeleton from 'react-loading-skeleton';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(state => state.auth);
  const [userType, setUserType] = useState('student');
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const userType = formData.get('userType');

    dispatch(loginUser(email, password, userType)).then(() => {
      if (!error) {
        navigate('/');
        toast({
          title: 'Login successful',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }
    }).catch((error) => {
      console.error('Login failed:', error);
      toast({
        title: 'Login failed',
        description: 'There was an error logging you in. Please check your credentials.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    });
  };

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  return (
    <Box className="ma3 pa2 py-3 b br4 center">
      <Container className="mb-3 cardLogin">
        <VStack spacing={8} align="center" maxW="md" mx="auto">
          <Heading size="lg" textAlign="center">
            Login
          </Heading>
          
          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Box as="form" onSubmit={handleSubmit} w="full">
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>User Type</FormLabel>
                <Select
                  name="userType"
                  value={userType}
                  onChange={(e) => handleUserTypeChange(e.target.value)}
                  bg="white"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  bg="white"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  bg="white"
                />
              </FormControl>

              <VStack spacing={3} w="full">
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  w="full"
                  isLoading={isLoading}
                  loadingText="Logging in..."
                >
                  {isLoading ? <Skeleton height={20} width={60} /> : 'Login'}
                </Button>

                <Button
                  as={Link}
                  to="/register"
                  colorScheme="yellow"
                  variant="solid"
                  size="lg"
                  w="full"
                >
                  Register
                </Button>
              </VStack>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Login;
