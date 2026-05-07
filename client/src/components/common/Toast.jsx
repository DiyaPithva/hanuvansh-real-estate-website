/**
 * Toast — success/error notification overlay.
 * Reads `toastMessage` and `toastType` from Redux `uiSlice`.
 * Dispatches `clearToast` after 3 seconds.
 * Positioned fixed bottom-right.
 *
 * Requirements: 18.4
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { clearToast } from '../../store/uiSlice';

const toastVariants = {
  initial: { opacity: 0, x: 60, scale: 0.95 },
  animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit:    { opacity: 0, x: 60, scale: 0.95, transition: { duration: 0.25 } },
};

export default function Toast() {
  const dispatch      = useDispatch();
  const toastMessage  = useSelector((state) => state.ui.toastMessage);
  const toastType     = useSelector((state) => state.ui.toastType);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => dispatch(clearToast()), 3000);
    return () => clearTimeout(timer);
  }, [toastMessage, dispatch]);

  const isSuccess = toastType === 'success';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            key={toastMessage}
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            role="alert"
            style={{
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.875rem 1.25rem',
              borderRadius: '0.5rem',
              minWidth: '260px',
              maxWidth: '380px',
              background: isSuccess
                ? 'rgba(22, 101, 52, 0.95)'
                : 'rgba(127, 29, 29, 0.95)',
              border: `1px solid ${isSuccess ? 'rgba(74, 222, 128, 0.3)' : 'rgba(248, 113, 113, 0.3)'}`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              color: '#FFFFFF',
            }}
          >
            {/* Icon */}
            <span
              style={{
                flexShrink: 0,
                width: '1.25rem',
                height: '1.25rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isSuccess ? '#16a34a' : '#dc2626',
                fontSize: '0.75rem',
                fontWeight: 'bold',
              }}
              aria-hidden="true"
            >
              {isSuccess ? '✓' : '✕'}
            </span>

            {/* Message */}
            <p className="text-sm font-body" style={{ margin: 0, lineHeight: 1.4 }}>
              {toastMessage}
            </p>

            {/* Dismiss button */}
            <button
              onClick={() => dispatch(clearToast())}
              style={{
                marginLeft: 'auto',
                flexShrink: 0,
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                fontSize: '1rem',
                lineHeight: 1,
                padding: '0 0.25rem',
              }}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
