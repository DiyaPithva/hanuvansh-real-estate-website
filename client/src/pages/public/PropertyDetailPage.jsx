import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { fetchPropertyById } from '../../store/propertiesSlice.js';
import PropertyGallery from '../../components/property/PropertyGallery.jsx';
import AmenitiesGrid from '../../components/property/AmenitiesGrid.jsx';
import NearbyPlaces from '../../components/property/NearbyPlaces.jsx';
import MapEmbed from '../../components/property/MapEmbed.jsx';
import InquiryForm from '../../components/forms/InquiryForm.jsx';
import SkeletonLoader from '../../components/common/SkeletonLoader.jsx';
import { formatPrice } from '../../utils/formatPrice.js';
import { sectionVariants } from '../../styles/animations.js';

// Feature: hanuvansh-mern-estate
// PropertyDetailPage: full detail view for a single property.
// Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7, 13.8

/** Section heading with gold divider */
function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px flex-1 bg-white/10" />
      <h2 className="font-heading text-lg font-semibold text-gold tracking-wide uppercase whitespace-nowrap">
        {children}
      </h2>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

/** Badge pill for property type / status / configuration */
function Badge({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-white/10 text-text-muted',
    accent:  'bg-accent/20 text-accent border border-accent/40',
    gold:    'bg-gold/10 text-gold border border-gold/30',
    green:   'bg-green-600/20 text-green-400 border border-green-600/30',
    red:     'bg-red-600/20 text-red-400 border border-red-600/30',
  };
  return (
    <span
      className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

/** Map a property status string to a badge variant */
function statusVariant(status = '') {
  const s = status.toLowerCase();
  if (s === 'available') return 'green';
  if (s === 'sold') return 'red';
  return 'default';
}

export default function PropertyDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selected, loading } = useSelector((state) => state.properties);

  // Track 404 locally so we don't misread a stale error from another action
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;

    setNotFound(false);

    dispatch(fetchPropertyById(id))
      .unwrap()
      .catch((err) => {
        // err here is the rejectWithValue payload (a string message)
        // We also check the raw axios error via the action meta — but since
        // rejectWithValue only gives us the message string, we treat any
        // rejection on this page as "not found" for simplicity, because the
        // only realistic failure for a valid ID format is a 404.
        // For a more precise check the slice would need to forward the status.
        setNotFound(true);
      });
  }, [id, dispatch]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main
        className="bg-bg-primary text-text-primary font-body min-h-screen py-16 px-6"
        aria-busy="true"
        aria-label="Loading property details"
      >
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Gallery skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            <SkeletonLoader count={8} className="aspect-square" />
          </div>
          {/* Content skeletons */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-4">
              <SkeletonLoader count={4} className="h-8" />
            </div>
            <div>
              <SkeletonLoader count={1} className="h-64" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ── 404 / Not Found state ──────────────────────────────────────────────────
  if (notFound || (!loading && !selected)) {
    return (
      <main
        className="bg-bg-primary text-text-primary font-body min-h-screen flex items-center justify-center px-6"
        aria-label="Property not found"
      >
        <div className="text-center max-w-md">
          {/* Decorative icon */}
          <div
            className="text-6xl mb-6"
            aria-hidden="true"
          >
            🏚️
          </div>

          <h1 className="font-heading text-3xl font-bold text-text-primary mb-3">
            Property Not Found
          </h1>

          <p className="text-text-muted text-sm mb-8 leading-relaxed">
            The property you&apos;re looking for doesn&apos;t exist or may have been removed.
          </p>

          <Link
            to="/properties"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 text-sm"
          >
            ← Back to Properties
          </Link>
        </div>
      </main>
    );
  }

  // ── Property data ──────────────────────────────────────────────────────────
  const property = selected;
  const {
    name,
    location,
    type,
    price,
    configuration,
    status,
    description,
    amenities = [],
    nearbyPlaces = [],
    mapCoordinates,
    images = [],
  } = property;

  const lat = mapCoordinates?.lat ?? mapCoordinates?.latitude ?? null;
  const lng = mapCoordinates?.lng ?? mapCoordinates?.longitude ?? null;

  return (
    <main className="bg-bg-primary text-text-primary font-body min-h-screen">

      {/* ================================================================
          PAGE HEADER — breadcrumb + title
      ================================================================ */}
      <section
        className="relative py-16 px-6 overflow-hidden"
        aria-label="Property header"
        style={{
          background: 'linear-gradient(180deg, #111111 0%, #0a0a0a 100%)',
        }}
      >
        {/* Decorative radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,107,0,0.05) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto"
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-text-muted">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">›</li>
              <li>
                <Link to="/properties" className="hover:text-accent transition-colors">
                  Properties
                </Link>
              </li>
              <li aria-hidden="true" className="opacity-40">›</li>
              <li className="text-text-primary truncate max-w-[200px]" aria-current="page">
                {name}
              </li>
            </ol>
          </nav>

          {/* Title row */}
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-2">
                {name}
              </h1>
              {location && (
                <p className="text-text-muted text-sm flex items-center gap-1">
                  <span aria-hidden="true">📍</span>
                  {location}
                </p>
              )}
            </div>

            {/* Price */}
            {price != null && (
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-text-muted uppercase tracking-widest mb-1">
                  Price
                </p>
                <p className="font-heading text-2xl sm:text-3xl font-bold text-accent">
                  {formatPrice(price)}
                </p>
              </div>
            )}
          </div>

          {/* Badges row */}
          <div className="flex flex-wrap gap-2 mt-4">
            {type && <Badge variant="gold">{type}</Badge>}
            {configuration && <Badge variant="accent">{configuration}</Badge>}
            {status && <Badge variant={statusVariant(status)}>{status}</Badge>}
          </div>
        </motion.div>
      </section>

      {/* ================================================================
          MAIN CONTENT
      ================================================================ */}
      <section className="py-10 px-6" aria-label="Property details">
        <div className="max-w-5xl mx-auto">

          {/* ---- Gallery ---- */}
          {images.length > 0 && (
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-10"
            >
              <SectionHeading>Gallery</SectionHeading>
              <PropertyGallery images={images} />
            </motion.div>
          )}

          {/* ---- Two-column layout: details + inquiry ---- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ---- Left: property details ---- */}
            <div className="lg:col-span-2 space-y-10">

              {/* Description */}
              {description && (
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <SectionHeading>About This Property</SectionHeading>
                  <p className="text-text-muted text-sm leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </motion.div>
              )}

              {/* Property details table */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <SectionHeading>Property Details</SectionHeading>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Property Name', value: name },
                    { label: 'Location',       value: location },
                    { label: 'Type',           value: type },
                    { label: 'Configuration',  value: configuration },
                    { label: 'Status',         value: status },
                    { label: 'Price',          value: price != null ? formatPrice(price) : null },
                  ]
                    .filter(({ value }) => value != null && value !== '')
                    .map(({ label, value }) => (
                      <div
                        key={label}
                        className="bg-bg-card border border-white/10 rounded-lg px-4 py-3"
                      >
                        <dt className="text-text-muted text-xs uppercase tracking-wider mb-1">
                          {label}
                        </dt>
                        <dd className="text-text-primary text-sm font-medium">
                          {value}
                        </dd>
                      </div>
                    ))}
                </dl>
              </motion.div>

              {/* Amenities */}
              {amenities.length > 0 && (
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <SectionHeading>Amenities</SectionHeading>
                  <AmenitiesGrid amenities={amenities} />
                </motion.div>
              )}

              {/* Nearby Places */}
              {nearbyPlaces.length > 0 && (
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <SectionHeading>Nearby Places</SectionHeading>
                  <NearbyPlaces places={nearbyPlaces} />
                </motion.div>
              )}

              {/* Map */}
              {(lat != null && lng != null) && (
                <motion.div
                  variants={sectionVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <SectionHeading>Location on Map</SectionHeading>
                  <MapEmbed lat={lat} lng={lng} title={name} />
                </motion.div>
              )}
            </div>

            {/* ---- Right: sticky inquiry form ---- */}
            <aside
              className="lg:col-span-1"
              aria-label="Inquiry form"
            >
              <div className="lg:sticky lg:top-24">
                <InquiryForm
                  propertyId={property._id}
                  propertyName={name}
                />
              </div>
            </aside>
          </div>

          {/* Back link */}
          <div className="mt-14 pt-8 border-t border-white/10">
            <Link
              to="/properties"
              className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors text-sm"
            >
              ← Back to All Properties
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
