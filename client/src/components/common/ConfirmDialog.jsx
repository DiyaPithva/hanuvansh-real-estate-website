/**
 * ConfirmDialog — modal confirmation for destructive actions.
 * Glassmorphism modal overlay with Confirm (danger) and Cancel buttons.
 *
 * Props:
 *   isOpen    {boolean}   Whether the dialog is visible
 *   onConfirm {function}  Called when the user confirms
 *   onCancel  {function}  Called when the user cancels or clicks the backdrop
 *   title     {string}    Dialog title (default: "Are you sure?")
 *   message   {string}    Body message describing the action
 *
 * Requirements: 16.5
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

const dialogVariants = {
  hidden:  { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  exit:    { opacity: 0, scale: 0.92, y: 20, transition: { duration: 0.2 } },
};

export default function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
  title   = 'Are you sure?',
  message = 'This action cannot be undone.',
}) {
  // Trap focus / prevent body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') onCancel?.(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="confirm-backdrop"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onCancel}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1000,
              background: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
            aria-hidden="true"
          />

          {/* Dialog */}
          <motion.div
            key="confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-message"
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              pointerEvents: 'none',
            }}
          >
            <div
              className="glass"
              style={{
                pointerEvents: 'auto',
                width: '100%',
                maxWidth: '420px',
                borderRadius: '0.75rem',
                padding: '2rem',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              }}
            >
              {/* Title */}
              <h2
                id="confirm-dialog-title"
                className="font-heading text-xl font-semibold mb-3"
                style={{ color: '#FFFFFF' }}
              >
                {title}
              </h2>

              {/* Message */}
              <p
                id="confirm-dialog-message"
                className="text-sm font-body mb-6"
                style={{ color: '#9CA3AF', lineHeight: 1.6 }}
              >
                {message}
              </p>

              {/* Actions */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={onCancel}
                  className="px-5 py-2 rounded text-sm font-body font-medium transition-colors duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#9CA3AF',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                >
                  Cancel
                </button>
                <button
                  onClick={onConfirm}
                  className="px-5 py-2 rounded text-sm font-body font-medium transition-colors duration-200"
                  style={{
                    background: '#dc2626',
                    color: '#FFFFFF',
                    border: '1px solid rgba(220, 38, 38, 0.5)',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#b91c1c'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#dc2626'; }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
