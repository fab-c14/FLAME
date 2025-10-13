import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  HStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaPlus, FaUser, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createBatch,
  fetchBatches,
  deleteBatch,
} from "../../actions/batchActions";
import useUserRole from "../../hooks/useUserRole";

const BatchManager = ({ setSelectedStudent, createdBy }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [batchName, setBatchName] = useState("");
  const [selectedBatch, setSelectedBatch] = useState(null);
  const dispatch = useDispatch();

  const batchesState = useSelector((state) => state.batches || {});
  const batches = batchesState.batches || [];
  const { user, isStudent, isTeacher } = useUserRole();

  useEffect(() => {
    dispatch(fetchBatches(createdBy));
  }, [dispatch, createdBy]);

  const handleBatchCreation = async () => {
    try {
      await dispatch(createBatch(batchName, createdBy));
      setBatchName("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating batch:", error);
    }
  };

  const handleBatchClick = (batch) => {
    localStorage.setItem("selectedBatch", JSON.stringify(batch));
    setSelectedBatch(batch);
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  const handleDeleteBatch = (id) => {
    if (!isTeacher) {
      alert("You are not authorized to delete batches.");
      return;
    }
    if (!confirm("Delete this batch and all its questions?")) return;
    dispatch(deleteBatch(id));
  };

  const cardBg = useColorModeValue("gray.50", "gray.700");
  const innerBg = useColorModeValue("white", "gray.600");

  return (
    <Box>
      <HStack justify="space-between" mb={3}>
        <Heading size="md">Manage Batches</Heading>
        {isTeacher && (
          <Button
            leftIcon={<FaPlus />}
            colorScheme="green"
            onClick={() => setIsOpen(true)}
          >
            Create Batch
          </Button>
        )}
      </HStack>

      <VStack align="stretch" spacing={2}>
        {batches && batches.length > 0 ? (
          batches.map((batch) => (
            <HStack
              key={batch._id}
              justify="space-between"
              p={3}
              bg={cardBg}
              borderRadius="md"
            >
              <Box onClick={() => handleBatchClick(batch)} cursor="pointer">
                <Text fontWeight="bold">{batch.name}</Text>
                <Text fontSize="sm">{batch._id}</Text>
              </Box>
              <HStack>
                <Link to="/community">
                  <Button onClick={() => handleBatchClick(batch)}>
                    Questions
                  </Button>
                </Link>
                {isTeacher && (
                  <Button
                    colorScheme="red"
                    leftIcon={<FaTrash />}
                    onClick={() => handleDeleteBatch(batch._id)}
                  >
                    Delete
                  </Button>
                )}
              </HStack>
            </HStack>
          ))
        ) : (
          <Text>No batches available.</Text>
        )}
      </VStack>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create a new batch</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Batch name"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleBatchCreation}>
              Create Batch
            </Button>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {selectedBatch && (
        <Box mt={4} p={3} bg={cardBg} borderRadius="md">
          <Heading size="sm">Batch: {selectedBatch.name}</Heading>
          <VStack mt={2} align="stretch">
            {selectedBatch.students?.map((student) => (
              <Button
                key={student._id}
                onClick={() => handleStudentClick(student)}
              >
                {student.name} (ID: {student._id})
              </Button>
            ))}
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default BatchManager;
