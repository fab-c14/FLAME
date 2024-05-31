import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
function Editor() {
  return (
    <ChakraProvider theme={theme}>
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <CodeEditor />
    </Box>
  </ChakraProvider>
  );
}

export default Editor;