/**
 * AdminPropertiesPage.jsx — Admin page for managing all property listings.
 *
 * Features:
 *  - Table listing all properties with columns: name, location, type, price, status, featured
 *  - "Add Property" button linking to /admin/properties/add
 *  - Edit button linking to /admin/properties/edit/:id
 *  - Delete button that shows ConfirmDialog before dispatching deleteProperty thunk
 *
 * Requirements: 16.2, 16.5
 */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { fetchProperties, deleteProperty } from '../../store/propertiesSlice.js';
import ConfirmDialog from '../../components/common/ConfirmDialog.jsx';
import { formatPrice } from '../../utils/formatPrice.js';

// ---------------------------------------------------------------------------
// Status badge helper
// ---------------------------------------------------------------------------
function StatusBadge({ status }) {
  const colorMap = {
    available:   { bg: 'rgba(34,197,94,0.15)',  text: '#22c55e', border: 'rgba(34,197,94,0.3)'  },
    sold:        { bg: 'rgba(239,68,68,0.15)',   text: '#ef4444', border: 'rgba(239,68,68,0.3)'  },
    under_offer: { bg: 'rgba(234,179,8,0.15)',   text: '#eab308', border: 'rgba(234,179,8,0.3)'  },
    rented:      { bg: 'rgba(99,102,241,0.15)',  text: '#6366f1', border: 'rgba(99,102,241,0.3)' },
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
        textTransform: 'capitalize',
        background: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
      }}
    >
      {status?.replace('_', ' ') ?? '—'}
    </span>
  );
}

// ---------------------------------------------------------------------------
// FeaturedBadge helper
// ---------------------------------------------------------------------------
function FeaturedBadge({ featured }) {
  if (!featured) {
    return <span style={{ color: '#4B5563', fontSize: '0.8rem' }}>—</span>;
  }
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 10px',
        borderRadius: '999px',
        fontSize: '0.72rem',
        fontWeight: 600,
        letterSpacing: '0.06em',
        background: 'rgba(212,175,55,0.15)',
        color: '#D4AF37',
        border: '1px solid rgba(212,175,55,0.3)',
      }}
    >
      ★ Featured
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
// AdminPropertiesPage
// ---------------------------------------------------------------------------
export default function AdminPropertiesPage() {
  const dispatch = useDispatch();

  const properties = useSelector((state) => state.properties.items);
  const loading    = useSelector((state) => state.properties.loading);
  const error      = useSelector((state) => state.properties.error);

  // Confirm-dialog state
  const [confirmOpen, setConfirmOpen]       = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Fetch all properties on mount (no filters, page 1)
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  // Open confirm dialog for a given property id
  const handleDeleteClick = (id) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  // Confirmed — dispatch delete thunk
  const handleConfirmDelete = () => {
    if (pendingDeleteId) {
      dispatch(deleteProperty(pendingDeleteId));
    }
    setConfirmOpen(false);
    setPendingDeleteId(null);
  };

  // Cancelled
  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setPendingDeleteId(null);
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
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        {/* Title block */}
        <div>
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
            Properties
          </h1>
          <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginTop: '6px' }}>
            Manage all property listings
          </p>
        </div>

        {/* Add Property button */}
        <Link
          to="/admin/properties/add"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #D4AF37, #FFD700)',
            color: '#0a0a0a',
            fontWeight: 700,
            fontSize: '0.875rem',
            letterSpacing: '0.04em',
            textDecoration: 'none',
            boxShadow: '0 4px 16px rgba(212,175,55,0.3)',
            transition: 'opacity 0.2s ease, box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '0.88';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(212,175,55,0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(212,175,55,0.3)';
          }}
        >
          <span aria-hidden="true" style={{ fontSize: '1rem' }}>+</span>
          Add Property
        </Link>
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
          Loading properties…
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
          Properties table
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
          {properties.length === 0 ? (
            <div
              style={{
                padding: '60px 24px',
                textAlign: 'center',
                color: '#9CA3AF',
                fontSize: '0.9rem',
              }}
            >
              No properties found.{' '}
              <Link
                to="/admin/properties/add"
                style={{ color: '#D4AF37', textDecoration: 'underline' }}
              >
                Add your first property
              </Link>
              .
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
                    <th style={thStyle}>Location</th>
                    <th style={thStyle}>Type</th>
                    <th style={thStyle}>Price</th>
                    <th style={thStyle}>Status</th>
                    <th style={thStyle}>Featured</th>
                    <th style={{ ...thStyle, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((property, index) => (
                    <motion.tr
                      key={property._id}
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
                          maxWidth: '200px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={property.name}
                      >
                        {property.name ?? '—'}
                      </td>

                      {/* Location */}
                      <td
                        style={{
                          padding: '14px 16px',
                          color: '#9CA3AF',
                          maxWidth: '180px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                        title={property.location}
                      >
                        {property.location ?? '—'}
                      </td>

                      {/* Type */}
                      <td
                        style={{
                          padding: '14px 16px',
                          color: '#9CA3AF',
                          textTransform: 'capitalize',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {property.type ?? '—'}
                      </td>

                      {/* Price */}
                      <td
                        style={{
                          padding: '14px 16px',
                          color: '#D4AF37',
                          fontWeight: 600,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {property.price != null ? formatPrice(property.price) : '—'}
                      </td>

                      {/* Status */}
                      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                        <StatusBadge status={property.status} />
                      </td>

                      {/* Featured */}
                      <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                        <FeaturedBadge featured={property.featured} />
                      </td>

                      {/* Actions */}
                      <td
                        style={{
                          padding: '14px 16px',
                          textAlign: 'right',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {/* Edit button */}
                        <Link
                          to={`/admin/properties/edit/${property._id}`}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '6px 14px',
                            borderRadius: '6px',
                            background: 'rgba(212,175,55,0.12)',
                            color: '#D4AF37',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            textDecoration: 'none',
                            border: '1px solid rgba(212,175,55,0.25)',
                            marginRight: '8px',
                            transition: 'background 0.15s ease, border-color 0.15s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(212,175,55,0.22)';
                            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.5)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(212,175,55,0.12)';
                            e.currentTarget.style.borderColor = 'rgba(212,175,55,0.25)';
                          }}
                          aria-label={`Edit ${property.name}`}
                        >
                          ✏️ Edit
                        </Link>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDeleteClick(property._id)}
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
                          aria-label={`Delete ${property.name}`}
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

      {/* ----------------------------------------------------------------
          Confirm delete dialog
      ---------------------------------------------------------------- */}
      <ConfirmDialog
        isOpen={confirmOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Delete Property"
        message="Are you sure you want to delete this property? This action cannot be undone."
      />
    </div>
  );
}
