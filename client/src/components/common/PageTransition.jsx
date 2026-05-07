/**
 * PageTransition — Framer Motion wrapper for route-level animations.
 * Wraps children in a <motion.div> using `pageVariants` from animations.js.
 * Use AnimatePresence in the parent router for exit animations.
 *
 * Requirements: 8.6, 17.5
 */

import React from 'react';
import { motion } from 'framer-motion';
import { pageVariants } from '../../styles/animations';

/**
 * @param {{ children: React.ReactNode }} props
 */
export default function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}
