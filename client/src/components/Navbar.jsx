/**
 * Navbar — modern saffron/orange branded navigation.
 * White background, orange accents, rounded CTA, mobile drawer.
 */
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

const LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'Properties', to: '/properties' },
  { label: 'About',      to: '/about' },
  { label: 'Founder',    to: '/founder' },
  { label: 'Contact',    to: '/contact' },
];

const WHATSAPP = 'https://wa.me/919876543210?text=Hello%2C%20I%20am%20interested%20in%20a%20property.';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: scrolled
            ? '0 1px 0 rgba(254,215,170,0.5), 0 4px 24px rgba(0,0,0,0.06)'
            : '0 1px 0 rgba(254,215,170,0.35)',
        }}
      >
        <div className="max-w-site mx-auto px-5 lg:px-8">
          <div className="flex items-center justify-between h-[60px]">

            {/* Brand */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-heading font-bold text-sm"
                style={{ background: 'linear-gradient(135deg, #fb923c, #f97316)', boxShadow: '0 2px 8px rgba(249,115,22,0.22)' }}
              >
                H
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-ink text-[14.5px] tracking-tight">
                  Hanuvansh
                </span>
                <span className="font-body text-[8.5px] font-semibold tracking-widest uppercase mt-0.5" style={{ color: '#f97316' }}>
                  Estate Consultant
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {LINKS.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className="relative px-3.5 py-2 rounded-lg font-body text-[13px] font-medium transition-all duration-200"
                  style={({ isActive }) => ({
                    color: isActive ? '#f97316' : '#4B5563',
                    background: isActive ? 'rgba(249,115,22,0.07)' : 'transparent',
                    fontWeight: isActive ? '600' : '500',
                  })}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.getAttribute('aria-current')) {
                      e.currentTarget.style.color = '#f97316';
                      e.currentTarget.style.background = 'rgba(249,115,22,0.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.getAttribute('aria-current')) {
                      e.currentTarget.style.color = '#4B5563';
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  {label}
                </NavLink>
              ))}
            </nav>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2.5 shrink-0">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-1.5 font-body text-[12.5px] font-medium text-ink-3 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-orange-50"
                style={{ color: '#4B5563' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#f97316'; }}
                onMouseLeave={e => { e.currentTarget.style.color = '#4B5563'; }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
                Call Now
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-body font-semibold text-[12.5px] transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #fb923c, #f97316)',
                  boxShadow: '0 3px 12px rgba(249,115,22,0.22)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 5px 20px rgba(249,115,22,0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 3px 12px rgba(249,115,22,0.22)';
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-ink-3 hover:bg-surface-2 transition-colors"
              onClick={() => setOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-[5px]">
                <span className={`block h-0.5 rounded bg-ink transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`} />
                <span className={`block h-0.5 rounded bg-ink transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 rounded bg-ink transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-ink/20 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.nav
              className="absolute top-0 right-0 bottom-0 w-72 flex flex-col pt-20 px-6 pb-8 shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.98)',
                backdropFilter: 'blur(20px)',
                borderLeft: '1px solid rgba(254,215,170,0.5)',
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
            >
              {LINKS.map(({ label, to }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `font-body text-base font-medium py-3.5 border-b border-surface-3 transition-colors duration-200 ${
                      isActive ? 'text-saffron' : 'text-ink-3 hover:text-saffron'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #fb923c, #f97316)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Enquiry
              </a>
              <a href="tel:+919876543210"
                className="mt-3 flex items-center justify-center gap-2 py-3 rounded-xl text-saffron font-semibold text-sm border-2 border-saffron-4 hover:border-saffron transition-colors"
                style={{ borderColor: 'rgba(249,115,22,0.28)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.55)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(249,115,22,0.28)'; }}>
                Call Now
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
