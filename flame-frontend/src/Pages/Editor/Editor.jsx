import { Box, Button, HStack } from "@chakra-ui/react";
import CodeEditor from "./components/CodeEditor";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Editor() {
  const navigate = useNavigate();
  const question = useSelector((state) => state.questions.selectedQuestion);
  const user = useSelector((state) => state.auth.user);
  let userId = "";
  let userName = "";
  if (user != undefined) {
    userId = user.id || user._id || "";
    userName = user.name || "";
  }
  // console.log(user.name);
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <HStack mb={4}>
        <Button onClick={() => navigate("/community")} variant="ghost">
          Back to Questions
        </Button>
      </HStack>
      <CodeEditor question={question} userId={userId} name={userName} />
    </Box>
  );
}

export default Editor;
