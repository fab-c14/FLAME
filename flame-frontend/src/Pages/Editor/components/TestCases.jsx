import React, { useState } from "react";
import { Box, Button, HStack } from "@chakra-ui/react";
// for now this file is not used later we may use this file 
const TestCases = ({ testCases,isSuccess,isLoading }) => {
  if (testCases === null){
    return;
  }
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
