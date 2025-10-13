import React from "react";
import { Box, Container } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ChatBox from "./ChatBox";

const Community = () => {
  const user = useSelector((s) => s.auth.user);

  return (
    <Container maxW="container.lg" py={6}>
      <Box>
        <ChatBox />
      </Box>
    </Container>
  );
};

export default Community;
