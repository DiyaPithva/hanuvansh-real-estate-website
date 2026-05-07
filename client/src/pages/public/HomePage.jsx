import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, useInView } from 'framer-motion';

import { fetchFeaturedProperties } from '../../store/propertiesSlice.js';
import { fetchTestimonials } from '../../store/testimonialsSlice.js';
import PropertyCard from '../../components/property/PropertyCard.jsx';
import SkeletonLoader from '../../components/common/SkeletonLoader.jsx';
import {
  revealUp,
  revealLeft,
  revealRight,
  stagger,
  revealUpFast,
  lineGrow,
  scaleIn,
} from '../../styles/animations.js';

// Feature: hanuvansh-mern-estate
// HomePage: premium luxury landing page
// Requirements: 9.1–9.7

// ─────────────────────────────────────────────────────────────────────────────
// Animated counter
// ─────────────────────────────────────────────────────────────────────────────
function useCounter(target, duration = 1800, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration, active]);
  return val;
}

// ─────────────────────────────────────────────────────────────────────────────
// Star rating
// ─────────────────────────────────────────────────────────────────────────────
function Stars({ n }) {
  return (
    <div className="flex gap-0.5" aria-label={`${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i < n ? '#B8860B' : '#e0d9ce'} aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Decorative floating blur orb
// ─────────────────────────────────────────────────────────────────────────────
function Orb({ size, color, style }) {
  return (
    <div
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: color,
        filter: 'blur(80px)',
        opacity: 0.45,
        ...style,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section eyebrow label
// ─────────────────────────────────────────────────────────────────────────────
function Eyebrow({ children }) {
  return (
    <span className="eyebrow">{children}</span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Gold rule line
// ─────────────────────────────────────────────────────────────────────────────
function Rule() {
  return <span className="rule" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// HERO — right-side visual panel sub-components
// ─────────────────────────────────────────────────────────────────────────────
function HeroStatPill({ value, label }) {
  return (
    <div
      className="glass-card flex items-center gap-3 px-4 py-3"
      style={{ borderRadius: 6, minWidth: 140 }}
    >
      <span
        className="font-heading font-bold text-accent"
        style={{ fontSize: '1.35rem', lineHeight: 1 }}
      >
        {value}
      </span>
      <span className="font-body text-[11px] text-ink-3 leading-tight tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
}

function HeroPropertyPreview({ label, sub, badge }) {
  return (
    <div
      className="glass-card flex items-center gap-3 px-4 py-3"
      style={{ borderRadius: 6 }}
    >
      {/* Thumbnail placeholder */}
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #ece6d8, #d0c8ba)',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
        }}
      >
        🏡
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-heading text-ink text-[13px] font-semibold leading-tight truncate">{label}</p>
        <p className="font-body text-muted text-[11px] mt-0.5 truncate">{sub}</p>
      </div>
      <span
        className="font-body text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 flex-shrink-0"
        style={{
          background: 'rgba(184,134,11,0.1)',
          color: '#B8860B',
          border: '1px solid rgba(184,134,11,0.2)',
          borderRadius: 3,
        }}
      >
        {badge}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const dispatch = useDispatch();
  const { featured, loading: propLoading, error: propError } = useSelector((s) => s.properties);
  const { items: testimonials, loading: testLoading, error: testError } = useSelector((s) => s.testimonials);

  useEffect(() => {
    dispatch(fetchFeaturedProperties());
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });
  const c1 = useCounter(10,  1600, statsInView);
  const c2 = useCounter(500, 1800, statsInView);
  const c3 = useCounter(1000, 2000, statsInView);

  const displayedProperties = featured.slice(0, 6);

  return (
    <main className="bg-premium font-body text-ink overflow-x-hidden">

      {/* ================================================================
          1. HERO — split layout
      ================================================================ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #faf8f4 0%, #f4f0e8 60%, #faf8f4 100%)' }}
        aria-label="Hero"
      >
        {/* Background orbs */}
        <Orb size={500} color="radial-gradient(circle, rgba(184,134,11,0.12), transparent)" style={{ top: '-10%', right: '-5%' }} />
        <Orb size={350} color="radial-gradient(circle, rgba(184,134,11,0.08), transparent)" style={{ bottom: '5%', left: '-8%' }} />

        {/* Subtle grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(184,134,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(184,134,11,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="wrap relative z-10 w-full py-24 lg:py-0 lg:min-h-screen lg:flex lg:items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">

            {/* ── LEFT: Content ─────────────────────────────────── */}
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col"
            >
              {/* Eyebrow */}
              <motion.div variants={revealUpFast} className="flex items-center gap-3 mb-6">
                <div style={{ width: 32, height: 1, background: 'linear-gradient(90deg, #B8860B, rgba(184,134,11,0.3))' }} />
                <span className="font-body text-[10px] font-semibold tracking-widest3 uppercase text-accent">
                  Est. 2014 · Premium Real Estate
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1 variants={revealUp} className="h1 mb-6">
                Where Luxury
                <br />
                <span style={{ color: '#B8860B' }}>Meets Legacy</span>
                <br />
                in Real Estate
              </motion.h1>

              {/* Decorative rule */}
              <motion.div variants={lineGrow}>
                <Rule />
              </motion.div>

              {/* Body */}
              <motion.p variants={revealUpFast} className="body-text max-w-md mb-10">
                Hanuvansh Estate Consultant — a decade of curating premium properties
                across India. We don't just close deals; we build generational wealth
                through trust, expertise, and an uncompromising eye for value.
              </motion.p>

              {/* CTA buttons */}
              <motion.div variants={revealUpFast} className="flex flex-wrap gap-3">
                <Link to="/properties" className="btn-accent" style={{ borderRadius: 3 }}>
                  Explore Properties
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link to="/contact" className="btn-outline" style={{ borderRadius: 3 }}>
                  Book Consultation
                </Link>
              </motion.div>

              {/* Trust indicators */}
              <motion.div variants={revealUpFast} className="flex items-center gap-6 mt-10 pt-8" style={{ borderTop: '1px solid rgba(224,217,206,0.7)' }}>
                {[
                  { n: '10+', l: 'Years' },
                  { n: '500+', l: 'Properties' },
                  { n: '1000+', l: 'Clients' },
                ].map(({ n, l }) => (
                  <div key={l} className="text-center">
                    <p className="font-heading font-bold text-ink" style={{ fontSize: '1.25rem' }}>{n}</p>
                    <p className="font-body text-[11px] text-muted tracking-widest uppercase mt-0.5">{l}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Visual panel ───────────────────────────── */}
            <motion.div
              variants={revealRight}
              initial="hidden"
              animate="visible"
              className="relative hidden lg:flex flex-col items-end gap-4"
              style={{ minHeight: 480 }}
            >
              {/* Main card — abstract luxury visual */}
              <div
                className="relative w-full"
                style={{
                  maxWidth: 420,
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: 'linear-gradient(145deg, #1a1a1a 0%, #2d2010 50%, #1a1a1a 100%)',
                  aspectRatio: '4/3',
                  boxShadow: '0 24px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(184,134,11,0.15)',
                }}
              >
                {/* Geometric luxury pattern */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      radial-gradient(ellipse 70% 60% at 30% 40%, rgba(184,134,11,0.18) 0%, transparent 60%),
                      radial-gradient(ellipse 50% 40% at 80% 70%, rgba(212,160,23,0.12) 0%, transparent 55%)
                    `,
                  }}
                />
                {/* Corner lines */}
                <div aria-hidden="true" className="absolute top-5 left-5 w-8 h-8" style={{ borderTop: '1px solid rgba(184,134,11,0.5)', borderLeft: '1px solid rgba(184,134,11,0.5)' }} />
                <div aria-hidden="true" className="absolute bottom-5 right-5 w-8 h-8" style={{ borderBottom: '1px solid rgba(184,134,11,0.5)', borderRight: '1px solid rgba(184,134,11,0.5)' }} />

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(184,134,11,0.15)', border: '1px solid rgba(184,134,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9 22V12h6v10" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="font-heading text-white font-bold" style={{ fontSize: '1.1rem', letterSpacing: '0.05em' }}>Premium Portfolio</p>
                  <p className="font-body text-[11px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.45)' }}>Curated Luxury Properties</p>
                  {/* Gold divider */}
                  <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, #B8860B, transparent)', marginTop: 4 }} />
                  <p className="font-body text-[11px]" style={{ color: 'rgba(184,134,11,0.8)' }}>Est. 2014</p>
                </div>
              </div>

              {/* Floating stat pills */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -left-8 top-8"
              >
                <HeroStatPill value="10+" label="Years of Excellence" />
              </motion.div>

              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                className="absolute -left-4 bottom-28"
              >
                <HeroStatPill value="₹500Cr+" label="Properties Transacted" />
              </motion.div>

              {/* Property preview cards */}
              <div className="w-full flex flex-col gap-2.5" style={{ maxWidth: 420 }}>
                <HeroPropertyPreview label="Luxury Villa, Gurugram" sub="4 BHK · 3,200 sq ft" badge="New" />
                <HeroPropertyPreview label="Premium Apartment, Noida" sub="3 BHK · 1,850 sq ft" badge="Hot" />
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.35 }}>
          <span className="font-body text-[10px] tracking-widest uppercase text-muted">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, #B8860B, transparent)' }}
          />
        </div>
      </section>

      {/* ================================================================
          2. STATS SECTION — premium horizontal glassmorphism cards
      ================================================================ */}
      <section
        className="relative py-16 overflow-hidden"
        style={{ background: '#141414' }}
        aria-label="Company Statistics"
        ref={statsRef}
      >
        <Orb size={400} color="radial-gradient(circle, rgba(184,134,11,0.1), transparent)" style={{ top: '-30%', left: '20%' }} />

        <div className="wrap relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { count: c1, suffix: '+', label: 'Years of Experience', icon: '🏆', desc: 'Trusted since 2014' },
              { count: c2, suffix: '+', label: 'Properties Sold',     icon: '🏠', desc: 'Across India' },
              { count: c3, suffix: '+', label: 'Satisfied Clients',   icon: '🤝', desc: 'And counting' },
            ].map(({ count, suffix, label, icon, desc }) => (
              <motion.div
                key={label}
                variants={revealUpFast}
                className="glass-card-dark group flex items-center gap-5 px-6 py-7 transition-all duration-300 cursor-default"
                style={{ borderRadius: 4 }}
                whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(184,134,11,0.2)' }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 6,
                    background: 'rgba(184,134,11,0.1)',
                    border: '1px solid rgba(184,134,11,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 22,
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                <div>
                  <p className="font-heading font-bold text-white" style={{ fontSize: 'clamp(1.6rem, 3vw, 2rem)', lineHeight: 1 }}>
                    {count}{suffix}
                  </p>
                  <p className="font-body text-[12px] font-semibold tracking-widest uppercase mt-1" style={{ color: '#B8860B' }}>
                    {label}
                  </p>
                  <p className="font-body text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          3. FEATURED PROPERTIES
      ================================================================ */}
      <section className="section bg-premium-section" aria-label="Featured Properties">
        <div className="wrap">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <motion.div variants={revealUpFast}>
              <Eyebrow>Handpicked for You</Eyebrow>
            </motion.div>
            <motion.h2 variants={revealUp} className="h2">
              Featured Properties
            </motion.h2>
            <motion.div variants={lineGrow}>
              <Rule />
            </motion.div>
            <motion.p variants={revealUpFast} className="body-text max-w-lg">
              A curated selection of our finest listings — each chosen for its exceptional
              value, location, and investment potential.
            </motion.p>
          </motion.div>

          {propLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <SkeletonLoader count={6} className="h-72" />
            </div>
          ) : propError ? (
            <div className="py-16 text-center">
              <p className="body-text">Unable to load featured properties at this time.</p>
            </div>
          ) : displayedProperties.length === 0 ? (
            <div className="py-16 text-center">
              <p className="body-text">No featured properties available right now. Check back soon.</p>
            </div>
          ) : (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {displayedProperties.map((p) => (
                <motion.div key={p._id} variants={scaleIn}>
                  <PropertyCard property={p} />
                </motion.div>
              ))}
            </motion.div>
          )}

          {!propLoading && !propError && displayedProperties.length > 0 && (
            <div className="mt-12 flex justify-center">
              <Link to="/properties" className="btn-outline-accent" style={{ borderRadius: 3 }}>
                View All Properties
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                  <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ================================================================
          4. COMPANY INTRO — two-column editorial layout
      ================================================================ */}
      <section className="section bg-premium" aria-label="About Hanuvansh Estate Consultant">
        <div className="wrap">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: brand story */}
            <motion.div
              variants={revealLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Eyebrow>Who We Are</Eyebrow>
              <h2 className="h2">
                A Legacy Built on{' '}
                <span style={{ color: '#B8860B' }}>Trust &amp; Excellence</span>
              </h2>
              <Rule />
              <p className="body-text mb-5">
                At Hanuvansh Estate Consultant, every property transaction is more than
                a financial decision — it is a milestone in your life's journey. With over
                a decade of expertise in the Indian real estate market, we guide our clients
                toward investments that stand the test of time.
              </p>
              <p className="body-text mb-8">
                From luxury villas and premium apartments to strategic commercial spaces,
                our curated portfolio reflects our commitment to quality, transparency, and
                long-term value creation.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/about" className="btn-primary" style={{ borderRadius: 3 }}>
                  Our Story
                </Link>
                <Link to="/founder" className="btn-ghost" style={{ borderRadius: 3 }}>
                  Meet the Founder
                </Link>
              </div>
            </motion.div>

            {/* Right: value pillars */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                { icon: '🎯', title: 'Precision Matching', body: 'We match clients to properties that align with their lifestyle, goals, and financial vision.' },
                { icon: '🔒', title: 'Full Transparency', body: 'No hidden fees, no surprises. Every transaction is clear, documented, and client-first.' },
                { icon: '📈', title: 'Investment Focus', body: 'We identify properties with strong appreciation potential and rental yield prospects.' },
                { icon: '🤝', title: 'Lifetime Support', body: 'Our relationship doesn\'t end at closing. We support clients through every stage of ownership.' },
              ].map(({ icon, title, body }) => (
                <motion.div
                  key={title}
                  variants={revealUpFast}
                  className="glass-card p-5 transition-all duration-300"
                  style={{ borderRadius: 4 }}
                  whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(184,134,11,0.15)' }}
                >
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{icon}</div>
                  <h3 className="h3 mb-2">{title}</h3>
                  <p className="font-body text-[13px] text-ink-3 leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ================================================================
          5. TESTIMONIALS
      ================================================================ */}
      <section className="section bg-premium-section" aria-label="Client Testimonials">
        <div className="wrap">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-14"
          >
            <motion.div variants={revealUpFast}>
              <Eyebrow>What Our Clients Say</Eyebrow>
            </motion.div>
            <motion.h2 variants={revealUp} className="h2">
              Client Testimonials
            </motion.h2>
            <motion.div variants={lineGrow}>
              <Rule />
            </motion.div>
          </motion.div>

          {testLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <SkeletonLoader count={3} className="h-48" />
            </div>
          ) : testError ? (
            <div className="py-12 text-center">
              <p className="body-text">Unable to load testimonials at this time.</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="py-12 text-center">
              <p className="body-text">No testimonials available yet.</p>
            </div>
          ) : (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {testimonials.map((t) => (
                <motion.div
                  key={t._id}
                  variants={revealUpFast}
                  className="glass-card flex flex-col gap-4 p-6 transition-all duration-300"
                  style={{ borderRadius: 4 }}
                  whileHover={{ y: -2, boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                >
                  {/* Quote mark */}
                  <div
                    className="font-heading font-bold"
                    style={{ fontSize: '2.5rem', lineHeight: 1, color: 'rgba(184,134,11,0.2)', marginTop: -8 }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  <Stars n={t.rating} />
                  <p className="font-body text-[13.5px] text-ink-3 leading-relaxed flex-1 italic">
                    {t.message}
                  </p>
                  <div
                    className="flex items-center gap-3 pt-4"
                    style={{ borderTop: '1px solid rgba(224,217,206,0.7)' }}
                  >
                    {t.avatar ? (
                      <img
                        src={t.avatar}
                        alt={t.clientName}
                        className="w-10 h-10 rounded-full object-cover"
                        style={{ border: '1px solid rgba(184,134,11,0.25)' }}
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-bold text-accent text-sm flex-shrink-0"
                        style={{ background: 'rgba(184,134,11,0.1)', border: '1px solid rgba(184,134,11,0.2)' }}
                      >
                        {t.clientName?.charAt(0)?.toUpperCase() ?? '?'}
                      </div>
                    )}
                    <div>
                      <p className="font-body text-[13px] font-semibold text-ink">{t.clientName}</p>
                      {t.clientTitle && (
                        <p className="font-body text-[11px] text-muted mt-0.5">{t.clientTitle}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ================================================================
          6. PREMIUM CTA SECTION
      ================================================================ */}
      <section
        className="relative py-28 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #1c1000 50%, #0f0f0f 100%)' }}
        aria-label="Contact CTA"
      >
        <Orb size={600} color="radial-gradient(circle, rgba(184,134,11,0.1), transparent)" style={{ top: '-20%', left: '30%' }} />

        {/* Geometric accent lines */}
        <div aria-hidden="true" className="absolute top-10 left-10 w-16 h-16" style={{ borderTop: '1px solid rgba(184,134,11,0.2)', borderLeft: '1px solid rgba(184,134,11,0.2)' }} />
        <div aria-hidden="true" className="absolute bottom-10 right-10 w-16 h-16" style={{ borderBottom: '1px solid rgba(184,134,11,0.2)', borderRight: '1px solid rgba(184,134,11,0.2)' }} />

        <div className="wrap relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div variants={revealUpFast} className="flex items-center justify-center gap-3 mb-6">
              <div style={{ width: 28, height: 1, background: 'rgba(184,134,11,0.5)' }} />
              <span className="font-body text-[10px] font-semibold tracking-widest3 uppercase" style={{ color: '#B8860B' }}>
                Your Dream Property Awaits
              </span>
              <div style={{ width: 28, height: 1, background: 'rgba(184,134,11,0.5)' }} />
            </motion.div>

            <motion.h2 variants={revealUp} className="font-heading font-bold text-white mb-6" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.15 }}>
              Ready to Invest in{' '}
              <span style={{ color: '#D4A017' }}>Timeless Wealth?</span>
            </motion.h2>

            <motion.p variants={revealUpFast} className="font-body text-[15px] leading-relaxed mb-10 max-w-lg mx-auto" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Let our experts guide you to the perfect property. Whether you are buying,
              investing, or exploring — we make every step seamless and rewarding.
            </motion.p>

            <motion.div variants={revealUpFast} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="btn"
                style={{
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #B8860B 0%, #D4A017 100%)',
                  color: '#fff',
                  boxShadow: '0 4px 24px rgba(184,134,11,0.35)',
                  fontSize: 12,
                  paddingLeft: 28,
                  paddingRight: 28,
                  paddingTop: 14,
                  paddingBottom: 14,
                }}
              >
                Contact Us Today
              </Link>
              <Link
                to="/properties"
                className="btn"
                style={{
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: 12,
                  paddingLeft: 28,
                  paddingRight: 28,
                  paddingTop: 14,
                  paddingBottom: 14,
                }}
              >
                Browse Properties
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
