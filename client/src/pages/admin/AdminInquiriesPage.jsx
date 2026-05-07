/**
 * AdminInquiriesPage.jsx — Admin page for managing all inquiries.
 *
 * Features:
 *  - Table listing all inquiries with columns: name, email, phone,
 *    message (truncated), propertyId (if present), status, createdAt
 *  - Status dropdown per row that dispatches updateInquiryStatus thunk on change
 *  - Delete button per row that dispatches deleteInquiry thunk
 *
 * Requirements: 16.6, 16.7
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import {
  fetchInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../../store/inquiriesSlice.js';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const STATUS_OPTIONS = ['New', 'Contacted', 'Closed'];

// ---------------------------------------------------------------------------
// Status badge helper
// ---------------------------------------------------------------------------
function StatusBadge({ status }) {
  const colorMap = {
    New:       { bg: 'rgba(99,102,241,0.15)',  text: '#818cf8', border: 'rgba(99,102,241,0.3)'  },
    Contacted: { bg: 'rgba(234,179,8,0.15)',   text: '#eab308', border: 'rgba(234,179,8,0.3)'   },
    Closed:    { bg: 'rgba(34,197,94,0.15)',   text: '#22c55e', border: 'rgba(34,197,94,0.3)'   },
  };
  const colors = colorMap[status] ?? {
    bg: 'rgba(156,163,175,0.15)',
    text: '#9CA3AF',
    border: 'rgba(156,163,175,0.3)',
  };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: '999px',
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        background: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      {status ?? '—'}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Column header style
// ---------------------------------------------------------------------------
const thStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: '#9CA3AF',
  borderBottom: '1px solid rgba(212,175,55,0.12)',
  whiteSpace: 'nowrap',
};

// ---------------------------------------------------------------------------
// Date formatter
// ---------------------------------------------------------------------------
function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return '—';
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

// ---------------------------------------------------------------------------
// AdminInquiriesPage
// ---------------------------------------------------------------------------
export default function AdminInquiriesPage() {
  const dispatch = useDispatch();

  const inquiries = useSelector((state) => state.inquiries.items);
  const loading   = useSelector((state) => state.inquiries.loading);
  const error     = useSelector((state) => state.inquiries.error);

  // Fetch all inquiries on mount
  useEffect(() => {
    dispatch(fetchInquiries());
  }, [dispatch]);

  // Handle status change from dropdown
  const handleStatusChange = (id, newStatus) => {
    dispatch(updateInquiryStatus({ id, status: newStatus }));
  };

  // Handle delete
  const handleDelete = (id) => {
    dispatch(deleteInquiry(id));
  };

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
        style={{ marginBottom: '32px' }}
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
          Inquiries
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginTop: '6px' }}>
          Manage all incoming inquiries
        </p>
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
            padding: '80px 0',
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
          Loading inquiries…
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
          Inquiries table
      ---------------------------------------------------------------- */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
          style={{
            background: '#1a1a1a',
            border: '1px solid rgba(212,175,55,0.12)',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {inquiries.length === 0 ? (
            <div
              style={{
                padding: '60px 24px',
                textAlign: 'center',
                color: '#9CA3AF',
                fontSize: '0.9rem',
              }}
            >
              No inquiries found.
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.875rem',
                }}
              >
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <th style={thStyle}>Name</th>
                    <th style={thStyle}>Email</th>
                    <th style={thStyle}>Phone</th>
                    <th style={thStyle}>Message</th>
                    <th style={thStyle}>Property ID</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Received</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.map((inquiry, index) => (
                    <motion.tr
                      key={inquiry._id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.04 }}
                      style={{
                        borderBottom: '1px solid rgba(255,255,255,0.05)',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      {/* Name */}
                      <td
                        style={{
                          padding: '14px 16px',
                          color: '#FFFFFF',
                          fontWeight: 500,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {inquiry.name ?? '—'}
                      </td>

                      {/* Email */}
                      <td
                        style={{
                          padding: '14px 16px',
                          color: '#9CA3AF',
                          maxWidth: '180px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={inquiry.email}
                      >
                        {inquiry.email ?? '—'}
                      </td>

                      {/* Phone */}
                      <td
                        style={{
                          padding: '14px 16px',
                          color: '#9CA3AF',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {inquiry.phone ?? '—'}
                      </td>

                      {/* Message (truncated) */}
                      <td
                        style={{
                          padding: '14px 16px',
                          color: '#9CA3AF',
                          maxWidth: '220px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={inquiry.message}
                      >
                        {inquiry.message
                          ? inquiry.message.length > 60
                            ? `${inquiry.message.slice(0, 60)}…`
                            : inquiry.message
                          : '—'}
                      </td>

                      {/* Property ID */}
                      <td
                        style={{
                          padding: '14px 16px',
                          color: '#D4AF37',
                          fontSize: '0.78rem',
                          fontFamily: 'monospace',
                          maxWidth: '120px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={inquiry.propertyId ?? undefined}
                      >
                        {inquiry.propertyId
                          ? String(inquiry.propertyId).slice(-8)
                          : <span style={{ color: '#4B5563' }}>—</span>}
                      </td>

                      {/* Status dropdown */}
                      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                        <select
                          value={inquiry.status ?? 'New'}
                          onChange={(e) =>
                            handleStatusChange(inquiry._id, e.target.value)
                          }
                          aria-label={`Status for inquiry from ${inquiry.name}`}
                          style={{
                            background: '#111111',
                            color: '#FFFFFF',
                            border: '1px solid rgba(212,175,55,0.25)',
                            borderRadius: '6px',
                            padding: '5px 10px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            outline: 'none',
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            backgroundImage:
                              'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'10\' height=\'6\' viewBox=\'0 0 10 6\'%3E%3Cpath d=\'M0 0l5 6 5-6z\' fill=\'%239CA3AF\'/%3E%3C/svg%3E")',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 8px center',
                            paddingRight: '26px',
                          }}
                        >
                          {STATUS_OPTIONS.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Created At */}
                      <td
                        style={{
                          padding: '14px 16px',
                          color: '#9CA3AF',
                          whiteSpace: 'nowrap',
                          fontSize: '0.8rem',
                        }}
                      >
                        {formatDate(inquiry.createdAt)}
                      </td>

                      {/* Actions */}
                      <td
                        style={{
                          padding: '14px 16px',
                          textAlign: 'right',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <button
                          onClick={() => handleDelete(inquiry._id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '6px 14px',
                            borderRadius: '6px',
                            background: 'rgba(239,68,68,0.1)',
                            color: '#ef4444',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            border: '1px solid rgba(239,68,68,0.25)',
                            cursor: 'pointer',
                            transition: 'background 0.15s ease, border-color 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
                            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.5)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
                            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.25)';
                          }}
                          aria-label={`Delete inquiry from ${inquiry.name}`}
                        >
                          🗑️ Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
