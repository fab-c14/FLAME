import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export default function AnimatedPage({ children }) {
  useEffect(() => {
    // scroll to top on page change
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <motion.div
      style={{ position: 'relative' }}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.32, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
