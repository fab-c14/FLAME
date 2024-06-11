import React, { useState } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";

const TestCases = ({ testCases,isSuccess,isLoading }) => {
  
  return (
    <Box>
      <HStack spacing={4} className="pa4">
        {testCases.map((testCase, index) => (
          <Button
            key={index}
            colorScheme={isSuccess ? "green" : "red"}
            isLoading={isLoading}
  
          >
            Test Case {index + 1}
          </Button>
        ))}
      </HStack>
    </Box>
  );
};

export default TestCases;
