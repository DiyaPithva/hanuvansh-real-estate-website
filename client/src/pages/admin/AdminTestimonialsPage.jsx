/**
 * AdminTestimonialsPage.jsx — Admin page for managing testimonials.
 *
 * Features:
 *  - Form to add a new testimonial (clientName, clientTitle, message,
 *    rating 1–5, avatar optional URL)
 *  - On submit, dispatches createTestimonial thunk
 *  - Card list of existing testimonials with star rating display
 *  - Delete button per card dispatches deleteTestimonial thunk
 *
 * Requirements: 16.8
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import {
  fetchTestimonials,
  createTestimonial,
  deleteTestimonial,
} from '../../store/testimonialsSlice.js';

// ---------------------------------------------------------------------------
// Star rating display
// ---------------------------------------------------------------------------
function StarRating({ rating }) {
  const stars = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            fontSize: '0.9rem',
            color: i < stars ? '#D4AF37' : 'rgba(212,175,55,0.2)',
          }}
        >
          ★
        </span>
      ))}
      <span
        style={{
          fontSize: '0.72rem',
          color: '#9CA3AF',
          marginLeft: '4px',
        }}
      >
        {stars}/5
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Interactive star picker for the form
// ---------------------------------------------------------------------------
function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '6px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '2px',
            fontSize: '1.5rem',
            color:
              star <= (hovered || value)
                ? '#D4AF37'
                : 'rgba(212,175,55,0.2)',
            transition: 'color 0.15s ease',
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared input style
// ---------------------------------------------------------------------------
const inputStyle = {
  width: '100%',
  background: '#111111',
  border: '1px solid rgba(212,175,55,0.2)',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#FFFFFF',
  fontSize: '0.875rem',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 600,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#9CA3AF',
  marginBottom: '6px',
};

// ---------------------------------------------------------------------------
// Initial form state
// ---------------------------------------------------------------------------
const INITIAL_FORM = {
  clientName: '',
  clientTitle: '',
  message: '',
  rating: 5,
  avatar: '',
};

// ---------------------------------------------------------------------------
// AdminTestimonialsPage
// ---------------------------------------------------------------------------
export default function AdminTestimonialsPage() {
  const dispatch = useDispatch();

  const testimonials = useSelector((state) => state.testimonials.items);
  const loading      = useSelector((state) => state.testimonials.loading);
  const error        = useSelector((state) => state.testimonials.error);

  const [form, setForm]         = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError]   = useState('');

  // Fetch testimonials on mount
  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  // ---------------------------------------------------------------------------
  // Form handlers
  // ---------------------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (star) => {
    setForm((prev) => ({ ...prev, rating: star }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!form.clientName.trim()) {
      setFormError('Client name is required.');
      return;
    }
    if (!form.message.trim()) {
      setFormError('Message is required.');
      return;
    }

    setSubmitting(true);
    const payload = {
      clientName:  form.clientName.trim(),
      clientTitle: form.clientTitle.trim(),
      message:     form.message.trim(),
      rating:      Number(form.rating),
      ...(form.avatar.trim() ? { avatar: form.avatar.trim() } : {}),
    };

    const result = await dispatch(createTestimonial(payload));
    setSubmitting(false);

    if (!result.error) {
      setForm(INITIAL_FORM);
    } else {
      setFormError(result.payload || 'Failed to create testimonial.');
    }
  };

  // ---------------------------------------------------------------------------
  // Delete handler
  // ---------------------------------------------------------------------------
  const handleDelete = (id) => {
    dispatch(deleteTestimonial(id));
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------
  return (
    <div
      style={{
        padding: '40px 36px',
        minHeight: '100vh',
        background: '#0a0a0a',
      }}
    >
      {/* ----------------------------------------------------------------
          Page header
      ---------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        style={{ marginBottom: '36px' }}
      >
        <div
          aria-hidden="true"
          style={{
            width: '40px',
            height: '3px',
            background: 'linear-gradient(90deg, #D4AF37, #FFD700)',
            borderRadius: '2px',
            marginBottom: '12px',
          }}
        />
        <h1
          className="font-heading"
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            color: '#FFFFFF',
            margin: 0,
            letterSpacing: '0.02em',
          }}
        >
          Testimonials
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginTop: '6px' }}>
          Add and manage client testimonials
        </p>
      </motion.div>

      {/* ----------------------------------------------------------------
          Add testimonial form
      ---------------------------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          background: '#1a1a1a',
          border: '1px solid rgba(212,175,55,0.15)',
          borderRadius: '12px',
          padding: '28px 32px',
          marginBottom: '40px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        <h2
          className="font-heading"
          style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#D4AF37',
            marginBottom: '24px',
            letterSpacing: '0.04em',
          }}
        >
          Add New Testimonial
        </h2>

        <form onSubmit={handleSubmit} noValidate>
          {/* Row 1: clientName + clientTitle */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '20px',
            }}
          >
            <div>
              <label htmlFor="clientName" style={labelStyle}>
                Client Name <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                id="clientName"
                name="clientName"
                type="text"
                value={form.clientName}
                onChange={handleChange}
                placeholder="e.g. Rajesh Sharma"
                required
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(212,175,55,0.6)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(212,175,55,0.2)';
                }}
              />
            </div>

            <div>
              <label htmlFor="clientTitle" style={labelStyle}>
                Client Title
              </label>
              <input
                id="clientTitle"
                name="clientTitle"
                type="text"
                value={form.clientTitle}
                onChange={handleChange}
                placeholder="e.g. Business Owner"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(212,175,55,0.6)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(212,175,55,0.2)';
                }}
              />
            </div>
          </div>

          {/* Row 2: message */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="message" style={labelStyle}>
              Message <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write the client's testimonial…"
              required
              rows={4}
              style={{
                ...inputStyle,
                resize: 'vertical',
                lineHeight: '1.6',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'rgba(212,175,55,0.6)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(212,175,55,0.2)';
              }}
            />
          </div>

          {/* Row 3: rating + avatar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '20px',
              marginBottom: '24px',
            }}
          >
            <div>
              <label style={labelStyle}>Rating</label>
              <StarPicker
                value={form.rating}
                onChange={handleRatingChange}
              />
            </div>

            <div>
              <label htmlFor="avatar" style={labelStyle}>
                Avatar URL (optional)
              </label>
              <input
                id="avatar"
                name="avatar"
                type="url"
                value={form.avatar}
                onChange={handleChange}
                placeholder="https://example.com/photo.jpg"
                style={inputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = 'rgba(212,175,55,0.6)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(212,175,55,0.2)';
                }}
              />
            </div>
          </div>

          {/* Form error */}
          {formError && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: '6px',
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.3)',
                color: '#ef4444',
                fontSize: '0.8rem',
                marginBottom: '16px',
              }}
            >
              {formError}
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 28px',
              borderRadius: '8px',
              background: submitting
                ? 'rgba(212,175,55,0.3)'
                : 'linear-gradient(135deg, #D4AF37, #FFD700)',
              color: '#0a0a0a',
              fontSize: '0.875rem',
              fontWeight: 700,
              border: 'none',
              cursor: submitting ? 'not-allowed' : 'pointer',
              letterSpacing: '0.04em',
              transition: 'opacity 0.2s ease',
              opacity: submitting ? 0.7 : 1,
            }}
          >
            {submitting ? 'Adding…' : '+ Add Testimonial'}
          </button>
        </form>
      </motion.div>

      {/* ----------------------------------------------------------------
          Loading state
      ---------------------------------------------------------------- */}
      {loading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '60px 0',
            color: '#9CA3AF',
            fontSize: '0.9rem',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '20px',
              height: '20px',
              border: '2px solid rgba(212,175,55,0.3)',
              borderTopColor: '#D4AF37',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              marginRight: '10px',
            }}
          />
          Loading testimonials…
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      {/* ----------------------------------------------------------------
          Error state
      ---------------------------------------------------------------- */}
      {!loading && error && (
        <div
          style={{
            padding: '20px 24px',
            borderRadius: '8px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: '#ef4444',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </div>
      )}

      {/* ----------------------------------------------------------------
          Testimonials card grid
      ---------------------------------------------------------------- */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <h2
            className="font-heading"
            style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#FFFFFF',
              marginBottom: '20px',
              letterSpacing: '0.04em',
            }}
          >
            Existing Testimonials
            <span
              style={{
                marginLeft: '10px',
                fontSize: '0.8rem',
                color: '#9CA3AF',
                fontWeight: 400,
              }}
            >
              ({testimonials.length})
            </span>
          </h2>

          {testimonials.length === 0 ? (
            <div
              style={{
                padding: '60px 24px',
                textAlign: 'center',
                color: '#9CA3AF',
                fontSize: '0.9rem',
                background: '#1a1a1a',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '12px',
              }}
            >
              No testimonials yet. Add one above.
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
              }}
            >
              <AnimatePresence>
                {testimonials.map((t, index) => (
                  <motion.div
                    key={t._id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    style={{
                      background: '#1a1a1a',
                      border: '1px solid rgba(212,175,55,0.12)',
                      borderRadius: '12px',
                      padding: '24px',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '14px',
                    }}
                  >
                    {/* Avatar + name row */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      {t.avatar ? (
                        <img
                          src={t.avatar}
                          alt={`${t.clientName} avatar`}
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '2px solid rgba(212,175,55,0.3)',
                            flexShrink: 0,
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div
                          aria-hidden="true"
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #D4AF37, #FF6B00)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            color: '#0a0a0a',
                            flexShrink: 0,
                          }}
                        >
                          {t.clientName?.charAt(0)?.toUpperCase() ?? '?'}
                        </div>
                      )}

                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            color: '#FFFFFF',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {t.clientName ?? '—'}
                        </div>
                        {t.clientTitle && (
                          <div
                            style={{
                              fontSize: '0.78rem',
                              color: '#9CA3AF',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {t.clientTitle}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Star rating */}
                    <StarRating rating={t.rating ?? 5} />

                    {/* Message */}
                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#9CA3AF',
                        lineHeight: '1.65',
                        margin: 0,
                        flexGrow: 1,
                      }}
                    >
                      "{t.message}"
                    </p>

                    {/* Divider */}
                    <div
                      aria-hidden="true"
                      style={{
                        height: '1px',
                        background: 'rgba(255,255,255,0.06)',
                      }}
                    />

                    {/* Delete button */}
                    <button
                      onClick={() => handleDelete(t._id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        padding: '7px 16px',
                        borderRadius: '6px',
                        background: 'rgba(239,68,68,0.1)',
                        color: '#ef4444',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        border: '1px solid rgba(239,68,68,0.25)',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease, border-color 0.15s ease',
                        alignSelf: 'flex-start',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
                        e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                        e.currentTarget.style.borderColor = 'rgba(239,68,68,0.25)';
                      }}
                      aria-label={`Delete testimonial from ${t.clientName}`}
                    >
                      🗑️ Delete
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
