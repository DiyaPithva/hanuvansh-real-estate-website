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
      const p = Math.min((ts - start) / duration, 1);l
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
      {subtitle && (
        <p className="body-text"
          style={{
            maxWidth: center ? 700 : 560,
            marginLeft: center ? 'auto' : undefined,
            marginRight: center ? 'auto' : undefined,
            textAlign: center ? 'center' : undefined,
            lineHeight: 1.7,
          }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

const WHATSAPP = 'https://wa.me/919106788526?text=Hello%2C%20I%20am%20interested%20in%20a%20property.';

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

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

      {/* ═══════════════════════════════════════════════════════
          HERO — 2-column layout matching reference image
      ═══════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" aria-label="Hero"
        style={{ background: 'linear-gradient(135deg,#fff8f2 0%,#fff3ea 55%,#ffeedd 100%)', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        {/* BG glow orbs */}
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ width: 680, height: 680, top: '-18%', right: '4%', background: 'radial-gradient(circle,rgba(255,150,50,0.20) 0%,transparent 60%)', filter: 'blur(70px)' }} />
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ width: 420, height: 420, bottom: '4%', left: '-4%', background: 'radial-gradient(circle,rgba(255,107,0,0.11) 0%,transparent 65%)', filter: 'blur(55px)' }} />
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ width: 320, height: 320, top: '35%', left: '36%', background: 'radial-gradient(circle,rgba(255,180,80,0.13) 0%,transparent 65%)', filter: 'blur(45px)' }} />

        {/* Floating dots */}
        {[
          { s: 10, t: '14%', l: '3%',  d: 22, dl: 0 },
          { s: 7,  t: '62%', l: '2%',  d: 28, dl: 4 },
          { s: 11, t: '18%', r: '2%',  d: 24, dl: 2 },
          { s: 8,  t: '74%', r: '3%',  d: 30, dl: 7 },
          { s: 6,  t: '44%', l: '50%', d: 20, dl: 5 },
          { s: 9,  t: '8%',  l: '56%', d: 26, dl: 3 },
        ].map(({ s, t, l, r, d, dl }, i) => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none" aria-hidden="true"
            animate={{ y: [0, -11, 0], opacity: [0.3, 0.65, 0.3] }}
            transition={{ duration: d, repeat: Infinity, ease: 'easeInOut', delay: dl }}
            style={{ width: s, height: s, top: t, left: l, right: r, background: 'rgba(255,120,30,0.28)' }} />
        ))}

        {/* ── Main container ── */}
        <div className="relative z-10 w-full px-4 md:px-8 lg:px-14" style={{ maxWidth: 1380, margin: '0 auto' }}>
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10" style={{ minHeight: 'calc(100vh - 150px)', paddingTop: '80px', paddingBottom: '24px' }}>

            {/* ══════════════ LEFT COLUMN ══════════════ */}
            <motion.div variants={stagger} initial="hidden" animate="visible"
              className="w-full lg:flex-none flex flex-col items-center lg:items-start text-center lg:text-left" style={{ flex: '0 0 46%', maxWidth: 555 }}>

              {/* Badge */}
              <motion.div variants={fadeUp} style={{ marginBottom: 22 }}>
                <span className="inline-flex items-center gap-2 font-body"
                  style={{ fontSize: 12, fontWeight: 600, padding: '8px 16px', borderRadius: 999,
                    border: '1.5px solid rgba(255,107,0,0.25)', background: 'white',
                    color: '#c2410c', letterSpacing: '0.07em', textTransform: 'uppercase',
                    boxShadow: '0 2px 12px rgba(255,107,0,0.10)' }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#ff6b00,#ff9a3d)',
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  </span>
                  Authorized Real Estate Consultant
                </span>
              </motion.div>

              {/* Heading — 3 lines matching reference */}
              <motion.h1 variants={fadeUp} className="font-heading"
                style={{ fontWeight: 800, lineHeight: 1.03, letterSpacing: '-2px', color: '#0d102d', marginBottom: 0 }}>
                <span style={{ display: 'block', fontSize: 'clamp(1.8rem,6vw,68px)' }}>Authorized Real</span>
                <span style={{ display: 'block', fontSize: 'clamp(1.8rem,6vw,68px)' }}>
                  Estate{' '}
                  <span style={{ background: 'linear-gradient(90deg,#ff6b00,#ffb347)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Consultant
                  </span>
                </span>
                <span style={{ display: 'block', fontSize: 'clamp(1.8rem,6vw,68px)' }}>
                  in{' '}
                  <span style={{ background: 'linear-gradient(90deg,#ff6b00,#ffb347)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Ahmedabad
                  </span>
                </span>
              </motion.h1>

              {/* Category row */}
              <motion.div variants={fadeUp} className="flex items-center flex-wrap justify-center lg:justify-start gap-3" style={{ marginTop: 16, marginBottom: 12 }}>
                {['Residential', 'Commercial', 'Investment Properties'].map((cat, i, arr) => (
                  <span key={cat} className="flex items-center gap-3">
                    <span className="font-body" style={{ fontSize: 12, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#4a4a6a' }}>{cat}</span>
                    {i < arr.length - 1 && <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#ff6b00', display: 'inline-block', flexShrink: 0 }} aria-hidden="true" />}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p variants={fadeUp} className="font-body"
                style={{ fontSize: 15.5, lineHeight: 1.65, maxWidth: 430, color: '#5f6675', marginBottom: 6, margin: '0 auto 6px auto' }}>
                Helping clients discover premium properties with transparent consultation and trusted real estate expertise.
              </motion.p>
              <motion.div variants={fadeUp} style={{ width: 42, height: 3, background: 'linear-gradient(90deg,#ff6b00,#ffb347)', borderRadius: 2, marginBottom: 22, margin: '8px auto 22px auto' }} className="lg:mx-0" />

              {/* 3 CTA Buttons */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3">
                {/* WhatsApp */}
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-body font-semibold text-white transition-all duration-300 w-full sm:w-auto"
                  style={{ height: 50, padding: '0 20px', borderRadius: 16, fontSize: 14,
                    background: 'linear-gradient(135deg,#ff6b00,#ff9a3d)',
                    boxShadow: '0 6px 24px rgba(255,107,0,0.35)', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(255,107,0,0.45)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(255,107,0,0.35)'; }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.882l6.198-1.625A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.003-1.368l-.36-.214-3.68.965.981-3.595-.234-.369A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
                  </svg>
                  WhatsApp Enquiry
                </a>
                {/* Explore */}
                <Link to="/properties"
                  className="inline-flex items-center justify-center gap-2 font-body font-semibold transition-all duration-300 w-full sm:w-auto"
                  style={{ height: 50, padding: '0 18px', borderRadius: 16, fontSize: 14,
                    background: 'white', color: '#ff6b00',
                    border: '1.5px solid rgba(255,107,0,0.28)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(255,107,0,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,107,0,0.28)'; }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                  </svg>
                  Explore Properties
                  <svg width="12" height="9" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <path d="M1 5h12M8 1l5 4-5 4" stroke="#ff6b00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                {/* Call */}
                <a href="tel:+919106788526"
                  className="inline-flex items-center justify-center gap-2 font-body font-semibold transition-all duration-300 w-full sm:w-auto"
                  style={{ height: 50, padding: '0 18px', borderRadius: 16, fontSize: 14,
                    background: 'white', color: '#374151',
                    border: '1.5px solid rgba(0,0,0,0.12)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.12)'; }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b00" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  Call Now
                </a>
              </motion.div>

              {/* Client avatars row */}
              <motion.div variants={fadeUp} className="flex items-center justify-center lg:justify-start gap-3" style={{ marginTop: 20 }}>
                <div className="flex">
                  {['#f97316','#fb923c','#fdba74','#fed7aa'].map((bg, i) => (
                    <div key={i} style={{ width: 34, height: 34, borderRadius: '50%',
                      background: `linear-gradient(135deg,${bg},${bg}bb)`,
                      border: '2px solid white', marginLeft: i === 0 ? 0 : -10,
                      zIndex: 4 - i, display: 'flex', alignItems: 'center',
                      justifyContent: 'center', fontSize: 12, fontWeight: 700,
                      color: 'white', position: 'relative' }}>
                      {['A','R','S','M'][i]}
                    </div>
                  ))}
                  <div style={{ width: 34, height: 34, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#ff6b00,#ffb347)',
                    border: '2px solid white', marginLeft: -10,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="font-body font-semibold" style={{ fontSize: 13, color: '#1a1a2e', lineHeight: 1.3 }}>50+ Happy Clients</p>
                  <div className="flex gap-0.5" style={{ marginTop: 3 }}>
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#fb923c" aria-hidden="true">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>

            </motion.div>
            {/* ══════════════ END LEFT ══════════════ */}

            {/* ══════════════ RIGHT COLUMN ══════════════ */}
            <motion.div variants={fadeRight} initial="hidden" animate="visible"
              className="relative flex-1 w-full" style={{ minHeight: 300, position: 'relative' }}>

              {/* Orange glow blob behind image */}
              <div className="absolute pointer-events-none" aria-hidden="true"
                style={{ width: '82%', height: '88%', top: '6%', left: '9%',
                  background: 'radial-gradient(circle,rgba(255,140,40,0.55) 0%,rgba(255,100,0,0.25) 40%,transparent 70%)',
                  filter: 'blur(52px)', borderRadius: '50%' }} />

              {/* Property image */}
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative overflow-hidden"
                style={{ width: '84%', height: 'clamp(260px,40vw,470px)', marginLeft: '8%', borderRadius: 32,
                  border: '2.5px solid rgba(255,255,255,0.88)',
                  boxShadow: '0 24px 80px rgba(255,107,0,0.22),0 8px 32px rgba(0,0,0,0.13)' }}>
                {/* Warm amber base — shows while image loads */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg,#f5c07a 0%,#e8922a 45%,#c96a10 100%)' }} />
                {/* Villa photo — warm evening modern luxury home */}
                <div style={{ position: 'absolute', inset: 0,
                  backgroundImage: 'url(https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=85)',
                  backgroundSize: 'cover', backgroundPosition: 'center' }} />
                {/* Cinematic warm grade overlay — pushes toward reference amber tone */}
                <div style={{ position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg,rgba(255,160,60,0.10) 0%,rgba(200,80,0,0.18) 100%)' }} />
              </motion.div>

              {/* Floating card 1 — top-left: Years of Experience */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0 }}
                className="hidden lg:block"
                style={{ position: 'absolute', top: '8%', left: '2%', zIndex: 10,
                  background: 'white', borderRadius: 20, padding: '14px 18px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.13)', minWidth: 130 }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 6 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#ff6b00,#ffb347)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <span className="font-heading font-bold" style={{ fontSize: 20, color: '#0d102d', lineHeight: 1 }}>2+</span>
                </div>
                <p className="font-body" style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.4 }}>Years of<br/>Experience</p>
                <svg width="72" height="18" viewBox="0 0 80 20" fill="none" style={{ marginTop: 8 }} aria-hidden="true">
                  <path d="M0 10 Q10 2 20 10 Q30 18 40 10 Q50 2 60 10 Q70 18 80 10" stroke="#ff9a3d" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </motion.div>

              {/* Floating card 2 — top-right: Happy Clients */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="hidden lg:block"
                style={{ position: 'absolute', top: '5%', right: '-4%', zIndex: 10,
                  background: 'white', borderRadius: 20, padding: '14px 18px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.13)', minWidth: 155 }}>
                <div className="flex items-center justify-between" style={{ marginBottom: 8 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#ff6b00,#ffb347)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
                    </svg>
                  </div>
                  <span className="font-heading font-bold" style={{ fontSize: 18, color: '#0d102d' }}>50+</span>
                </div>
                <p className="font-body font-semibold" style={{ fontSize: 11, color: '#6b7280' }}>Happy Clients</p>
                <div className="flex items-center" style={{ marginTop: 8 }}>
                  {['#f97316','#fb923c','#fdba74'].map((bg, i) => (
                    <div key={i} style={{ width: 22, height: 22, borderRadius: '50%',
                      background: `linear-gradient(135deg,${bg},${bg}cc)`,
                      border: '2px solid white', marginLeft: i === 0 ? 0 : -6,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 8, fontWeight: 700, color: 'white' }}>
                      {['A','R','S'][i]}
                    </div>
                  ))}
                  <div style={{ width: 22, height: 22, borderRadius: '50%',
                    background: 'linear-gradient(135deg,#ff6b00,#ffb347)',
                    border: '2px solid white', marginLeft: -6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Floating card 3 — bottom-left: Transparent Process */}
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="hidden lg:block"
                style={{ position: 'absolute', bottom: '14%', left: '3%', zIndex: 10,
                  background: 'white', borderRadius: 20, padding: '16px 18px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.13)', minWidth: 140 }}>
                <div style={{ width: 38, height: 38, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#ff6b00,#ffb347)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <p className="font-heading font-bold" style={{ fontSize: 20, color: '#ff6b00', lineHeight: 1 }}>100%</p>
                <p className="font-body" style={{ fontSize: 11, color: '#6b7280', marginTop: 4, lineHeight: 1.4 }}>Transparent<br/>Process</p>
              </motion.div>

              {/* Floating card 4 — bottom-right: Residential Projects */}
              <motion.div animate={{ y: [0, -9, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="hidden lg:block"
                style={{ position: 'absolute', bottom: '9%', right: '-4%', zIndex: 10,
                  background: 'white', borderRadius: 20, padding: '16px 18px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.13)', minWidth: 140 }}>
                <div style={{ width: 38, height: 38, borderRadius: 12,
                  background: 'linear-gradient(135deg,#ff6b00,#ffb347)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <p className="font-heading font-bold" style={{ fontSize: 20, color: '#0d102d', lineHeight: 1 }}>200+</p>
                <p className="font-body" style={{ fontSize: 11, color: '#6b7280', marginTop: 4, lineHeight: 1.4 }}>Residential<br/>Projects</p>
              </motion.div>

            </motion.div>
            {/* ══════════════ END RIGHT ══════════════ */}

          </div>{/* end 2-col flex */}

          {/* ══════════════ STATS BAR ══════════════ */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0"
            style={{ margin: '24px 0 32px 0', background: 'white', borderRadius: 24,
              boxShadow: '0 8px 40px rgba(0,0,0,0.08)', padding: '18px 24px',
              border: '1px solid rgba(255,107,0,0.07)' }}>
            {[
              { icon: '🏢', n: '500+',  l: 'Properties Sold'      },
              { icon: '🏠', n: '200+',  l: 'Residential Projects' },
              { icon: '📈', n: '150+',  l: 'Investment Deals'     },
              { icon: '👥', n: '50+',   l: 'Happy Clients'        },
            ].map(({ icon, n, l }, i, arr) => (
              <div key={l} className="flex items-center gap-3">
                <div style={{ width: 44, height: 44, borderRadius: '50%',
                  background: 'rgba(255,107,0,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 20, flexShrink: 0 }}>{icon}</div>
                <div>
                  <p className="font-heading font-bold" style={{ fontSize: 26, lineHeight: 1, color: '#0d102d' }}>{n}</p>
                  <p className="font-body" style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{l}</p>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden lg:block" style={{ width: 1, height: 40, background: 'rgba(0,0,0,0.08)', marginLeft: 20, flexShrink: 0 }} aria-hidden="true" />
                )}
              </div>
            ))}
          </motion.div>

        </div>{/* end max-width container */}

        {/* Fixed floating WhatsApp + Call buttons */}
        <div style={{ position: 'fixed', bottom: 28, right: 24, zIndex: 50, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <motion.a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            className="w-11 h-11 lg:w-[50px] lg:h-[50px]"
            style={{ borderRadius: '50%', background: '#25d366',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(37,211,102,0.45)' }} aria-label="WhatsApp">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.845L.057 23.882l6.198-1.625A11.93 11.93 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.003-1.368l-.36-.214-3.68.965.981-3.595-.234-.369A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
            </svg>
          </motion.a>
          <motion.a href="tel:+919106788526"
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
            className="w-11 h-11 lg:w-[50px] lg:h-[50px]"
            style={{ borderRadius: '50%',
              background: 'linear-gradient(135deg,#ff6b00,#ff9a3d)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 20px rgba(255,107,0,0.45)' }} aria-label="Call Now">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
          </motion.a>
        </div>

      </section>
      {/* ═══════════════════════════════════════════════════════
          END HERO
      ═══════════════════════════════════════════════════════ */}

      {/* TICKER */}
      <div className="relative overflow-hidden py-5"
        style={{ background: 'linear-gradient(135deg,#FFF7F1 0%,#FFE7CF 100%)', borderTop: '1px solid rgba(255,138,42,0.12)', borderBottom: '1px solid rgba(255,138,42,0.12)' }}
        aria-label="Property categories ticker">
        <div className="absolute left-0 top-0 bottom-0 w-20 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to right,#FFF7F1,transparent)' }} aria-hidden="true" />
        <div className="absolute right-0 top-0 bottom-0 w-20 pointer-events-none z-10"
          style={{ background: 'linear-gradient(to left,#FFE7CF,transparent)' }} aria-hidden="true" />
        <div className="ticker-track">
          {[
            'Premium Properties','Luxury Villas','Commercial Spaces','Investment Deals',
            'Trusted Consultant','Ahmedabad Properties','Premium Apartments','Verified Listings',
            'Transparent Deals','Residential Projects','Property Advisory','End-to-End Support',
            'Premium Properties','Luxury Villas','Commercial Spaces','Investment Deals',
            'Trusted Consultant','Ahmedabad Properties','Premium Apartments','Verified Listings',
            'Transparent Deals','Residential Projects','Property Advisory','End-to-End Support',
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
                whileHover={{ y: -6, boxShadow: `0 12px 36px rgba(249,115,22,0.1),0 4px 12px rgba(0,0,0,0.05)`, borderColor: `rgba(249,115,22,0.22)` }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5"
                  style={{ background: `linear-gradient(135deg,${color}15,${color}08)`, border: `1px solid ${color}25` }}>
                  {icon}
                </div>
                <h3 className="font-heading font-bold text-ink text-base mb-2 group-hover:text-orange-500 transition-colors duration-200">{title}</h3>
                <p className="font-body text-muted text-sm leading-relaxed">{desc}</p>
                <div className="mt-4 flex items-center gap-1 text-[12px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ color }}>
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
              {[1,2,3].map(i => <div key={i} className="shimmer-box" style={{ height: 320 }} />)}
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
            <motion.div variants={fadeLeft} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
              <div className="relative rounded-3xl overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#fb923c,#f97316,#fdba74)', aspectRatio: '4/3', boxShadow: '0 24px 80px rgba(249,115,22,0.15)' }}>
                <div className="absolute inset-0"
                  style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.06) 1px,transparent 1px)', backgroundSize: '32px 32px' }} />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">
                  <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-white font-heading font-extrabold text-3xl"
                    style={{ background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.35)' }}>H</div>
                  <p className="font-heading font-bold text-white text-xl text-center">Hanuvansh Estate Consultant</p>
                  <p className="font-body text-white/75 text-sm text-center">Authorized Real Estate Consultant · Ahmedabad</p>
                  <div style={{ width: 48, height: 2, background: 'rgba(255,255,255,0.5)', borderRadius: 1 }} />
                  <div className="grid grid-cols-3 gap-4 w-full mt-2">
                    {[{ n: '2+', l: 'Years' },{ n: '500+', l: 'Properties' },{ n: '50+', l: 'Clients' }].map(({ n, l }) => (
                      <div key={l} className="text-center rounded-2xl py-3"
                        style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
                        <p className="font-heading font-extrabold text-white text-lg leading-none">{n}</p>
                        <p className="font-body text-white/70 text-[10px] mt-1 uppercase tracking-wide">{l}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <motion.div animate={{ y: [0,-8,0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
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
                  style={{ background: 'linear-gradient(135deg,#fb923c,#f97316)', boxShadow: '0 4px 14px rgba(249,115,22,0.22)' }}
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
                    style={{ fontSize: '3.5rem', color: 'rgba(251,146,60,0.13)', marginTop: -8 }} aria-hidden="true">&ldquo;</div>
                  <Stars n={t.rating || 5} />
                  <p className="font-body text-[14px] leading-relaxed flex-1 italic -mt-2" style={{ color: '#374151' }}>{t.message}</p>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(254,215,170,0.5)' }}>
                    {t.avatar ? (
                      <img src={t.avatar} alt={t.clientName} className="w-11 h-11 rounded-full object-cover"
                        style={{ border: '2px solid rgba(251,146,60,0.18)' }} />
                    ) : (
                      <div className="w-11 h-11 rounded-full flex items-center justify-center font-heading font-bold text-white text-sm flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg,#fb923c,#f97316)' }}>
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
        style={{ background: 'linear-gradient(135deg,#fb923c 0%,#f97316 40%,#fdba74 75%,#fde68a 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(circle,rgba(255,255,255,0.07) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(circle,rgba(255,255,255,0.12),transparent)', filter: 'blur(60px)' }} />
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
              style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
              Ready to Find Your Dream Property in Ahmedabad?
            </motion.h2>
            <motion.p variants={fadeUp} className="font-body text-white/80 text-[15px] leading-relaxed mb-8">
              Connect with us today for expert guidance, verified listings, and end-to-end support.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-body font-bold text-sm transition-all duration-300"
                style={{ background: 'white', color: '#f97316', boxShadow: '0 4px 20px rgba(0,0,0,0.12)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,0.18)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)'; }}>
                WhatsApp Us
              </a>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-body font-bold text-sm text-white transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.5)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}>
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
