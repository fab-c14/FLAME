import React from 'react';
import { Box, useColorModeValue, Portal } from '@chakra-ui/react';
import headerImg from '../../assets/Header.svg';

// A fixed background that stays on-screen. Keep zIndex low so page content overlays it.
export default function PersistentBackground() {
  const overlay = useColorModeValue('rgba(255,255,255,0.35)','rgba(0,0,0,0.25)');

  return (
    <Portal>
      <Box
        pointerEvents="none"
        position="fixed"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={-1}
        bgImage={`url(${headerImg})`}
        bgRepeat="no-repeat"
        bgSize="cover"
        bgPosition="center"
        _before={{
          content: '""',
          position: 'absolute',
          inset: 0,
          bg: overlay,
          zIndex: -1,
        }}
      />
    </Portal>
  );
}
