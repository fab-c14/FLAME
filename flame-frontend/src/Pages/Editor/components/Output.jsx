// Output.js
import React, { useState, useEffect } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { submitAnswer, getAnswers } from "../../../actions/answerActions";
import { executeCode } from "../api";
import { capitalizeFirstLetter } from "./utils";

const Output = ({ editorRef, language, question, userId, name }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { answers, loading, error } = useSelector(state => state.submissions);

  useEffect(() => {
    dispatch(getAnswers());
  }, [dispatch]);

  let testCases = [];
  if (question !== undefined) {
    testCases = (question.testCases) || [];
  }

  if (userId === undefined) {
    userId = 0;
  }
  if (name === undefined) {
    name = "New User";
  }

  
  const runCode = async (action) => {
    const sourceCode = editorRef.current.getValue();

    console.log(sourceCode);

    const input = {
      language: capitalizeFirstLetter(language),
      code: sourceCode,
      testCases: testCases.map(tc => ({ input: tc.input, output: tc.expectedOutput })),
      timeout: 2
    };

    if (!sourceCode) return;
   

    try {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);
      setOutput(null);
      setTestResults([]);
      if (action === 'submit') {
        await dispatch(submitAnswer(userId, sourceCode, language, name, question._id, question.title,testResults));
        const tests = await executeCode(language, sourceCode, action, input);
        setIsSuccess(true);
        setTestResults(tests);
        setOutput(tests.map(test => test.obtainedOutput));
        setIsError(tests.some(test => test.remarks === 'Fail'));
        setIsSuccess(!tests.some(test => test.remarks === 'Fail'));
      } else if (action === 'test') {
        const tests = await executeCode(language, sourceCode, action, input);
        setTestResults(tests);
        setIsError(tests.some(test => test.remarks === 'Fail'));
        setIsSuccess(!tests.some(test => test.remarks === 'Fail'));
      } else {
        const result = await executeCode(language, sourceCode, action, input);
        setOutput(result.run.output ? result.run.output.split("\n") : []);
        setIsError(!!result.run.stderr);
        setIsSuccess(!result.run.stderr);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={() => runCode('run')}
      >
        Run Code
      </Button>
      &nbsp;
      {question && (
        <>
          <Button
            variant="outline"
            colorScheme="green"
            mb={4}
            isLoading={isLoading}
            onClick={() => runCode('test')}
          >
            Run Tests
          </Button>
          &nbsp;
          <Button
            variant="outline"
            colorScheme="green"
            mb={4}
            isLoading={isLoading}
            onClick={() => runCode('submit')}
          >
            Submit Code
          </Button>
        </>
      )}
      &nbsp;
      <Button
        variant="outline"
        colorScheme="white"
        mb={4}
        onClick={() => navigate('/')}
      >
        Go Back
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
        {testResults.length > 0 && (
          <Box mt={4}>
            <Text>Test Results:</Text>
            {testResults.map((test, index) => (
              <Text
                key={index}
                color={test.remarks === ('Pass') ? 'green.500' : 'red.500'}
                fontSize="md"
                fontWeight="medium"
                lineHeight="tall"
                mb={2}
              >
                Input: {test.input} | Expected Output: {test.output} | Obtained Output: {test.obtainedOutput} | Remarks: {test.remarks}
              </Text>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Output;