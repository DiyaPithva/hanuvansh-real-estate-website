import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { heroVariants, sectionVariants } from '../../styles/animations.js';

// Feature: hanuvansh-mern-estate
// NotFoundPage: luxury 404 error page with animated entrance and home link.
// Requirements: 8.5

export default function NotFoundPage() {
  return (
    <main
      className="min-h-screen bg-bg-primary text-text-primary font-body flex items-center justify-center overflow-hidden relative"
      aria-label="Page Not Found"
    >
      {/* ── Decorative radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Top-left corner accent ── */}
      <div
        className="absolute top-0 left-0 w-40 h-40 pointer-events-none opacity-20"
        style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.5) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* ── Bottom-right corner accent ── */}
      <div
        className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none opacity-20"
        style={{
          background: 'linear-gradient(315deg, rgba(255,107,0,0.4) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">

        {/* 404 large number */}
        <motion.div
          variants={heroVariants}
          initial="initial"
          animate="animate"
          className="mb-6"
        >
          <span
            className="font-heading font-bold leading-none select-none"
            style={{
              fontSize: 'clamp(7rem, 20vw, 14rem)',
              background: 'linear-gradient(135deg, #D4AF37 0%, #FF6B00 60%, #D4AF37 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              opacity: 0.9,
            }}
            aria-hidden="true"
          >
            404
          </span>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-4 mb-8"
        >
          <div className="h-px w-16 bg-gold opacity-50" />
          <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">
            Page Not Found
          </span>
          <div className="h-px w-16 bg-gold opacity-50" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4"
        >
          This Page Has{' '}
          <span className="text-gold">Left the Building</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="text-text-muted text-base leading-relaxed mb-10 max-w-md mx-auto"
        >
          The page you are looking for may have been moved, renamed, or no longer exists.
          Let us guide you back to where the finest properties await.
        </motion.p>

        {/* CTA — back to home */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold-light text-bg-primary font-bold px-10 py-4 rounded-lg transition-colors duration-200 text-sm tracking-wide uppercase"
          >
            ← Return to Home
          </Link>
        </motion.div>

        {/* Bottom decorative dots */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center gap-3 mt-12"
          aria-hidden="true"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-gold opacity-40" />
          <div className="w-1 h-1 rounded-full bg-gold opacity-25" />
          <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-40" />
          <div className="w-1 h-1 rounded-full bg-gold opacity-25" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold opacity-40" />
        </motion.div>
      </div>
    </main>
  );
}
