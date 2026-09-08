import React from 'react';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    rotateY: -8,
    scale: 0.96,
    z: -50
  },
  animate: {
    opacity: 1,
    rotateY: 0,
    scale: 1,
    z: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
  exit: {
    opacity: 0,
    rotateY: 8,
    scale: 0.96,
    z: -50,
    transition: {
      duration: 0.35,
      ease: 'easeIn'
    }
  }
};

export default function PageTransition({ children }) {
  return (
    <div className="perspective-1000 w-full overflow-x-hidden">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full preserve-3d"
      >
        {children}
      </motion.div>
    </div>
  );
}
