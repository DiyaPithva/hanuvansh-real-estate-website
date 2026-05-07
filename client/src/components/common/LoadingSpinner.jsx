/**
 * LoadingSpinner — luxury full-screen loading overlay with animated spinner.
 * Uses accent/gold colors from the design system.
 *
 * Requirements: 17.7
 */

import React from 'react';
import { motion } from 'framer-motion';

const spinTransition = {
  repeat: Infinity,
  ease: 'linear',
  duration: 1.2,
};

export default function LoadingSpinner() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(10, 10, 10, 0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
      role="status"
      aria-label="Loading"
    >
      {/* Outer ring */}
      <div style={{ position: 'relative', width: '64px', height: '64px' }}>
        {/* Static background ring */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid rgba(212, 175, 55, 0.15)',
          }}
        />
        {/* Animated spinner arc */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={spinTransition}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: '#D4AF37',
            borderRightColor: '#FF6B00',
          }}
        />
      </div>

      {/* Brand text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        className="font-heading text-xs tracking-widest mt-5 uppercase"
        style={{ color: '#D4AF37' }}
      >
        HANUVANSH
      </motion.p>
    </div>
  );
}
