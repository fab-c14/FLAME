import React, { useEffect } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Code,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAnswers, clearAnswers } from '../../actions/answerActions';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserStatsChart = ({ selectedStudent }) => {
  const dispatch = useDispatch();
  const solvedQuestions = useSelector(state => state.submissions.answers);
  const { loading, error } = useSelector(state => state.submissions);

  useEffect(() => {
    if (selectedStudent) {
      dispatch(clearAnswers());
      dispatch(getAnswers(selectedStudent._id));
    }
  }, [dispatch, selectedStudent]);

  if (!selectedStudent) {
    return (
      <Card className="br3 shadow-2 mt4">
        <CardBody>
          <Heading size="md" textAlign="center">
            No Student Selected
          </Heading>
        </CardBody>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="br3 shadow-2 mt2">
        <CardHeader>
          <Skeleton height={24} />
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            <Skeleton height={200} />
            <VStack w="full" spacing={2}>
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} height={40} />
              ))}
            </VStack>
          </VStack>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="br3 shadow-2 mt2">
        <CardBody>
          <Text color="red.500" textAlign="center">
            Error loading student data: {error}
          </Text>
        </CardBody>
      </Card>
    );
  }

  // Remove the sampleSolvedQuestions as mentioned in the comment
  const questionsData = solvedQuestions;
  
  const barData = {
    labels: ['Total Runs', 'Successful Runs', 'Failed Runs'],
    datasets: [
      {
        label: 'Runs',
        data: [
          selectedStudent.stats.totalRuns || 0,
          selectedStudent.stats.successfulRuns || 0,
          selectedStudent.stats.failedRuns || 0,
        ],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${selectedStudent.name} Performance Chart`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card className="br3 shadow-2 mt2">
      <CardHeader className="bg-light-gray">
        <Heading size="md">{selectedStudent.name} Statistics</Heading>
      </CardHeader>
      
      <CardBody>
        <VStack spacing={6}>
          <Heading size="md" textAlign="center">
            Progress of {selectedStudent.name}
          </Heading>
          
          {/* Statistics Cards */}
          <VStack w="full" spacing={3}>
            <HStack w="full" justify="space-between" p={3} bg="gray.50" borderRadius="md">
              <Text fontWeight="bold">Total Codes Run:</Text>
              <Badge colorScheme="blue" fontSize="sm">
                {selectedStudent.stats.totalRuns || 0}
              </Badge>
            </HStack>
            
            <HStack w="full" justify="space-between" p={3} bg="gray.50" borderRadius="md">
              <Text fontWeight="bold">Successful Runs:</Text>
              <Badge colorScheme="green" fontSize="sm">
                {selectedStudent.stats.successfulRuns || 0}
              </Badge>
            </HStack>
            
            <HStack w="full" justify="space-between" p={3} bg="gray.50" borderRadius="md">
              <Text fontWeight="bold">Failed Runs:</Text>
              <Badge colorScheme="red" fontSize="sm">
                {selectedStudent.stats.failedRuns || 0}
              </Badge>
            </HStack>
            
            <HStack w="full" justify="space-between" p={3} bg="gray.50" borderRadius="md">
              <Text fontWeight="bold">Last Active:</Text>
              <Text fontSize="sm">
                {selectedStudent.stats.lastActive 
                  ? new Date(selectedStudent.stats.lastActive).toLocaleString() 
                  : 'N/A'}
              </Text>
            </HStack>
          </VStack>
          
          <Divider />
          
          {/* Chart */}
          <Box w="full">
            <Bar data={barData} options={barOptions} />
          </Box>
          
          <Divider />
          
          {/* Solved Questions */}
          <VStack w="full" spacing={4} className="ma2 pa2">
            <Heading size="md">Solved Questions</Heading>
            
            {Array.isArray(questionsData) && questionsData.length > 0 ? (
              questionsData.map((answer, index) => (
                <Box 
                  key={answer.questionId} 
                  w="full" 
                  p={4} 
                  bg="gray.800" 
                  color="white" 
                  borderRadius="md"
                  className="mt2"
                >
                  <VStack align="start" spacing={2}>
                    <Text><strong>Question ID:</strong> {answer.questionId}</Text>
                    <Text><strong>Title:</strong> {answer.questionTitle}</Text>
                    <Text><strong>Language:</strong> {answer.language}</Text>
                    
                    <Divider />
                    
                    <Menu>
                      <MenuButton 
                        as={Button} 
                        rightIcon={<ChevronDownIcon />}
                        colorScheme="teal"
                        size="sm"
                      >
                        View Answer
                      </MenuButton>
                      <MenuList bg="blue.50" maxW="400px" p={4}>
                        <MenuItem bg="transparent" _hover={{ bg: 'transparent' }}>
                          <Code 
                            p={4} 
                            bg="gray.800" 
                            color="green.300" 
                            borderRadius="md" 
                            w="full"
                            whiteSpace="pre-wrap"
                            fontSize="sm"
                          >
                            {answer.code || 'No code available'}
                          </Code>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </VStack>
                </Box>
              ))
            ) : (
              <Box p={4} bg="gray.100" borderRadius="md" w="full" textAlign="center">
                <Text>No solved questions available.</Text>
              </Box>
            )}
          </VStack>
        </VStack>
      </CardBody>
    </Card> 
  );
};

export default UserStatsChart;
