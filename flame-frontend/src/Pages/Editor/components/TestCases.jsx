import React from "react";
import { Box, Button, VStack } from "@chakra-ui/react";

const TestCases = ({ testCases }) => {
    
      
    console.log(testCases);
      
  return (
    <Box>
      <VStack spacing={4}>
        {testCases.map((testCase, index) => (
          <Button
            key={index}
            colorScheme="blue"
            // onClick={() => onButtonClick(testCase)}
          >
            Test Case {index + 1}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default TestCases;
