import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import { useLocation, useNavigate } from "react-router";
function Editor() {

  const location = useLocation();
  const {question} = location.state; // no wwe have the question here we
  console.log(question);
  return (
    <ChakraProvider theme={theme}>
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <CodeEditor question={question}/>
    </Box>
  </ChakraProvider>
  );
}

export default Editor;