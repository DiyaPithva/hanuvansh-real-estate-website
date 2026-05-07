/**
 * LoginForm.jsx — Reusable email/password form for admin login.
 *
 * Props:
 *  - email        {string}   controlled email value
 *  - password     {string}   controlled password value
 *  - onEmailChange    {fn}   handler for email input change
 *  - onPasswordChange {fn}   handler for password input change
 *  - onSubmit         {fn}   form submit handler
 *  - loading      {boolean}  disables inputs and button while true
 *  - error        {string|null} error message to display below form
 *
 * Requirements: 15.1, 15.2, 15.3
 */

import React from 'react';
import { motion } from 'framer-motion';

const inputVariants = {
  initial: { opacity: 0, x: -20 },
  animate: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, delay: i * 0.1, ease: 'easeOut' },
  }),
};

export default function LoginForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  loading,
  error,
}) {
  return (
    <form onSubmit={onSubmit} noValidate aria-label="Admin login form">
      {/* Email field */}
      <motion.div
        className="mb-5"
        variants={inputVariants}
        initial="initial"
        animate="animate"
        custom={0}
      >
        <label
          htmlFor="admin-email"
          className="block text-sm font-medium mb-2"
          style={{ color: '#9CA3AF' }}
        >
          Email Address
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={onEmailChange}
          disabled={loading}
          placeholder="admin@hanuvansh.com"
          className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none transition-all duration-200 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: '#1a1a1a',
            border: '1px solid rgba(212,175,55,0.2)',
            '--tw-ring-color': '#D4AF37',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(212,175,55,0.6)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(212,175,55,0.2)';
          }}
        />
      </motion.div>

      {/* Password field */}
      <motion.div
        className="mb-6"
        variants={inputVariants}
        initial="initial"
        animate="animate"
        custom={1}
      >
        <label
          htmlFor="admin-password"
          className="block text-sm font-medium mb-2"
          style={{ color: '#9CA3AF' }}
        >
          Password
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={onPasswordChange}
          disabled={loading}
          placeholder="••••••••"
          className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-600 outline-none transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: '#1a1a1a',
            border: '1px solid rgba(212,175,55,0.2)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'rgba(212,175,55,0.6)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(212,175,55,0.2)';
          }}
        />
      </motion.div>

      {/* Error message — shown on HTTP 401 / rejected thunk */}
      {error && (
        <motion.p
          role="alert"
          className="mb-5 text-sm text-center px-3 py-2 rounded-md"
          style={{
            color: '#FF6B00',
            background: 'rgba(255,107,0,0.08)',
            border: '1px solid rgba(255,107,0,0.25)',
          }}
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {error}
        </motion.p>
      )}

      {/* Submit button */}
      <motion.button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg font-semibold text-white tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: loading
            ? 'rgba(255,107,0,0.5)'
            : 'linear-gradient(135deg, #FF6B00 0%, #FF8C00 100%)',
          boxShadow: loading ? 'none' : '0 4px 20px rgba(255,107,0,0.35)',
        }}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
        variants={inputVariants}
        initial="initial"
        animate="animate"
        custom={2}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            Signing in…
          </span>
        ) : (
          'Sign In'
        )}
      </motion.button>
    </form>
  );
}
