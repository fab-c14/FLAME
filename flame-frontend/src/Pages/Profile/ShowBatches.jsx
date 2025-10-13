import React, { useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  IconButton,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBatches, deleteBatch } from "../../actions/batchActions";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import useUserRole from "../../hooks/useUserRole";

const ShowBatches = () => {
  const dispatch = useDispatch();
  const { batches, loading, error, joinedBatches } = useSelector(
    (state) => state.batches || {}
  );
  const { user, isTeacher } = useUserRole();
  const bg = useColorModeValue("gray.50", "gray.800");
  const cardInnerBg = useColorModeValue("white", "gray.700");

  useEffect(() => {
    dispatch(fetchBatches());
  }, [dispatch]);

  const handleBatchClick = (batch) => {
    localStorage.setItem("selectedBatch", JSON.stringify(batch));
  };

  const handleDelete = (batchId) => {
    if (!isTeacher) {
      alert("You are not authorized to delete batches.");
      return;
    }
    if (!confirm("Delete this community/batch and its questions?")) return;
    dispatch(deleteBatch(batchId));
  };

  return (
    <Box p={4} bg={bg} borderRadius="md">
      <Heading size="md" mb={4}>
        Your Joined Batches
      </Heading>
      {loading && <Spinner />}
      {error && <Text color="red.500">Error: {error}</Text>}
      {!loading && joinedBatches && joinedBatches.length > 0 ? (
        <VStack spacing={3} align="stretch">
          {joinedBatches.map((batch) => (
            <HStack
              key={batch._id}
              justify="space-between"
              p={3}
              bg={cardInnerBg}
              borderRadius="md"
              shadow="sm"
            >
              <Box onClick={() => handleBatchClick(batch)} cursor="pointer">
                <Heading size="sm">{batch.name}</Heading>
                <Text fontSize="sm">ID: {batch._id}</Text>
                <Text fontSize="sm">Created By: {batch.createdBy}</Text>
              </Box>
              <HStack>
                <Link to="/community">
                  <Button onClick={() => handleBatchClick(batch)}>
                    Questions
                  </Button>
                </Link>
                {isTeacher && (
                  <IconButton
                    aria-label="delete-batch"
                    colorScheme="red"
                    icon={<FaTrash />}
                    onClick={() => handleDelete(batch._id)}
                  />
                )}
              </HStack>
            </HStack>
          ))}
        </VStack>
      ) : (
        <Text>You haven't joined any batches yet.</Text>
      )}
    </Box>
  );
};

export default ShowBatches;
