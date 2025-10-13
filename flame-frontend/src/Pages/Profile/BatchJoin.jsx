import React, { useState } from 'react';
import {
  Box,
  Heading,
  Input,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { fetchJoinedBatches, joinBatch } from "../../actions/batchActions";

const BatchJoin = ({ onJoinBatch, user: propUser }) => {
  const [batchCode, setBatchCode] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const reduxUser = useSelector((s) => s.auth.user);
  const user = propUser || reduxUser;

  const handleJoin = async () => {
    if (!batchCode)
      return toast({ title: "Enter a batch code", status: "warning" });
    try {
      const studentId = user?.id || user?._id;
      const response = await axios.get(
        `${BACKEND_URL}/api/batches/check/${batchCode}`
      );
      const data = response.data;

      if (data.exists) {
        await dispatch(joinBatch(batchCode, studentId));
        await dispatch(fetchJoinedBatches(studentId));
        toast({ title: "Joined batch", status: "success" });
      } else {
        toast({ title: "Invalid batch code", status: "error" });
      }
    } catch (error) {
      console.error("Error checking batch code:", error);
      toast({ title: "An error occurred", status: "error" });
    }
  };

  return (
    <Box>
      <Heading size="sm" mb={2}>
        Join a Batch
      </Heading>
      <VStack align="start">
        <Input
          placeholder="Batch Code"
          value={batchCode}
          onChange={(e) => setBatchCode(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleJoin}>
          Join
        </Button>
      </VStack>
    </Box>
  );
};

export default BatchJoin;
