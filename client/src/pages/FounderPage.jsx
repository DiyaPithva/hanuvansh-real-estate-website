import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fade = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const ACHIEVEMENTS = [
  {
    year: '2013',
    title: 'Founded Hanuvansh Estate Consultant',
    desc: 'Established the firm with a vision to bring transparency and genuine expertise to Ahmedabad\'s premium real estate market.',
  },
  {
    year: '2016',
    title: '100 Properties Milestone',
    desc: 'Crossed the landmark of 100 successful property transactions, cementing a reputation for reliability and client-first service.',
  },
  {
    year: '2019',
    title: 'Expanded to Commercial Real Estate',
    desc: 'Launched a dedicated commercial division, advising businesses on Grade-A office spaces and retail properties across Ahmedabad.',
  },
  {
    year: '2023',
    title: '₹500 Crore in Transactions',
    desc: 'Surpassed ₹500 crore in total transaction value — a testament to the trust clients place in Hanuvansh Estate Consultant.',
  },
];

const FOUNDER_STATS = [
  { value: '10+',  label: 'Years Experience' },
  { value: '500+', label: 'Deals Closed' },
  { value: '1000+', label: 'Clients Served' },
  { value: '₹500Cr+', label: 'Transaction Value' },
];

export default function FounderPage() {
  const waLink = `https://wa.me/919876543210?text=${encodeURIComponent('Hi Jay, I\'d like to connect regarding a property enquiry.')}`;

  return (
    <div className="bg-cream">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-border pt-24 pb-10">
        <div className="wrap">
          <nav className="flex items-center gap-2 font-body text-xs text-muted mb-5">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="text-border">›</span>
            <Link to="/about" className="hover:text-accent transition-colors">About</Link>
            <span className="text-border">›</span>
            <span className="text-ink-3">Our Founder</span>
          </nav>
          <motion.span variants={fade} initial="hidden" animate="visible" className="eyebrow">
            Our Founder
          </motion.span>
          <motion.h1
            variants={fade}
            initial="hidden"
            animate="visible"
            className="h1 mt-1"
          >
            Jay Mehta
          </motion.h1>
        </div>
      </div>

      {/* ── Profile Section ─────────────────────────────────────────── */}
      <section className="section bg-cream">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Monogram + Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center lg:items-start"
            >
              {/* Monogram */}
              <div className="relative mb-10">
                <div
                  className="w-56 h-56 rounded-full border border-accent/30 flex items-center justify-center"
                  style={{ background: 'radial-gradient(circle, rgba(184,134,11,0.07) 0%, rgba(250,249,247,0) 70%)' }}
                >
                  <span className="font-heading font-bold text-accent text-7xl select-none">JM</span>
                </div>
                {/* Decorative rings */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 border border-accent/15 rounded-full pointer-events-none" />
                <div className="absolute -top-3 -left-3 w-12 h-12 border border-accent/10 rounded-full pointer-events-none" />
              </div>

              {/* Title */}
              <div className="text-center lg:text-left mb-8">
                <div className="font-heading font-semibold text-ink text-xl mb-1">Jay Mehta</div>
                <div className="font-body text-accent text-sm tracking-wide">Founder & Principal Consultant</div>
                <div className="font-body text-muted text-xs mt-1">Hanuvansh Estate Consultant, Ahmedabad</div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                {FOUNDER_STATS.map(({ value, label }) => (
                  <div key={label} className="bg-white border border-border rounded-sm p-4 text-center">
                    <div className="font-heading font-bold text-accent text-xl mb-1">{value}</div>
                    <div className="font-body text-xs text-muted uppercase tracking-wide leading-tight">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right: Bio */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span variants={fade} className="eyebrow">Biography</motion.span>
              <motion.h2 variants={fade} className="h2">
                A Visionary in Real Estate
              </motion.h2>
              <motion.span variants={fade} className="rule" />
              <motion.p variants={fade} className="body-text mb-5">
                Jay Mehta founded Hanuvansh Estate Consultant in 2013 with a clear purpose: to bring genuine expertise, transparency, and a client-first philosophy to Ahmedabad's premium real estate market. What began as a boutique consultancy has grown into one of the city's most respected names in luxury property.
              </motion.p>
              <motion.p variants={fade} className="body-text mb-5">
                With a background in finance and a deep passion for architecture, Jay brings a unique perspective to every property transaction. He understands that buying or selling a home is rarely just a financial decision — it is an emotional one, tied to family, aspiration, and legacy. This understanding shapes every interaction at Hanuvansh.
              </motion.p>
              <motion.p variants={fade} className="body-text">
                Over the past decade, Jay has personally guided over 500 transactions across residential, commercial, and investment properties. His network spans developers, architects, legal experts, and financial advisors — ensuring clients receive holistic guidance at every stage of their property journey. His philosophy is simple: do right by the client, and the business will take care of itself.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Achievements ────────────────────────────────────────────── */}
      <section className="section bg-white border-y border-border">
        <div className="wrap">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.span variants={fade} className="eyebrow">Milestones</motion.span>
            <motion.h2 variants={fade} className="h2">Key Achievements</motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {ACHIEVEMENTS.map(({ year, title, desc }, i) => (
              <motion.div
                key={year}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-cream border border-border rounded-sm p-7 hover:border-accent hover:shadow-md transition-all duration-300"
              >
                <div className="inline-block bg-accent text-white font-body text-xs font-bold px-3 py-1 rounded-sm mb-4 tracking-wide">
                  {year}
                </div>
                <h3 className="font-heading font-semibold text-ink text-base mb-2">{title}</h3>
                <p className="font-body text-ink-3 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision Quote ────────────────────────────────────────────── */}
      <section className="section bg-cream-2">
        <div className="wrap">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8">
              <span className="eyebrow">In His Own Words</span>
            </div>
            <blockquote className="border-l-4 border-accent pl-8 py-2">
              <p className="font-heading italic text-ink text-xl lg:text-2xl leading-relaxed mb-6">
                "Real estate is not about square footage or price per square foot. It is about finding the right home for the right family, at the right time — and doing so with complete honesty. That is the only way to build a business that lasts."
              </p>
              <footer className="font-body text-sm text-muted">
                — <span className="font-semibold text-ink-3">Jay Mehta</span>, Founder, Hanuvansh Estate Consultant
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </section>

      {/* ── Connect ─────────────────────────────────────────────────── */}
      <section className="section bg-ink text-white">
        <div className="wrap">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center max-w-xl mx-auto"
          >
            <motion.span variants={fade} className="eyebrow">Get in Touch</motion.span>
            <motion.h2 variants={fade} className="font-heading font-bold text-white text-3xl lg:text-4xl mb-4">
              Connect with Jay
            </motion.h2>
            <motion.p variants={fade} className="font-body text-white/60 text-base leading-relaxed mb-8">
              Whether you're looking for your dream home or a sound investment, Jay is available for a personal consultation.
            </motion.p>
            <motion.div variants={fade} className="flex flex-wrap gap-3 justify-center">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-sm bg-[#25D366] text-white hover:bg-[#1ebe5d] transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              <Link to="/contact" className="btn-accent">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
