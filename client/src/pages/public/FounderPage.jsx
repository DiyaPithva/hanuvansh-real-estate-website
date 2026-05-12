import { motion } from 'framer-motion';

import { sectionVariants, heroVariants, containerVariants } from '../../styles/animations.js';

// Feature: hanuvansh-mern-estate
// FounderPage: dedicated profile page for JAY MEHTA, Founder & Principal Consultant.
// Includes animated profile layout, achievements, vision statement, and connect section.
// Requirements: 11.1, 11.2, 11.3

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
const ACHIEVEMENTS = [
  {
    id: 'founded',
    year: '2014',
    title: 'Founded Hanuvansh Estate Consultant',
    description:
      'Established the firm with a vision to bring integrity and transparency to India\u2019s premium real estate market.',
  },
  {
    id: 'transactions',
    year: '500+',
    title: 'Successful Property Transactions',
    description:
      'Facilitated over 500 property deals spanning luxury villas, premium apartments, commercial spaces, and strategic land parcels.',
  },
  {
    id: 'clients',
    year: '1,000+',
    title: 'Families & Investors Served',
    description:
      'Built lasting relationships with more than a thousand families and investors across India\u2019s most sought-after locations.',
  },
  {
    id: 'decade',
    year: '10+',
    title: 'Years of Market Expertise',
    description:
      'A decade of deep market knowledge, trend analysis, and on-ground experience in India\u2019s evolving real estate landscape.',
  },
  {
    id: 'recognition',
    year: '2022',
    title: 'Regional Excellence in Real Estate',
    description:
      'Recognised as one of Gujarat\u2019s most trusted boutique real estate consultancies for consistent client satisfaction.',
  },
  {
    id: 'portfolio',
    year: '\u20b9500Cr+',
    title: 'Portfolio Value Managed',
    description:
      'Curated and managed a property portfolio exceeding \u20b9500 crore in combined transaction value across residential and commercial segments.',
  },
];

const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: '#',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: '#',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
        aria-hidden="true"
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
];

// ---------------------------------------------------------------------------
// AchievementCard
// ---------------------------------------------------------------------------
function AchievementCard({ year, title, description }) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="flex gap-5 p-6 rounded-xl bg-bg-card border border-white/10 hover:border-gold/30 transition-colors duration-300"
    >
      {/* Year / stat badge */}
      <div className="flex-shrink-0">
        <div
          className="w-16 h-16 rounded-lg flex items-center justify-center text-center"
          style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.3)' }}
        >
          <span className="font-heading font-bold text-gold text-sm leading-tight">{year}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1">
        <h3 className="font-heading text-base font-bold text-text-primary">{title}</h3>
        <p className="text-text-muted text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// FounderPage
