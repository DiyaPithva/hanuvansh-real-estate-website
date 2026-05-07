/**
 * DashboardPage.jsx — Admin dashboard overview for HANUVANSH ESTATE CONSULTANT.
 *
 * Displays four analytics cards:
 *  - Total Properties  (from properties.pagination.total)
 *  - Total Inquiries   (from inquiries.items.length)
 *  - New Inquiries     (inquiries with status === 'New')
 *  - Total Testimonials (from testimonials.items.length)
 *
 * Requirements: 16.1
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { fetchProperties } from '../../store/propertiesSlice.js';
import { fetchInquiries } from '../../store/inquiriesSlice.js';
import { fetchTestimonials } from '../../store/testimonialsSlice.js';

// ---------------------------------------------------------------------------
// AnalyticsCard — individual stat card with entrance animation
// ---------------------------------------------------------------------------
/**
 * @param {object} props
 * @param {string}  props.label       — Card title
 * @param {number}  props.value       — Numeric stat to display
 * @param {string}  props.accentColor — CSS color for the top border accent
 * @param {string}  props.icon        — Emoji / icon character
 * @param {number}  props.delay       — Framer Motion stagger delay (seconds)
 */
function AnalyticsCard({ label, value, accentColor, icon, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
      style={{
        background: '#1a1a1a',
        border: '1px solid rgba(212,175,55,0.12)',
        borderTop: `3px solid ${accentColor}`,
        borderRadius: '12px',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
      }}
      whileHover={{
        boxShadow: `0 12px 48px rgba(0,0,0,0.6)`,
        borderColor: 'rgba(212,175,55,0.25)',
      }}
    >
      {/* Icon + label row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span
          style={{
            fontSize: '1.5rem',
            lineHeight: 1,
            filter: 'drop-shadow(0 0 6px rgba(212,175,55,0.3))',
          }}
          aria-hidden="true"
        >
          {icon}
        </span>
        <span
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#9CA3AF',
          }}
        >
          {label}
        </span>
      </div>

      {/* Stat value */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2 }}
        style={{
          fontSize: '2.75rem',
          fontWeight: 700,
          fontFamily: '"Playfair Display", serif',
          color: '#FFFFFF',
          lineHeight: 1,
          margin: 0,
        }}
      >
        {value}
      </motion.p>

      {/* Decorative bottom accent line */}
      <div
        aria-hidden="true"
        style={{
          height: '2px',
          width: '40px',
          borderRadius: '1px',
          background: `linear-gradient(90deg, ${accentColor}, transparent)`,
          marginTop: '4px',
        }}
      />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Card configuration
// ---------------------------------------------------------------------------
const CARD_ACCENT_COLORS = {
  properties:   '#D4AF37',   // gold
  inquiries:    '#FF6B00',   // accent orange
  newInquiries: '#FF8C00',   // accent-light orange
  testimonials: '#6366F1',   // indigo
};

// ---------------------------------------------------------------------------
// DashboardPage
// ---------------------------------------------------------------------------
export default function DashboardPage() {
  const dispatch = useDispatch();

  // Selectors
  const totalProperties = useSelector(
    (state) => state.properties.pagination.total
  );
  const inquiryItems = useSelector((state) => state.inquiries.items);
  const testimonialItems = useSelector((state) => state.testimonials.items);

  // Derived counts
  const totalInquiries = inquiryItems.length;
  const newInquiries = inquiryItems.filter(
    (inq) => inq.status === 'New'
  ).length;
  const totalTestimonials = testimonialItems.length;

  // Fetch all data on mount
  useEffect(() => {
    dispatch(fetchProperties());
    dispatch(fetchInquiries());
    dispatch(fetchTestimonials());
  }, [dispatch]);

  // Analytics card definitions
  const cards = [
    {
      label: 'Total Properties',
      value: totalProperties,
      accentColor: CARD_ACCENT_COLORS.properties,
      icon: '🏠',
      delay: 0,
    },
    {
      label: 'Total Inquiries',
      value: totalInquiries,
      accentColor: CARD_ACCENT_COLORS.inquiries,
      icon: '📩',
      delay: 0.1,
    },
    {
      label: 'New Inquiries',
      value: newInquiries,
      accentColor: CARD_ACCENT_COLORS.newInquiries,
      icon: '🔔',
      delay: 0.2,
    },
    {
      label: 'Total Testimonials',
      value: totalTestimonials,
      accentColor: CARD_ACCENT_COLORS.testimonials,
      icon: '⭐',
      delay: 0.3,
    },
  ];

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
        {/* Gold accent bar */}
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
          Dashboard
        </h1>
        <p
          style={{
            fontSize: '0.875rem',
            color: '#9CA3AF',
            marginTop: '6px',
          }}
        >
          Overview of your estate portfolio and activity
        </p>
      </motion.div>

      {/* ----------------------------------------------------------------
          Analytics cards grid
      ---------------------------------------------------------------- */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '20px',
        }}
      >
        {cards.map((card) => (
          <AnalyticsCard key={card.label} {...card} />
        ))}
      </div>
    </div>
  );
}
