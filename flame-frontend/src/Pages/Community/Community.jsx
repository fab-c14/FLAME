// Community.jsx
import React, { useState } from 'react';
import { Container } from '@chakra-ui/react';
import Chatbox from './ChatBox';


const Community = ({ user }) => {
  return (
    <Container maxW="container.xl" className="mt5">
      <Chatbox userType={user.role} user={user} />
    </Container>
  );
};

export default Community;
