import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../api/index.js';
import { formatPrice } from '../utils/formatPrice.js';

const fade = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const STATUS_BADGE = {
  'Available':          'text-emerald-700 bg-emerald-50 border-emerald-200',
  'Under Construction': 'text-amber-700 bg-amber-50 border-amber-200',
  'Sold':               'text-gray-500 bg-gray-100 border-gray-200',
};

/* ── Lightbox ─────────────────────────────────────────────────────────── */
function Lightbox({ images, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-ink/95 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors"
        aria-label="Close"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors bg-ink/40 rounded-sm p-2"
          aria-label="Previous"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image */}
      <motion.img
        key={index}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        src={images[index]}
        alt={`Image ${index + 1}`}
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
        onClick={e => e.stopPropagation()}
      />

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={e => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors bg-ink/40 rounded-sm p-2"
          aria-label="Next"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Counter */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 font-body text-xs text-white/50">
        {index + 1} / {images.length}
      </div>
    </motion.div>
  );
}

/* ── Inquiry Form ─────────────────────────────────────────────────────── */
function InquiryForm({ property }) {
  const [form, setForm]       = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSub]  = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSub(true);
    setError('');
    try {
      await api.submitInquiry({
        ...form,
        propertyId:   property?.id || property?._id,
        propertyName: property?.name,
      });
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again or contact us directly.');
    } finally {
      setSub(false);
    }
  }

  const waMsg = encodeURIComponent(
    `Hi, I'm interested in ${property?.name || 'a property'} (${property?.location || ''}).\n\nCould you please share more details?`
  );
  const waLink = `https://wa.me/919106788526?text=${waMsg}`;

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="font-heading font-semibold text-ink text-base mb-2">Enquiry Sent</h4>
        <p className="font-body text-sm text-ink-3 mb-5">
          Thank you! We'll get back to you within 24 hours.
        </p>
        <button onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', message: '' }); }} className="btn-ghost text-sm">
          Send Another
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">Full Name *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Your name"
          className="field"
        />
      </div>
      <div>
        <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">Email *</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="your@email.com"
          className="field"
        />
      </div>
      <div>
        <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">Phone</label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          placeholder="+91 98765 43210"
          className="field"
        />
      </div>
      <div>
        <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="I'm interested in this property…"
          className="field resize-none"
        />
      </div>

      {error && (
        <p className="font-body text-xs text-red-600 bg-red-50 border border-red-200 rounded-sm px-3 py-2">
          {error}
        </p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
        {submitting ? (
          <>
            <span className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin" />
            Sending…
          </>
        ) : 'Send Enquiry'}
      </button>

      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full font-body font-semibold text-sm px-6 py-3 rounded-sm border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-200"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Chat on WhatsApp
      </a>
    </form>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function PropertyDetailPage() {
  const { id }       = useParams();
  const navigate     = useNavigate();

  const [property, setProperty] = useState(null);
  const [loading,  setLoading]  = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [activeImg,  setActiveImg]  = useState(0);
  const [lightbox,   setLightbox]   = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);

  useEffect(() => {
    setLoading(true);
    api.getPropertyById(id)
      .then(res => {
        const p = res.data || res;
        if (!p || (!p.id && !p._id)) { setNotFound(true); return; }
        setProperty(p);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="bg-cream min-h-screen">
        <div className="bg-white border-b border-border pt-20 pb-4">
          <div className="wrap">
            <div className="h-3 bg-cream-3 rounded w-48 animate-pulse" />
          </div>
        </div>
        <div className="wrap py-12">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-10">
            <div className="space-y-4">
              <div className="bg-cream-3 rounded-sm animate-pulse" style={{ height: '280px' }} />
              <div className="flex gap-2">
                {[1,2,3].map(i => <div key={i} className="bg-cream-3 rounded-sm animate-pulse w-24 h-16" />)}
              </div>
              <div className="h-6 bg-cream-3 rounded w-2/3 animate-pulse mt-4" />
              <div className="h-4 bg-cream-3 rounded w-1/3 animate-pulse" />
            </div>
            <div className="bg-cream-2 border border-border rounded-sm p-6 h-64 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="bg-cream min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="font-heading font-bold text-accent text-7xl mb-4">404</div>
          <h2 className="h2 mb-3">Property Not Found</h2>
          <p className="body-text mb-8 max-w-sm mx-auto">
            This property may have been removed or the link is incorrect.
          </p>
          <div className="flex gap-3 justify-center">
            <Link to="/properties" className="btn-primary">View All Properties</Link>
            <Link to="/" className="btn-ghost">Back to Home</Link>
          </div>
        </div>
      </div>
    );
  }

  const images = property.images?.length ? property.images : [
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80'
  ];
  const badge = STATUS_BADGE[property.status] || STATUS_BADGE['Available'];

  function openLightbox(i) {
    setLightboxIdx(i);
    setLightbox(true);
  }

  return (
    <div className="bg-cream min-h-screen">

      {/* ── Breadcrumb ──────────────────────────────────────────────── */}
      <div className="bg-white border-b border-border pt-20 pb-4">
        <div className="wrap">
          <nav className="flex items-center gap-2 font-body text-xs text-muted flex-wrap">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="text-border">›</span>
            <Link to="/properties" className="hover:text-accent transition-colors">Properties</Link>
            <span className="text-border">›</span>
            <span className="text-ink-3 line-clamp-1 max-w-[180px] sm:max-w-none">{property.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Main Content ────────────────────────────────────────────── */}
      <div className="wrap py-8 lg:py-12">
        <div className="grid lg:grid-cols-[3fr_2fr] gap-8 lg:gap-10 items-start">

          {/* ── Left: Details ─────────────────────────────────────── */}
          <motion.div variants={fade} initial="hidden" animate="visible">

            {/* Gallery */}
            <div className="mb-6">
              {/* Main image */}
              <div
                className="relative overflow-hidden rounded-sm cursor-pointer group"
                style={{ height: 'clamp(200px, 45vw, 280px)' }}
                onClick={() => openLightbox(activeImg)}
              >
                <img
                  src={images[activeImg]}
                  alt={property.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-sm px-3 py-1.5 flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
                    </svg>
                    <span className="font-body text-xs text-ink font-semibold">View Full</span>
                  </div>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-2 mt-2 overflow-x-auto pb-1">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`shrink-0 rounded-sm overflow-hidden border-2 transition-all duration-200 ${
                        i === activeImg ? 'border-accent' : 'border-transparent hover:border-border'
                      }`}
                      style={{ width: '88px', height: '60px' }}
                    >
                      <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="mb-6">
              <div className="flex flex-wrap items-start gap-3 mb-2">
                <h2 className="h2 flex-1">{property.name}</h2>
              </div>

              <p className="font-body text-sm text-muted flex items-center gap-1.5 mb-4">
                <svg className="w-4 h-4 text-accent shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {property.location}
              </p>

              {/* Price */}
              <div className="font-heading font-bold text-accent text-3xl mb-5">
                {formatPrice(property.price)}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`font-body text-xs font-semibold px-3 py-1 rounded-sm border ${badge}`}>
                  {property.status}
                </span>
                <span className="font-body text-xs font-semibold px-3 py-1 rounded-sm border border-border text-ink-3 bg-cream-2">
                  {property.type}
                </span>
                {property.configuration && (
                  <span className="font-body text-xs font-semibold px-3 py-1 rounded-sm border border-border text-ink-3 bg-cream-2">
                    {property.configuration}
                  </span>
                )}
              </div>

              {/* Description */}
              {property.description && (
                <div className="mb-8">
                  <h3 className="font-heading font-semibold text-ink text-base mb-3">About This Property</h3>
                  <p className="body-text">{property.description}</p>
                </div>
              )}

              {/* Amenities */}
              {property.amenities?.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-heading font-semibold text-ink text-base mb-4">Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {property.amenities.map(a => (
                      <div key={a} className="flex items-center gap-2 font-body text-sm text-ink-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                        {a}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Nearby Places */}
              {property.nearbyPlaces?.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-heading font-semibold text-ink text-base mb-4">Nearby Places</h3>
                  <ul className="space-y-2">
                    {property.nearbyPlaces.map(place => (
                      <li key={place} className="flex items-center gap-2 font-body text-sm text-ink-3">
                        <svg className="w-4 h-4 text-accent shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {place}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Map */}
              {property.mapCoordinates && (
                <div className="mb-4">
                  <h3 className="font-heading font-semibold text-ink text-base mb-4">Location</h3>
                  <div className="border border-border rounded-sm overflow-hidden">
                    <iframe
                      title="Property Location"
                      width="100%"
                      height="280"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${property.mapCoordinates.lat},${property.mapCoordinates.lng}&z=15&output=embed`}
                    />
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* ── Right: Sticky Form ─────────────────────────────────── */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              variants={fade}
              initial="hidden"
              animate="visible"
              className="bg-cream-2 border border-border rounded-sm p-6"
            >
              <h3 className="font-heading font-semibold text-ink text-lg mb-1">
                Enquire About This Property
              </h3>
              <p className="font-body text-xs text-muted mb-5">
                Fill in your details and we'll get back to you shortly.
              </p>
              <div className="h-px bg-border mb-5" />
              <InquiryForm property={property} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Lightbox ────────────────────────────────────────────────── */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            images={images}
            index={lightboxIdx}
            onClose={() => setLightbox(false)}
            onPrev={() => setLightboxIdx(i => (i - 1 + images.length) % images.length)}
            onNext={() => setLightboxIdx(i => (i + 1) % images.length)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
