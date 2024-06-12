import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import {  useNavigate } from "react-router";
import TestCases from "./TestCases";
const Output = ({ editorRef, language,question }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess,setIsSuccess] = useState(false);

  const isQuestion = question!==null;
  console.log(isQuestion);
  const navigate = useNavigate();
  const runCode = async () => {


    const sourceCode = editorRef.current.getValue();

    const input = [
      {
          "language": "Python",
          "code": "import time\n time.sleep(1)\n print('hello')",
          "testCases": [
              {
                  "input": "",
                  "output": "hello\n"
              }
          ],
          "timeout": 2
      },
      {
          "language": "Bash",
          "code": "echo hello",
          "testCases": [
              {
                  "input": "",
                  "output": "hello\n"
              }
          ],
          "timeout": 2
      }
  ];


    if (!sourceCode) return;
    try {
      setIsLoading(true);
      
      const { run: result } = await executeCode(language, sourceCode,isQuestion,input);
      
      setOutput(result.output.split("\n"));
      if(isQuestion){
        const {response} = await executeCode(language,sourceCode,!isQuestion,input);
        setIsSuccess(true);
      }
      result.stderr ? setIsError(true) : setIsError(false);
  
    } catch (error) {
      console.log(error);
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
        onClick={runCode}
      >
        Run Code
      </Button>
      &nbsp;
      <Button
        variant="outline"
        colorScheme="White"
        mb={4}
        onClick={()=>navigate('/')}
      >
        GoBack
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
      </Box>
      {isQuestion &&
      <Box>
      
        <TestCases testCases={question.question.testCases} 
        isLoading={isLoading} 
        isSuccess={isSuccess}
        />
      </Box>}
  
    </Box>
  );
};
export default Output;
