/**
 * AdminLoginPage.jsx — Admin authentication page for HANUVANSH ESTATE CONSULTANT.
 *
 * Behaviour:
 *  - Renders LoginForm with email + password inputs
 *  - On submit dispatches `loginAdmin` thunk from authSlice
 *  - On success (isAuthenticated becomes true) redirects to /admin/dashboard
 *  - On HTTP 401 / rejected thunk, displays the error message from Redux state
 *  - Shows a loading spinner inside the submit button while the request is in flight
 *  - If the user is already authenticated, immediately redirects to /admin/dashboard
 *
 * Requirements: 15.1, 15.2, 15.3
 */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { loginAdmin } from '../../store/authSlice.js';
import LoginForm from '../../components/forms/LoginForm.jsx';

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const containerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const cardVariants = {
  initial: { opacity: 0, y: 40, scale: 0.97 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 },
  },
};

const logoVariants = {
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
  },
};

// ---------------------------------------------------------------------------
// AdminLoginPage
// ---------------------------------------------------------------------------
export default function AdminLoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Redirect immediately if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(loginAdmin({ email, password }));
    if (loginAdmin.fulfilled.match(result)) {
      navigate('/admin/dashboard', { replace: true });
    }
    // On rejection, Redux state.auth.error is set — LoginForm renders it automatically
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: '#0a0a0a' }}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {/* Subtle radial glow behind the card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          style={{
            position: 'absolute',
            top: '30%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <motion.div
        className="relative w-full max-w-md"
        variants={cardVariants}
        initial="initial"
        animate="animate"
      >
        {/* Card */}
        <div
          className="rounded-2xl px-8 py-10"
          style={{
            background: '#111111',
            border: '1px solid rgba(212,175,55,0.15)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
          }}
        >
          {/* Branding */}
          <motion.div
            className="text-center mb-8"
            variants={logoVariants}
            initial="initial"
            animate="animate"
          >
            {/* Gold divider accent */}
            <div
              className="mx-auto mb-4"
              style={{
                width: '48px',
                height: '3px',
                background: 'linear-gradient(90deg, #D4AF37, #FFD700)',
                borderRadius: '2px',
              }}
            />

            <h1
              className="text-2xl font-bold tracking-wide mb-1"
              style={{
                fontFamily: '"Playfair Display", serif',
                color: '#D4AF37',
                letterSpacing: '0.04em',
              }}
            >
              HANUVANSH
            </h1>
            <p
              className="text-xs tracking-widest uppercase mb-4"
              style={{ color: '#9CA3AF', letterSpacing: '0.18em' }}
            >
              Estate Consultant
            </p>

            <h2
              className="text-lg font-semibold"
              style={{ color: '#FFFFFF' }}
            >
              Admin Portal
            </h2>
            <p className="text-sm mt-1" style={{ color: '#9CA3AF' }}>
              Sign in to manage your estate listings
            </p>
          </motion.div>

          {/* Login form */}
          <LoginForm
            email={email}
            password={password}
            onEmailChange={(e) => setEmail(e.target.value)}
            onPasswordChange={(e) => setPassword(e.target.value)}
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
          />
        </div>

        {/* Footer note */}
        <p
          className="text-center text-xs mt-6"
          style={{ color: 'rgba(156,163,175,0.5)' }}
        >
          © {new Date().getFullYear()} Hanuvansh Estate Consultant. All rights reserved.
        </p>
      </motion.div>
    </motion.div>
  );
}
