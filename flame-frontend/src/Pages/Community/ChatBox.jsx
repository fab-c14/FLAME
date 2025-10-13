import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useUserRole from "../../hooks/useUserRole";
import {
  Box,
  VStack,
  HStack,
  Input,
  Button,
  Heading,
  Text,
  Divider,
  Stack,
  Badge,
  IconButton,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPaperPlane, FaTrash, FaEdit } from "react-icons/fa";
import {
  createQuestion,
  fetchQuestions,
  deleteQuestion,
  selectQuestion,
} from "../../actions/questionActions";
import { Link, useNavigate } from "react-router-dom";

const ChatBox = () => {
  const [title, setTitle] = useState("");
  const [testCases, setTestCases] = useState([
    { input: "", expectedOutput: "" },
  ]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { questions, loading, error } = useSelector((state) => state.questions);
  const { user, role, isStudent, isTeacher } = useUserRole();

  const sectionBg = useColorModeValue("gray.50", "gray.800");
  const cardBg = useColorModeValue("white", "gray.700");

  useEffect(() => {
    const selectedBatch = JSON.parse(localStorage.getItem("selectedBatch"));
    if (selectedBatch?._id) dispatch(fetchQuestions(selectedBatch._id));
  }, [dispatch]);

  const handlePostQuestion = () => {
    if (
      title.trim() === "" ||
      testCases.some((tc) => tc.input === "" || tc.expectedOutput === "")
    ) {
      toast({ title: "Please fill all fields", status: "warning" });
      return;
    }
    const selectedBatch = JSON.parse(localStorage.getItem("selectedBatch"));
    const newQuestion = {
      title,
      testCases,
      createdBy: user?.name,
      batchId: selectedBatch._id,
    };
    dispatch(createQuestion(newQuestion, user, selectedBatch._id));
    setTitle("");
    setTestCases([{ input: "", expectedOutput: "" }]);
    toast({ title: "Question posted", status: "success" });
  };

  const handleDelete = (id) => {
    if (!isTeacher) {
      toast({
        title: "Unauthorized",
        description: "You cannot delete questions.",
        status: "error",
      });
      return;
    }
    if (!confirm("Delete this question?")) return;
    dispatch(deleteQuestion(id));
    toast({ title: "Question deleted", status: "info" });
  };

  const handleAddTestCase = () =>
    setTestCases([...testCases, { input: "", expectedOutput: "" }]);

  const handleTestCaseChange = (i, field, v) => {
    const copy = [...testCases];
    copy[i][field] = v;
    setTestCases(copy);
  };

  return (
    <Box bg={sectionBg} p={6} borderRadius="md" shadow="sm">
      <VStack align="stretch" spacing={4}>
        <Heading size="md">Batch Questions</Heading>

        <Stack spacing={3}>
          {questions.map((q) => (
            <Box key={q._id} p={3} bg={cardBg} borderRadius="md" shadow="xs">
              <HStack justify="space-between" align="start">
                <Box>
                  <Heading size="sm">{q.title}</Heading>
                  <Text fontSize="sm">
                    Posted by <Badge ml={2}>{q.createdBy}</Badge>
                  </Text>
                  <VStack align="start" mt={2} spacing={2}>
                    {q.testCases?.map((tc, idx) => (
                      <Box key={idx}>
                        <Text fontSize="sm" fontWeight="bold">
                          Test Case {idx + 1}
                        </Text>
                        <Text fontSize="sm">
                          Input: {idx === 0 ? tc.input : "*****"}
                        </Text>
                        <Text fontSize="sm">
                          Expected: {idx === 0 ? tc.expectedOutput : "*****"}
                        </Text>
                      </Box>
                    ))}
                  </VStack>
                </Box>

                <VStack>
                  {isStudent && (
                    <Button
                      colorScheme="blue"
                      onClick={() => {
                        dispatch(selectQuestion(q));
                        navigate("/editor");
                      }}
                      leftIcon={<FaPaperPlane />}
                    >
                      Solve
                    </Button>
                  )}
                  {isTeacher && (
                    <IconButton
                      aria-label="delete"
                      colorScheme="red"
                      icon={<FaTrash />}
                      onClick={() => handleDelete(q._id)}
                    />
                  )}
                </VStack>
              </HStack>
            </Box>
          ))}
        </Stack>

        {isTeacher && (
          <Box bg="white" p={4} borderRadius="md">
            <VStack align="stretch">
              <Input
                placeholder="Question title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {testCases.map((tc, i) => (
                <HStack key={i} spacing={2}>
                  <Input
                    placeholder="Input"
                    value={tc.input}
                    onChange={(e) =>
                      handleTestCaseChange(i, "input", e.target.value)
                    }
                  />
                  <Input
                    placeholder="Expected Output"
                    value={tc.expectedOutput}
                    onChange={(e) =>
                      handleTestCaseChange(i, "expectedOutput", e.target.value)
                    }
                  />
                </HStack>
              ))}
              <HStack>
                <Button variant="ghost" onClick={handleAddTestCase}>
                  Add Test Case
                </Button>
                <Button
                  colorScheme="teal"
                  onClick={handlePostQuestion}
                  leftIcon={<FaPaperPlane />}
                >
                  Post Question
                </Button>
              </HStack>
            </VStack>
          </Box>
        )}

        {loading && <Text>Loading...</Text>}
        {error && <Text color="red.500">Error: {error}</Text>}
      </VStack>
    </Box>
  );
};

export default ChatBox;
