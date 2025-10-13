import React, { useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getAnswers, clearAnswers } from "../../actions/answerActions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserStatsChart = ({ selectedStudent }) => {
  const dispatch = useDispatch();
  const solvedQuestions = useSelector((state) => state.submissions.answers);

  useEffect(() => {
    if (selectedStudent) {
      dispatch(clearAnswers());
      dispatch(getAnswers(selectedStudent._id));
    }
  }, [dispatch, selectedStudent]);

  const panelBg = useColorModeValue("gray.50", "gray.800");

  if (!selectedStudent) {
    return (
      <Box bg={panelBg} p={4} borderRadius="md" shadow="sm">
        <Heading size="md">No Student Selected</Heading>
      </Box>
    );
  }

  const barData = {
    labels: ["Total Runs", "Successful Runs", "Failed Runs"],
    datasets: [
      {
        label: "Runs",
        data: [
          selectedStudent.stats.totalRuns || 0,
          selectedStudent.stats.successfulRuns || 0,
          selectedStudent.stats.failedRuns || 0,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  return (
    <Box bg={panelBg} p={4} borderRadius="md" shadow="sm">
      <Heading size="md">Progress of {selectedStudent.name}</Heading>
      <VStack align="start" mt={3} spacing={3}>
        <HStack>
          <Text>
            <strong>Total Codes Run:</strong>{" "}
            {selectedStudent.stats.totalRuns || 0}
          </Text>
          <Text>
            <strong>Successful Runs:</strong>{" "}
            {selectedStudent.stats.successfulRuns || 0}
          </Text>
          <Text>
            <strong>Failed Runs:</strong>{" "}
            {selectedStudent.stats.failedRuns || 0}
          </Text>
        </HStack>
        <Box w="100%">
          <Bar data={barData} options={barOptions} />
        </Box>
        <VStack align="stretch" w="100%">
          {Array.isArray(solvedQuestions) && solvedQuestions.length > 0 ? (
            solvedQuestions.map((answer) => (
              <Box
                key={answer.questionId}
                p={2}
                bg={useColorModeValue("white", "gray.700")}
                borderRadius="md"
              >
                <Text>
                  <strong>Question ID:</strong> {answer.questionId}
                </Text>
                <Text>
                  <strong>Title:</strong> {answer.questionTitle}
                </Text>
                <Text>
                  <strong>Language:</strong> {answer.language}
                </Text>
                <pre>{answer.code || "No code available"}</pre>
              </Box>
            ))
          ) : (
            <Text>No solved questions available.</Text>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default UserStatsChart;
