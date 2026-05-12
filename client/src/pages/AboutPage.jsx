import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fade = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const VALUES = [
  {
    title: 'Integrity',
    desc: 'Every recommendation we make is grounded in honesty. We prioritise your long-term interests over short-term gains, always.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    title: 'Excellence',
    desc: 'From the properties we curate to the service we deliver, we hold ourselves to the highest standard at every step.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: 'Legacy',
    desc: 'We think in generations. Our work is about building lasting wealth and creating properties that families cherish for decades.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.97zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.97z" />
      </svg>
    ),
  },
];

const STATS = [
  { value: '2+',      label: 'Years in Business' },
  { value: '500+',    label: 'Properties Sold'   },
  { value: '₹500Cr+', label: 'Transaction Value' },
  { value: '50+',     label: 'Happy Clients'     },
];

export default function AboutPage() {
  return (
    <div className="bg-cream">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-border pt-24 pb-10">
        <div className="wrap">
          <nav className="flex items-center gap-2 font-body text-xs text-muted mb-5">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="text-border">›</span>
            <span className="text-ink-3">About Us</span>
          </nav>
          <motion.span variants={fade} initial="hidden" animate="visible" className="eyebrow">
            About Us
          </motion.span>
          <motion.h1
            variants={fade}
            initial="hidden"
            animate="visible"
            className="h1 mt-1 max-w-2xl"
          >
            Built on Trust, Driven by Excellence
          </motion.h1>
        </div>
      </div>

      {/* ── Story Section ───────────────────────────────────────────── */}
      <section className="section bg-cream">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: Story text */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span variants={fade} className="eyebrow">Our Story</motion.span>
              <motion.h2 variants={fade} className="h2">
                A Decade of Defining Premium Real Estate in Ahmedabad
              </motion.h2>
              <motion.span variants={fade} className="rule" />
              <motion.p variants={fade} className="body-text mb-5">
                Hanuvansh Estate Consultant was founded with a singular conviction: that real estate transactions should be built on trust, not just transactions. Since our inception, we have guided hundreds of families and investors through the most significant financial decisions of their lives.
              </motion.p>
              <motion.p variants={fade} className="body-text mb-5">
                Our deep roots in Ahmedabad's property market give us an unparalleled understanding of neighbourhood dynamics, emerging corridors, and long-term value creation. We don't follow trends — we identify them before they become mainstream.
              </motion.p>
              <motion.p variants={fade} className="body-text">
                From a single-room office in Satellite to becoming one of Ahmedabad's most respected names in premium real estate, our journey has been defined by the relationships we've built and the trust our clients place in us — year after year.
              </motion.p>
            </motion.div>

            {/* Right: Editorial bordered items */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:pt-10 space-y-0"
            >
              {[
                {
                  title: 'Our Mission',
                  text: 'To simplify the journey of property ownership for every client — delivering transparent advice, curated listings, and seamless execution from first consultation to final handover.',
                },
                {
                  title: 'Our Vision',
                  text: 'To be the most trusted real estate consultancy in Gujarat, known not for the volume of transactions, but for the depth of relationships and the quality of outcomes we deliver.',
                },
                {
                  title: 'Our Approach',
                  text: 'We listen first. Every client has unique goals, timelines, and risk appetites. Our recommendations are always tailored — never templated — because no two property journeys are the same.',
                },
              ].map(({ title, text }, i) => (
                <motion.div
                  key={title}
                  variants={fade}
                  className="border border-border bg-white rounded-sm p-6 mb-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-1 h-8 bg-accent rounded-full shrink-0" />
                    <h3 className="font-heading font-semibold text-ink text-base">{title}</h3>
                  </div>
                  <p className="font-body text-ink-3 text-sm leading-relaxed pl-4">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────────────────────── */}
      <section className="section bg-white border-y border-border">
        <div className="wrap">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <motion.span variants={fade} className="eyebrow">What We Stand For</motion.span>
            <motion.h2 variants={fade} className="h2">Our Core Values</motion.h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {VALUES.map(({ title, desc, icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-cream border border-border rounded-sm p-8 text-center hover:border-accent hover:shadow-md transition-all duration-300"
              >
                <div className="text-accent flex justify-center mb-5">{icon}</div>
                <h3 className="font-heading font-semibold text-ink text-lg mb-3">{title}</h3>
                <p className="font-body text-ink-3 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Row ───────────────────────────────────────────────── */}
      <section className="bg-cream-2 border-b border-border">
        <div className="wrap">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
            {STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center py-10 px-6"
              >
                <div className="font-heading font-bold text-accent text-3xl lg:text-4xl mb-2">{value}</div>
                <div className="font-body text-xs text-muted uppercase tracking-wide">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder Teaser ──────────────────────────────────────────── */}
      <section className="section relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #fffaf5 0%, #fff4e8 50%, #fff1e0 100%)' }}>
        {/* Soft ambient glow */}
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ width: 500, height: 500, top: '-10%', right: '-5%',
            background: 'radial-gradient(circle, rgba(255,122,0,0.09) 0%, transparent 65%)',
            filter: 'blur(60px)' }} />
        <div className="absolute pointer-events-none" aria-hidden="true"
          style={{ width: 350, height: 350, bottom: '-10%', left: '-5%',
            background: 'radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 65%)',
            filter: 'blur(50px)' }} />

        <div className="wrap relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span variants={fade} className="eyebrow">Meet Our Founder</motion.span>
              <motion.h2 variants={fade} className="font-heading font-bold text-3xl lg:text-4xl mb-4"
                style={{ color: '#0b0b2d' }}>
                Jay Mehta
              </motion.h2>
              <motion.p variants={fade} className="font-body text-sm mb-6 tracking-wide font-semibold"
                style={{ color: '#ff7a00' }}>
                Founder & Principal Consultant
              </motion.p>
              <motion.p variants={fade} className="font-body text-base leading-relaxed"
                style={{ color: '#5f6475' }}>
                With over a decade of experience navigating Ahmedabad's premium real estate landscape, Jay Mehta has built Hanuvansh Estate Consultant on the pillars of trust, integrity, and a genuine commitment to client success. His vision has shaped the firm into what it is today.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex lg:justify-end"
            >
              <div className="text-center lg:text-right">
                <p className="font-body text-sm mb-6 max-w-xs lg:ml-auto"
                  style={{ color: '#8a8fa8' }}>
                  Discover the vision, achievements, and philosophy behind Hanuvansh Estate Consultant.
                </p>
                <Link to="/founder"
                  className="inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-xl text-white transition-all duration-300"
                  style={{ background: 'linear-gradient(135deg, #FF6B00, #F97316)', boxShadow: '0 4px 16px rgba(255,107,0,0.28)' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,0,0.38)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,107,0,0.28)'; }}>
                  View Full Profile
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}
