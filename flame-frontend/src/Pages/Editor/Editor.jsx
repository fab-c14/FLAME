import { Box } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.js";
import { useLocation, useNavigate } from "react-router";
function Editor() {

  const location = useLocation();
  const question = location.state?.question; // no wwe have the question here we
  console.log(question);
  let userId='';
  let userName='';

  const user = location.state?.user
  if(user!=undefined){

    userId = user.id;
    userName = user.name;
  }
  // console.log(user.name);
  return (
    <ChakraProvider theme={theme}>
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <CodeEditor question={question} userId={userId} name={userName}/>
    </Box>
  </ChakraProvider>
  );
}

export default Editor;