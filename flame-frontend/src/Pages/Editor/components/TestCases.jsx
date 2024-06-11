import React, { useState } from "react";
import { Box, Button, VStack } from "@chakra-ui/react";

const TestCases = ({ testCases }) => {
  const [executionStatus, setExecutionStatus] = useState(
    Array(testCases.length).fill(false)
  );

  const onButtonClick = (testCase, index) => {
   
    const isSuccess = executeCode(testCase); 
    const newStatus = [...executionStatus];
    newStatus[index] = isSuccess;
    setExecutionStatus(newStatus);
  };

  const executeCode = (testCase) => {
    // Replace this with your actual code execution logic
    // For demonstration, we'll assume the code always executes successfully
    return true;
  };

  return (
    <Box>
      <VStack spacing={4}>
        {testCases.map((testCase, index) => (
          <Button
            key={index}
            colorScheme={executionStatus[index] ? "green" : "blue"}
            onClick={() => onButtonClick(testCase, index)}
          >
            Test Case {index + 1}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default TestCases;