// ---------------------------------------------------------------------------
export default function FounderPage() {
  return (
    <main className="bg-bg-primary text-text-primary font-body">
      {/* ================================================================
          1. PREMIUM PROFILE HERO
      ================================================================ */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 px-6"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)',
        }}
        aria-label="Founder Profile"
      >
        {/* Decorative radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        {/* Decorative corner accents */}
        <div
          className="absolute top-0 left-0 w-40 h-40 pointer-events-none opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.5) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 right-0 w-40 h-40 pointer-events-none opacity-20"
          style={{
            background: 'linear-gradient(315deg, rgba(255,107,0,0.5) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row items-center gap-14">
            {/* Profile image placeholder */}
            <motion.div
              variants={heroVariants}
              initial="initial"
              animate="animate"
              className="flex-shrink-0 flex flex-col items-center gap-6"
            >
              {/* Avatar */}
              <div
                className="w-48 h-48 rounded-full flex items-center justify-center text-5xl font-heading font-bold text-gold"
                style={{
                  background:
                    'radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 100%)',
                  border: '2px solid rgba(212,175,55,0.4)',
                  boxShadow: '0 0 60px rgba(212,175,55,0.15)',
                }}
                aria-label="Jay Mehta profile initials"
              >
                JM
              </div>
            </motion.div>

            {/* Profile text */}
            <motion.div
              variants={heroVariants}
              initial="initial"
              animate="animate"
              className="flex flex-col items-center lg:items-start text-center lg:text-left gap-5 max-w-2xl"
            >
              {/* Label */}
              <div className="flex items-center gap-3">
                <div className="h-px w-10 bg-gold opacity-60" aria-hidden="true" />
                <span className="text-gold text-xs tracking-[0.3em] uppercase font-semibold">
                  Founder &amp; Principal Consultant
                </span>
                <div className="h-px w-10 bg-gold opacity-60" aria-hidden="true" />
              </div>

              {/* Name */}
              <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl font-bold text-text-primary leading-none tracking-wide">
                JAY <span className="text-gold">MEHTA</span>
              </h1>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-accent opacity-50" aria-hidden="true" />
                <div className="w-1.5 h-1.5 rounded-full bg-accent opacity-70" aria-hidden="true" />
                <div className="h-px w-8 bg-accent opacity-50" aria-hidden="true" />
              </div>

              {/* Biography */}
              <p className="text-text-muted text-base leading-relaxed">
                With over a decade of experience in India&apos;s premium real estate market, Jay Mehta
                founded Hanuvansh Estate Consultant in 2014 on a singular belief: every client
                deserves honest, expert guidance &mdash; not just a transaction.
              </p>
              <p className="text-text-muted text-base leading-relaxed">
                A native of Gujarat, Jay built his expertise through years of on-ground market
                research, client advisory, and portfolio management. His approach combines deep
                analytical rigour with a deeply personal commitment to each client&apos;s long-term
                financial wellbeing.
              </p>
              <p className="text-text-muted text-base leading-relaxed">
                Under his leadership, Hanuvansh has grown from a boutique consultancy into one
                of the region&apos;s most trusted real estate firms &mdash; facilitating over 500 transactions
                and serving more than 1,000 families and investors across India.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-8 mt-2">
                {[
                  { value: '10+', label: 'Years Experience' },
                  { value: '500+', label: 'Transactions' },
                  { value: '1,000+', label: 'Clients Served' },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center lg:items-start">
                    <span className="font-heading text-2xl font-bold text-gold">{stat.value}</span>
                    <span className="text-text-muted text-xs tracking-wide uppercase">{stat.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================
          2. PROFESSIONAL ACHIEVEMENTS SECTION
      ================================================================ */}
      <section
        className="py-20 px-6 bg-bg-secondary"
        aria-label="Professional Achievements"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Milestones
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Professional <span className="text-gold">Achievements</span>
            </h2>
            <div className="h-px w-20 bg-gold mx-auto opacity-60" />
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {ACHIEVEMENTS.map((item) => (
              <AchievementCard
                key={item.id}
                year={item.year}
                title={item.title}
                description={item.description}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================================================================
          3. VISION STATEMENT SECTION
      ================================================================ */}
      <section
        className="relative py-24 px-6 overflow-hidden"
        aria-label="Vision and Philosophy"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a00 50%, #0a0a0a 100%)',
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,107,0,0.06) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-gold text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              The Guiding Principle
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Vision &amp; <span className="text-accent">Philosophy</span>
            </h2>
            <div className="h-px w-20 bg-accent mx-auto opacity-60" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision card */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-bg-card border border-white/10 rounded-xl p-8 hover:border-gold/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{
                    background: 'rgba(212,175,55,0.15)',
                    border: '1px solid rgba(212,175,55,0.3)',
                  }}
                  aria-hidden="true"
                >
                  🌟
                </div>
                <h3 className="font-heading text-xl font-bold text-gold">My Vision</h3>
              </div>
              <p className="text-text-muted leading-relaxed mb-4">
                I envision a real estate industry where every client &mdash; whether a first-time
                homebuyer or a seasoned investor &mdash; receives the same level of honest, expert
                guidance that was once reserved for the privileged few.
              </p>
              <p className="text-text-muted leading-relaxed">
                My goal is to make Hanuvansh Estate Consultant synonymous with trust across
                India &mdash; a firm where integrity is not a differentiator, but a baseline.
              </p>
            </motion.div>

            {/* Philosophy card */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-bg-card border border-white/10 rounded-xl p-8 hover:border-accent/30 transition-colors duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
                  style={{
                    background: 'rgba(255,107,0,0.15)',
                    border: '1px solid rgba(255,107,0,0.3)',
                  }}
                  aria-hidden="true"
                >
                  💡
                </div>
                <h3 className="font-heading text-xl font-bold text-accent">Personal Philosophy</h3>
              </div>
              <p className="text-text-muted leading-relaxed mb-4">
                Real estate is not about square footage or price per square foot &mdash; it is about
                the life a property enables. I approach every client relationship by first
                understanding their aspirations, then working backwards to find the property
                that best serves those aspirations.
              </p>
              <p className="text-text-muted leading-relaxed">
                Profits follow purpose. When you genuinely serve your clients&apos; best interests,
                business success is a natural consequence &mdash; not the goal.
              </p>
            </motion.div>

            {/* Quote / manifesto */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 bg-bg-card border border-gold/20 rounded-xl p-10 text-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(26,26,26,1) 0%, rgba(26,16,0,0.8) 100%)',
              }}
            >
              {/* Opening quote mark */}
              <div
                className="font-heading text-7xl text-gold opacity-30 leading-none mb-2 select-none"
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <blockquote className="font-heading text-xl sm:text-2xl text-text-primary font-semibold leading-relaxed max-w-3xl mx-auto mb-6 italic">
                Beyond transactions &mdash; we create timeless property wealth. Every property we
                recommend is one I would be proud to recommend to my own family.
              </blockquote>
              <cite className="not-italic">
                <span className="text-gold font-semibold tracking-wide">&mdash; Jay Mehta</span>
                <span className="text-text-muted text-sm ml-2">Founder, Hanuvansh Estate Consultant</span>
              </cite>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================
          4. CONNECT SECTION
      ================================================================ */}
      <section
        className="py-20 px-6 bg-bg-secondary"
        aria-label="Connect with Jay Mehta"
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-accent text-xs tracking-[0.3em] uppercase font-semibold mb-3">
              Get in Touch
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-text-primary mb-4">
              Connect with <span className="text-gold">Jay</span>
            </h2>
            <div className="h-px w-20 bg-gold mx-auto opacity-60 mb-6" />
            <p className="text-text-muted text-base leading-relaxed max-w-xl mx-auto">
              Whether you have a property question, an investment idea, or simply want to
              explore your options &mdash; Jay is always open to a conversation.
            </p>
          </motion.div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col items-center gap-8"
          >
            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919106788526"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-bg-secondary text-white"
              style={{
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
              }}
              aria-label="Chat with Jay Mehta on WhatsApp"
            >
              {/* WhatsApp icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>

            {/* Social links divider */}
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-white/10" aria-hidden="true" />
              <span className="text-text-muted text-xs tracking-[0.2em] uppercase">
                Follow Jay
              </span>
              <div className="h-px w-12 bg-white/10" aria-hidden="true" />
            </div>

            {/* Social icon buttons */}
            <div className="flex items-center gap-4" role="list" aria-label="Social media profiles">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  role="listitem"
                  aria-label={`Jay Mehta on ${social.label}`}
                  className="w-12 h-12 rounded-full flex items-center justify-center text-text-muted hover:text-gold transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gold/50"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
