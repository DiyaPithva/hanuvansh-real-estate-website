import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { api } from '../api/index.js';
import PropertyCard from '../components/PropertyCard.jsx';

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};
const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const fadeRight = {
  hidden:  { opacity: 0, x: 48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const fadeLeft = {
  hidden:  { opacity: 0, x: -48 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

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

function Stars({ n = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24"
          fill={i < n ? '#fb923c' : '#FED7AA'} aria-hidden="true">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={center ? 'text-center' : ''}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="h2 mt-2 mb-4">{title}</h2>
      {subtitle && <p className="body-text max-w-xl">{subtitle}</p>}
    </div>
  );
}

const WHATSAPP = 'https://wa.me/919876543210?text=Hello%2C%20I%20am%20interested%20in%20a%20property.';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });
  const c1 = useCounter(500,  1800, statsInView);
  const c2 = useCounter(200,  1600, statsInView);
  const c3 = useCounter(150,  1700, statsInView);
  const c4 = useCounter(1000, 2000, statsInView);

  useEffect(() => {
    Promise.all([api.getFeaturedProperties(), api.getTestimonials()])
      .then(([fp, tp]) => {
        setFeatured((fp.data || []).slice(0, 6));
        setTestimonials(tp.data || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white">

      {/* HERO */}
      <section
        className="relative overflow-hidden"
        aria-label="Hero"
        style={{
          background: 'linear-gradient(135deg, #fdf6ee 0%, #fff4e7 50%, #fdebd7 100%)',
          minHeight: '92vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Subtle background orbs */}
        {[
          { w: 480, h: 480, top: '-10%', left: '-6%',  bg: 'radial-gradient(circle, rgba(255,140,40,0.07) 0%, transparent 65%)', dur: 26, delay: 0 },
          { w: 360, h: 360, top: '50%',  right: '-5%', bg: 'radial-gradient(circle, rgba(255,110,20,0.05) 0%, transparent 65%)', dur: 32, delay: 5 },
          { w: 280, h: 280, top: '15%',  left: '62%',  bg: 'radial-gradient(circle, rgba(255,170,70,0.05) 0%, transparent 65%)', dur: 20, delay: 3 },
        ].map(({ w, h, top, left, right, bg, dur, delay }, i) => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none" aria-hidden="true"
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut', delay }}
            style={{ width: w, height: h, top, left, right, background: bg, filter: 'blur(52px)' }}
          />
        ))}

        {/* Hero content */}
        <div
          className="relative z-10 w-full flex flex-col items-center text-center"
          style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center w-full"
          >

            {/* Badge */}
            <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
              <span
                className="inline-flex items-center font-body"
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  padding: '10px 22px',
                  borderRadius: 999,
                  border: '1.5px solid rgba(255,107,0,0.25)',
                  background: 'rgba(255,107,0,0.06)',
                  color: '#c2410c',
                  letterSpacing: '0.01em',
                }}
              >
                ✦&nbsp;&nbsp;Authorized Real Estate Consultant
              </span>
            </motion.div>

            {/* Main heading — 2 lines, second line never wraps */}
            <motion.h1
              variants={fadeUp}
              className="font-heading"
              style={{
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-2px',
                maxWidth: 1050,
                color: '#14122b',
                textAlign: 'center',
              }}
            >
              {/* Line 1 */}
              <span style={{ display: 'block', fontSize: 'clamp(2.2rem, 5.5vw, 80px)' }}>
                Authorized Real Estate
              </span>
              {/* Line 2 — flex row, never wraps */}
              <span
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'baseline',
                  gap: 14,
                  flexWrap: 'nowrap',
                  fontSize: 'clamp(2.2rem, 5.5vw, 80px)',
                  marginTop: 4,
                }}
              >
                <span style={{
                  background: 'linear-gradient(90deg, #ff6b00, #ff9a3d)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  whiteSpace: 'nowrap',
                }}>Consultant</span>
                <span style={{ color: '#14122b', whiteSpace: 'nowrap' }}>in</span>
                <span style={{
                  background: 'linear-gradient(90deg, #ff8c2a, #ffb870)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  whiteSpace: 'nowrap',
                }}>Ahmedabad</span>
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="font-body"
              style={{
                fontSize: 22,
                fontWeight: 500,
                lineHeight: 1.7,
                maxWidth: 760,
                color: '#5f6675',
                marginTop: 30,
                marginBottom: 34,
                textAlign: 'center',
              }}
            >
              Helping clients discover premium properties with transparent consultation
              and trusted real estate expertise across Ahmedabad.
            </motion.p>

            {/* Category row */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center flex-wrap"
              style={{ gap: 18, marginTop: 26, marginBottom: 28 }}
            >
              {['Residential', 'Commercial', 'Investment Properties'].map((cat, i, arr) => (
                <span key={cat} className="flex items-center gap-[18px]">
                  <span className="font-body" style={{ fontSize: 14, fontWeight: 500, letterSpacing: '5px', textTransform: 'uppercase', color: '#9a6040' }}>
                    {cat}
                  </span>
                  {i < arr.length - 1 && (
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,107,0,0.35)', display: 'inline-block', flexShrink: 0 }} aria-hidden="true" />
                  )}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center" style={{ gap: 18, marginTop: 10 }}>
              <Link
                to="/properties"
                className="inline-flex items-center gap-2 font-body font-bold text-white transition-all duration-300"
                style={{
                  height: 60,
                  padding: '0 34px',
                  borderRadius: 18,
                  fontSize: 15,
                  background: 'linear-gradient(135deg, #ff6b00, #ff9a3d)',
                  boxShadow: '0 4px 22px rgba(255,107,0,0.28)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 32px rgba(255,107,0,0.38)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 22px rgba(255,107,0,0.28)'; }}
              >
                Explore Properties
                <svg width="13" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                  <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-2 font-body font-bold transition-all duration-300"
                style={{
                  height: 60,
                  padding: '0 32px',
                  borderRadius: 18,
                  fontSize: 15,
                  background: 'white',
                  color: '#ff6b00',
                  border: '1.5px solid rgba(255,107,0,0.28)',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(255,107,0,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,107,0,0.28)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.05)'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Call Now
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-center"
              style={{ marginTop: 55 }}
            >
              {[
                { n: '10+',   l: 'Years Experience' },
                { n: '500+',  l: 'Properties Sold'  },
                { n: '1000+', l: 'Happy Clients'    },
                { n: '100%',  l: 'Transparent'      },
              ].map(({ n, l }, i, arr) => (
                <div key={l} className="flex items-center">
                  <div className="text-center" style={{ padding: '0 35px' }}>
                    <p className="font-heading" style={{ fontSize: 42, fontWeight: 800, lineHeight: 1, color: '#ff6b00' }}>{n}</p>
                    <p className="font-body" style={{ fontSize: 12, fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase', color: '#b07040', marginTop: 7 }}>{l}</p>
                  </div>
                  {i < arr.length - 1 && (
                    <div style={{ width: 1, height: 40, background: 'rgba(255,107,0,0.18)', flexShrink: 0 }} aria-hidden="true" />
                  )}
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </section>

      {/* TICKER */}
      <div
        className="relative overflow-hidden py-5"
        style={{ background: 'linear-gradient(135deg, #FFF7F1 0%, #FFE7CF 100%)', borderTop: '1px solid rgba(255,138,42,0.12)', borderBottom: '1px solid rgba(255,138,42,0.12)' }}
        aria-label="Property categories ticker"
      >
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right, #FFF7F1, transparent)' }} aria-hidden="true" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left, #FFE7CF, transparent)' }} aria-hidden="true" />

        <div className="ticker-track">
          {[
            'Premium Properties', 'Luxury Villas', 'Commercial Spaces', 'Investment Deals',
            'Trusted Consultant', 'Ahmedabad Properties', 'Premium Apartments', 'Verified Listings',
            'Transparent Deals', 'Residential Projects', 'Property Advisory', 'End-to-End Support',
            'Premium Properties', 'Luxury Villas', 'Commercial Spaces', 'Investment Deals',
            'Trusted Consultant', 'Ahmedabad Properties', 'Premium Apartments', 'Verified Listings',
            'Transparent Deals', 'Residential Projects', 'Property Advisory', 'End-to-End Support',
          ].map((item, i) => (
            <span key={i} className="ticker-pill">
              <span className="ticker-dot" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className="section bg-section-warm" aria-label="Services">
        <div className="wrap">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <motion.div variants={fadeUp}>
              <SectionHeader eyebrow="What We Offer" title="Our Real Estate Services"
                subtitle="End-to-end property solutions for buyers, investors, and families across Ahmedabad." center />
            </motion.div>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🏠', title: 'Residential Properties', desc: 'Premium 2BHK, 3BHK & 4BHK apartments and villas in top Ahmedabad locations.', color: '#f97316' },
              { icon: '🏢', title: 'Commercial Spaces',      desc: 'Office spaces, retail units, and commercial plots for business growth.',        color: '#fb923c' },
              { icon: '📈', title: 'Investment Advisory',    desc: 'High-ROI investment opportunities with expert market analysis and guidance.',    color: '#f59e0b' },
              { icon: '🤝', title: 'End-to-End Support',     desc: 'Complete assistance from site visits to documentation and handover.',           color: '#f97316' },
            ].map(({ icon, title, desc, color }) => (
              <motion.div key={title} variants={fadeUp}
                className="bg-white rounded-3xl p-7 transition-all duration-300 group cursor-default"
                style={{ border: '1px solid rgba(253,186,116,0.4)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                whileHover={{ y: -6, boxShadow: `0 12px 36px rgba(249,115,22,0.1), 0 4px 12px rgba(0,0,0,0.05)`, borderColor: `rgba(249,115,22,0.22)` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: `linear-gradient(135deg, ${color}15, ${color}08)`, border: `1px solid ${color}25` }}>
                  {icon}
                </div>
                <h3 className="font-heading font-bold text-ink text-base mb-2 group-hover:text-orange-500 transition-colors duration-200">{title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">{desc}</p>
                <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color }}>
                  Learn More
                  <svg width="12" height="10" viewBox="0 0 14 10" fill="none">
                    <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="section bg-white" aria-label="Featured Properties">
        <div className="wrap">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <motion.div variants={fadeLeft}>
              <SectionHeader eyebrow="Handpicked for You" title="Featured Properties"
                subtitle="A curated selection of premium listings across Ahmedabad." />
            </motion.div>
            <motion.div variants={fadeRight}>
              <Link to="/properties"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-semibold text-sm transition-all duration-200 shrink-0"
                style={{ background: 'rgba(251,146,60,0.07)', border: '1px solid rgba(251,146,60,0.18)', color: '#f97316' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,146,60,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(251,146,60,0.07)'; }}>
                View All Properties
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <div key={i} className="shimmer-box" style={{ height: 320 }} />)}
            </div>
          ) : featured.length === 0 ? (
            <div className="text-center py-16">
              <p className="body-text">No featured properties available right now.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((p, i) => <PropertyCard key={p.id || p._id} property={p} index={i} />)}
            </div>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section className="section bg-section-warm" aria-label="About">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="relative">
              <div className="relative rounded-3xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #fb923c, #f97316, #fdba74)', aspectRatio: '4/3', boxShadow: '0 24px 80px rgba(249,115,22,0.15)' }}>
                <div className="absolute inset-0"
                  style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-white font-heading font-extrabold text-3xl"
                    style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.35)' }}>H</div>
                  <p className="font-heading font-bold text-white text-xl text-center">Hanuvansh Estate Consultant</p>
                  <p className="font-body text-white/75 text-sm text-center">Authorized Real Estate Consultant · Ahmedabad</p>
                  <div style={{ width: 48, height: 2, background: 'rgba(255,255,255,0.5)', borderRadius: 1 }} />
                  <div className="grid grid-cols-3 gap-4 w-full mt-2">
                    {[{ n: '10+', l: 'Years' }, { n: '500+', l: 'Properties' }, { n: '1000+', l: 'Clients' }].map(({ n, l }) => (
                      <div key={l} className="text-center rounded-2xl py-3"
                        style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
                        <p className="font-heading font-extrabold text-white text-lg leading-none">{n}</p>
                        <p className="font-body text-white/70 text-[10px] mt-1 uppercase tracking-wide">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute -bottom-5 -right-5 rounded-2xl px-5 py-4"
                style={{ background: 'white', boxShadow: '0 8px 28px rgba(249,115,22,0.1)', border: '1px solid rgba(253,186,116,0.5)' }}>
                <p className="font-heading font-extrabold text-2xl leading-none" style={{ color: '#f97316' }}>RERA</p>
                <p className="font-body text-xs font-semibold mt-0.5" style={{ color: '#374151' }}>Compliant</p>
              </motion.div>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={fadeUp}>
                <SectionHeader eyebrow="Who We Are" title="Trusted Real Estate Partner in Ahmedabad" />
              </motion.div>
              <motion.p variants={fadeUp} className="body-text mb-5">
                Hanuvansh Estate Consultant is an authorized real estate consultant in Ahmedabad, working closely with reputed developers to offer verified residential and commercial projects.
              </motion.p>
              <motion.p variants={fadeUp} className="body-text mb-8">
                Clients benefit from priority access, transparent pricing, and professional assistance throughout the buying process — from site visits to documentation and handover.
              </motion.p>
              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: '✅', title: 'Authorized Access', desc: 'Direct authorization from leading developers' },
                  { icon: '💰', title: 'Best Pricing',      desc: 'Exclusive pre-launch offers and deals' },
                  { icon: '📋', title: 'Full Transparency', desc: 'No hidden fees, clear documentation' },
                  { icon: '🤝', title: 'End-to-End Support', desc: 'From search to handover' },
                ].map(({ icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-3 p-4 rounded-2xl"
                    style={{ background: 'rgba(251,146,60,0.05)', border: '1px solid rgba(251,146,60,0.12)' }}>
                    <span className="text-xl flex-shrink-0">{icon}</span>
                    <div>
                      <p className="font-body font-bold text-sm" style={{ color: '#1A1A2E' }}>{title}</p>
                      <p className="font-body text-xs mt-0.5" style={{ color: '#6B7280' }}>{desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                <Link to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-sm text-white transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #fb923c, #f97316)', boxShadow: '0 4px 14px rgba(249,115,22,0.22)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(249,115,22,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(249,115,22,0.22)'; }}>
                  Learn More About Us
                </Link>
                <Link to="/founder"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-body font-bold text-sm transition-all duration-200"
                  style={{ background: 'rgba(251,146,60,0.07)', border: '1px solid rgba(251,146,60,0.18)', color: '#f97316' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(251,146,60,0.13)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(251,146,60,0.07)'; }}>
                  Meet the Founder
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-white" aria-label="Testimonials">
        <div className="wrap">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-14">
            <motion.div variants={fadeUp}>
              <SectionHeader eyebrow="Client Stories" title="What Our Clients Say"
                subtitle="Real experiences from families and investors who trusted us with their property journey." center />
            </motion.div>
          </motion.div>

          {testimonials.length > 0 ? (
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div key={t._id || t.id || i} variants={fadeUp}
                  className="bg-white rounded-3xl p-7 flex flex-col gap-4 transition-all duration-300"
                  style={{ border: '1px solid rgba(253,186,116,0.5)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}
                  whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(249,115,22,0.08)', borderColor: 'rgba(249,115,22,0.18)' }}>
                  <div className="font-heading font-extrabold leading-none"
                    style={{ fontSize: '3.5rem', color: 'rgba(251,146,60,0.13)', marginTop: -8 }} aria-hidden="true">
                    &ldquo;
                  </div>
                  <Stars n={t.rating || 5} />
                  <p className="font-body text-[14px] leading-relaxed flex-1 italic -mt-2" style={{ color: '#374151' }}>{t.message}</p>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(254,215,170,0.5)' }}>
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.clientName} className="w-11 h-11 rounded-full object-cover"
                        style={{ border: '2px solid rgba(251,146,60,0.18)' }} />
                    ) : (
                      <div className="w-11 h-11 rounded-full flex items-center justify-center font-heading font-bold text-white text-sm flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg, #fb923c, #f97316)' }}>
                        {t.clientName?.charAt(0)?.toUpperCase() ?? '?'}
                      </div>
                    )}
                    <div>
                      <p className="font-body font-bold text-sm" style={{ color: '#1A1A2E' }}>{t.clientName}</p>
                      {t.clientTitle && <p className="font-body text-xs mt-0.5" style={{ color: '#6B7280' }}>{t.clientTitle}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="body-text">No testimonials available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-28 overflow-hidden" aria-label="Contact CTA"
        style={{ background: 'linear-gradient(135deg, #fb923c 0%, #f97316 40%, #fdba74 75%, #fde68a 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.12), transparent)', filter: 'blur(60px)' }} />

        <div className="wrap relative z-10">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center">
            <motion.div variants={fadeUp} className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-body font-semibold text-[11px] tracking-widest uppercase"
                style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                Start Your Property Journey
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="font-heading font-bold text-white mb-5"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Ready to Find Your Dream Property in Ahmedabad?
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-white/80 text-[15px] leading-relaxed mb-10 max-w-lg mx-auto">
              Get expert guidance, transparent pricing, and end-to-end support. Connect with us today for a free consultation.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-body font-bold text-[15px] transition-all duration-300"
                style={{ background: 'white', color: '#f97316', boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)'; }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Enquiry
              </a>
              <Link to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-body font-bold text-white text-[15px] transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.18)', border: '2px solid rgba(255,255,255,0.4)', backdropFilter: 'blur(8px)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.28)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.18)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="WhatsApp Enquiry">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        <span className="hidden sm:inline">WhatsApp</span>
      </a>

    </div>
  );
}
