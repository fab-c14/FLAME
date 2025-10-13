import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import useUserRole from "../../hooks/useUserRole";
import ShowBatches from "./ShowBatches.jsx";
import UserStatsChart from "./UserStatsChart.jsx";
import BatchManager from "./BatchManager.jsx";
import BatchJoin from "./BatchJoin.jsx";
import { fetchJoinedBatches } from "../../actions/batchActions";

const Profile = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Use centralized role hook
  const { user, role, isStudent, isTeacher } = useUserRole();

  // Defensive defaults when user is not yet loaded
  const safeUser = user || {
    name: "Guest",
    email: "",
    joined: null,
    stats: {},
  };

  useEffect(() => {
    if (user && isStudent) {
      dispatch(fetchJoinedBatches(user.id || user._id));
    }
  }, [dispatch, user, isStudent]);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.clear();
    navigate("/");
  };
  const panelBg = useColorModeValue("gray.50", "gray.800");

  return (
    <Box p={6}>
      <Grid templateColumns={{ base: "1fr", md: "350px 1fr" }} gap={6}>
        <GridItem>
          <Box bg={panelBg} p={4} borderRadius="md" shadow="sm">
            <Heading size="md">{safeUser.name}</Heading>
            <Text color="muted">{safeUser.email}</Text>
            <Text mt={2}>
              <strong>Joined:</strong>{" "}
              {safeUser.joined
                ? new Date(safeUser.joined).toLocaleDateString()
                : ""}
            </Text>
            <Button
              mt={4}
              colorScheme="red"
              onClick={handleLogout}
              leftIcon={<FiLogOut />}
            >
              Logout
            </Button>
          </Box>

          <Box mt={4}>
            {!isStudent ? (
              <BatchManager
                setSelectedStudent={setSelectedStudent}
                createdBy={safeUser.name}
              />
            ) : (
              <BatchJoin user={safeUser} />
            )}
          </Box>
        </GridItem>

        <GridItem>
          {isStudent && (
            <Box bg={panelBg} p={4} borderRadius="md" shadow="sm">
              <Heading size="sm">{safeUser.name} Statistics</Heading>
              <VStack align="start" mt={3}>
                <Text>
                  <strong>Total Codes Run:</strong>{" "}
                  {safeUser.stats?.totalRuns || 0}
                </Text>
                <Text>
                  <strong>Successful Runs:</strong>{" "}
                  {safeUser.stats?.successfulRuns || 0}
                </Text>
                <Text>
                  <strong>Failed Runs:</strong>{" "}
                  {safeUser.stats?.failedRuns || 0}
                </Text>
                <Text>
                  <strong>Last Active:</strong>{" "}
                  {safeUser.stats?.lastActive
                    ? new Date(safeUser.stats.lastActive).toLocaleString()
                    : "N/A"}
                </Text>
              </VStack>
            </Box>
          )}

          {!isStudent ? (
            <UserStatsChart selectedStudent={selectedStudent} />
          ) : (
            <ShowBatches />
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Profile;
