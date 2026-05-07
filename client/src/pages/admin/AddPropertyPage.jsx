/**
 * AddPropertyPage.jsx — Create a new property listing.
 *
 * Behaviour:
 *  - Renders a full property form with all Property model fields
 *  - Uses ImageUploader to collect uploaded image URLs
 *  - On submit dispatches `createProperty` thunk
 *  - On success redirects to /admin/properties
 *  - Shows validation errors and loading state
 *
 * Requirements: 16.3
 */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { createProperty } from '../../store/propertiesSlice.js';
import ImageUploader from '../../components/admin/ImageUploader.jsx';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const PROPERTY_TYPES = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Penthouse'];
const PROPERTY_STATUSES = ['Available', 'Sold', 'Under Construction'];

// ---------------------------------------------------------------------------
// Shared input styles
// ---------------------------------------------------------------------------
const inputStyle = {
  width: '100%',
  background: '#0a0a0a',
  border: '1px solid rgba(212,175,55,0.2)',
  borderRadius: '8px',
  padding: '10px 14px',
  color: '#FFFFFF',
  fontSize: '0.9rem',
  outline: 'none',
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

const sectionHeadingStyle = {
  fontSize: '0.75rem',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: '#D4AF37',
  marginBottom: '16px',
  paddingBottom: '8px',
  borderBottom: '1px solid rgba(212,175,55,0.15)',
};

// ---------------------------------------------------------------------------
// FieldGroup — label + input wrapper
// ---------------------------------------------------------------------------
function FieldGroup({ label, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyle}>{label}</label>
      {children}
      {error && (
        <span style={{ color: '#EF4444', fontSize: '0.78rem', marginTop: '4px' }}>
          {error}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Initial form state
// ---------------------------------------------------------------------------
const INITIAL_FORM = {
  name: '',
  location: '',
  type: '',
  price: '',
  configuration: '',
  status: '',
  description: '',
  amenities: '',
  nearbyPlaces: '',
  lat: '',
  lng: '',
  featured: false,
};

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------
function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.location.trim()) errors.location = 'Location is required.';
  if (!form.type) errors.type = 'Type is required.';
  if (!form.price || isNaN(Number(form.price)) || Number(form.price) < 0)
    errors.price = 'A valid price is required.';
  if (!form.status) errors.status = 'Status is required.';
  return errors;
}

// ---------------------------------------------------------------------------
// AddPropertyPage
// ---------------------------------------------------------------------------
export default function AddPropertyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error: reduxError } = useSelector((state) => state.properties);

  const [form, setForm] = useState(INITIAL_FORM);
  const [images, setImages] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});

  // ---- handlers ----
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear field-level error on change
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleImagesUploaded = (urls) => {
    setImages(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate(form);
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const payload = {
      name: form.name.trim(),
      location: form.location.trim(),
      type: form.type,
      price: Number(form.price),
      configuration: form.configuration.trim(),
      status: form.status,
      description: form.description.trim(),
      amenities: form.amenities
        ? form.amenities.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      nearbyPlaces: form.nearbyPlaces
        ? form.nearbyPlaces.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
      mapCoordinates: {
        lat: form.lat ? Number(form.lat) : undefined,
        lng: form.lng ? Number(form.lng) : undefined,
      },
      featured: form.featured,
      images,
    };

    const result = await dispatch(createProperty(payload));
    if (createProperty.fulfilled.match(result)) {
      navigate('/admin/properties');
    }
  };

  // ---- render ----
  return (
    <div
      style={{
        padding: '40px 36px',
        minHeight: '100vh',
        background: '#0a0a0a',
      }}
    >
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ marginBottom: '32px' }}
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
          Add Property
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#9CA3AF', marginTop: '6px' }}>
          Fill in the details below to create a new listing
        </p>
      </motion.div>

      {/* Form card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
        style={{
          background: '#111111',
          border: '1px solid rgba(212,175,55,0.12)',
          borderRadius: '16px',
          padding: '36px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
          maxWidth: '900px',
        }}
      >
        {/* Redux-level error */}
        {reduxError && (
          <div
            style={{
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid #EF4444',
              borderRadius: '8px',
              padding: '12px 16px',
              color: '#EF4444',
              fontSize: '0.875rem',
              marginBottom: '24px',
            }}
          >
            {reduxError}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* ── Basic Info ── */}
          <p style={sectionHeadingStyle}>Basic Information</p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px',
              marginBottom: '28px',
            }}
          >
            <FieldGroup label="Property Name *" error={validationErrors.name}>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Sunrise Villa"
                style={{
                  ...inputStyle,
                  borderColor: validationErrors.name
                    ? '#EF4444'
                    : 'rgba(212,175,55,0.2)',
                }}
              />
            </FieldGroup>

            <FieldGroup label="Location *" error={validationErrors.location}>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Sector 62, Noida"
                style={{
                  ...inputStyle,
                  borderColor: validationErrors.location
                    ? '#EF4444'
                    : 'rgba(212,175,55,0.2)',
                }}
              />
            </FieldGroup>

            <FieldGroup label="Type *" error={validationErrors.type}>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: validationErrors.type
                    ? '#EF4444'
                    : 'rgba(212,175,55,0.2)',
                  cursor: 'pointer',
                }}
              >
                <option value="">Select type…</option>
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </FieldGroup>

            <FieldGroup label="Price (₹) *" error={validationErrors.price}>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 5000000"
                min="0"
                style={{
                  ...inputStyle,
                  borderColor: validationErrors.price
                    ? '#EF4444'
                    : 'rgba(212,175,55,0.2)',
                }}
              />
            </FieldGroup>

            <FieldGroup label="Configuration" error={validationErrors.configuration}>
              <input
                type="text"
                name="configuration"
                value={form.configuration}
                onChange={handleChange}
                placeholder="e.g. 3 BHK"
                style={inputStyle}
              />
            </FieldGroup>

            <FieldGroup label="Status *" error={validationErrors.status}>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: validationErrors.status
                    ? '#EF4444'
                    : 'rgba(212,175,55,0.2)',
                  cursor: 'pointer',
                }}
              >
                <option value="">Select status…</option>
                {PROPERTY_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </FieldGroup>
          </div>

          {/* ── Description ── */}
          <p style={sectionHeadingStyle}>Description</p>
          <div style={{ marginBottom: '28px' }}>
            <FieldGroup label="Description" error={validationErrors.description}>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe the property…"
                rows={4}
                style={{
                  ...inputStyle,
                  resize: 'vertical',
                  lineHeight: '1.6',
                }}
              />
            </FieldGroup>
          </div>

          {/* ── Amenities & Nearby ── */}
          <p style={sectionHeadingStyle}>Amenities &amp; Nearby Places</p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '20px',
              marginBottom: '28px',
            }}
          >
            <FieldGroup
              label="Amenities (comma-separated)"
              error={validationErrors.amenities}
            >
              <input
                type="text"
                name="amenities"
                value={form.amenities}
                onChange={handleChange}
                placeholder="e.g. Pool, Gym, Parking"
                style={inputStyle}
              />
            </FieldGroup>

            <FieldGroup
              label="Nearby Places (comma-separated)"
              error={validationErrors.nearbyPlaces}
            >
              <input
                type="text"
                name="nearbyPlaces"
                value={form.nearbyPlaces}
                onChange={handleChange}
                placeholder="e.g. School, Hospital, Metro"
                style={inputStyle}
              />
            </FieldGroup>
          </div>

          {/* ── Map Coordinates ── */}
          <p style={sectionHeadingStyle}>Map Coordinates</p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '20px',
              marginBottom: '28px',
            }}
          >
            <FieldGroup label="Latitude" error={validationErrors.lat}>
              <input
                type="number"
                name="lat"
                value={form.lat}
                onChange={handleChange}
                placeholder="e.g. 28.6139"
                step="any"
                style={inputStyle}
              />
            </FieldGroup>

            <FieldGroup label="Longitude" error={validationErrors.lng}>
              <input
                type="number"
                name="lng"
                value={form.lng}
                onChange={handleChange}
                placeholder="e.g. 77.2090"
                step="any"
                style={inputStyle}
              />
            </FieldGroup>
          </div>

          {/* ── Featured ── */}
          <p style={sectionHeadingStyle}>Visibility</p>
          <div style={{ marginBottom: '28px' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
              }}
            >
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: '#D4AF37',
                  cursor: 'pointer',
                }}
              />
              <span style={{ color: '#FFFFFF', fontSize: '0.9rem' }}>
                Mark as Featured
              </span>
            </label>
          </div>

          {/* ── Images ── */}
          <p style={sectionHeadingStyle}>Property Images</p>
          <div style={{ marginBottom: '36px' }}>
            <ImageUploader onUpload={handleImagesUploaded} />
          </div>

          {/* ── Actions ── */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => navigate('/admin/properties')}
              disabled={loading}
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: '1px solid rgba(156,163,175,0.3)',
                background: 'transparent',
                color: '#9CA3AF',
                fontSize: '0.9rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'border-color 0.2s ease, color 0.2s ease',
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 28px',
                borderRadius: '8px',
                border: 'none',
                background: loading
                  ? 'rgba(212,175,55,0.4)'
                  : 'linear-gradient(135deg, #D4AF37, #FFD700)',
                color: '#0a0a0a',
                fontWeight: 700,
                fontSize: '0.9rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: '14px',
                      height: '14px',
                      border: '2px solid rgba(10,10,10,0.3)',
                      borderTopColor: '#0a0a0a',
                      borderRadius: '50%',
                      display: 'inline-block',
                      animation: 'spin 0.7s linear infinite',
                    }}
                  />
                  Creating…
                </>
              ) : (
                'Create Property'
              )}
            </button>
          </div>
        </form>
      </motion.div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
