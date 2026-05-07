/**
 * Navbar — premium luxury navigation bar.
 * Thin, centered links, blur glass background, WhatsApp CTA.
 * Requirements: 8.3, 17.3, 17.8
 */

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Founder',    to: '/founder' },
  { label: 'Properties', to: '/properties' },
  { label: 'Contact',    to: '/contact' },
];

const WHATSAPP_URL =
  'https://wa.me/919999999999?text=Hello%2C%20I%20am%20interested%20in%20a%20property.';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (to) =>
    to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'background 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease',
        background: scrolled
          ? 'rgba(250,248,244,0.96)'
          : 'rgba(250,248,244,0.75)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: scrolled
          ? '1px solid rgba(184,134,11,0.18)'
          : '1px solid rgba(224,217,206,0.5)',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <div className="max-w-site mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Brand */}
          <Link
            to="/"
            className="font-heading font-bold tracking-widest text-ink"
            style={{ fontSize: '1rem', letterSpacing: '0.18em' }}
          >
            HANUVANSH
            <span
              style={{
                display: 'inline-block',
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: '#B8860B',
                marginLeft: 5,
                marginBottom: 2,
                verticalAlign: 'middle',
              }}
            />
          </Link>

          {/* Desktop — centered links */}
          <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="relative font-body text-[12.5px] tracking-widest uppercase transition-colors duration-200"
                style={{ color: isActive(to) ? '#B8860B' : '#454545' }}
                onMouseEnter={(e) => {
                  if (!isActive(to)) e.currentTarget.style.color = '#141414';
                }}
                onMouseLeave={(e) => {
                  if (!isActive(to)) e.currentTarget.style.color = '#454545';
                }}
              >
                {label}
                {isActive(to) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, #B8860B, #D4A017)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop — WhatsApp CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 btn-accent"
            style={{ borderRadius: 4, fontSize: 11, paddingTop: 8, paddingBottom: 8, paddingLeft: 16, paddingRight: 16 }}
          >
            {/* WhatsApp icon */}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] focus:outline-none"
            onClick={() => setMenuOpen((p) => !p)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              className="block w-5 h-px rounded"
              style={{ background: '#141414' }}
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
            <motion.span
              className="block w-5 h-px rounded"
              style={{ background: '#141414' }}
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.18 }}
            />
            <motion.span
              className="block w-5 h-px rounded"
              style={{ background: '#141414' }}
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden"
            style={{
              background: 'rgba(250,248,244,0.98)',
              borderTop: '1px solid rgba(224,217,206,0.6)',
            }}
          >
            <div className="px-5 py-5 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="font-body text-sm tracking-widest uppercase py-3 border-b transition-colors duration-200"
                  style={{
                    color: isActive(to) ? '#B8860B' : '#454545',
                    borderColor: 'rgba(224,217,206,0.5)',
                  }}
                >
                  {label}
                </Link>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 btn-accent text-center"
                style={{ borderRadius: 4, fontSize: 12 }}
              >
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
