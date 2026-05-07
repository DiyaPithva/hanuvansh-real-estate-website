import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../api/index.js';

const fade = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const CONTACT_ITEMS = [
  {
    label: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'info@hanuvansh.com',
    href: 'mailto:info@hanuvansh.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'Office',
    value: '301, Shivalik Business Hub, Satellite Road, Ahmedabad – 380015',
    href: 'https://maps.google.com/?q=Satellite+Road+Ahmedabad',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

export default function ContactPage() {
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
      await api.submitInquiry(form);
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again or reach us directly.');
    } finally {
      setSub(false);
    }
  }

  const waLink = `https://wa.me/919876543210?text=${encodeURIComponent('Hi, I\'d like to enquire about a property.')}`;

  return (
    <div className="bg-cream">

      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="bg-white border-b border-border pt-24 pb-10">
        <div className="wrap">
          <nav className="flex items-center gap-2 font-body text-xs text-muted mb-5">
            <Link to="/" className="hover:text-accent transition-colors">Home</Link>
            <span className="text-border">›</span>
            <span className="text-ink-3">Contact</span>
          </nav>
          <motion.span variants={fade} initial="hidden" animate="visible" className="eyebrow">
            Contact
          </motion.span>
          <motion.h1
            variants={fade}
            initial="hidden"
            animate="visible"
            className="h1 mt-1"
          >
            Let's Connect
          </motion.h1>
        </div>
      </div>

      {/* ── Main Section ────────────────────────────────────────────── */}
      <section className="section bg-cream">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-14 items-start">

            {/* Left: Contact Info */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span variants={fade} className="eyebrow">Reach Us</motion.span>
              <motion.h2 variants={fade} className="h2">
                We're Here to Help
              </motion.h2>
              <motion.span variants={fade} className="rule" />
              <motion.p variants={fade} className="body-text mb-8">
                Whether you have a question about a specific property, need investment advice, or simply want to explore your options — our team is ready to assist. Reach out through any of the channels below.
              </motion.p>

              {/* Contact items */}
              <motion.div variants={stagger} className="space-y-5 mb-8">
                {CONTACT_ITEMS.map(({ label, value, href, icon }) => (
                  <motion.a
                    key={label}
                    variants={fade}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-sm bg-white border border-border flex items-center justify-center text-accent shrink-0 group-hover:border-accent group-hover:bg-accent group-hover:text-white transition-all duration-200">
                      {icon}
                    </div>
                    <div>
                      <div className="font-body text-xs text-muted uppercase tracking-wide mb-0.5">{label}</div>
                      <div className="font-body text-sm text-ink-2 group-hover:text-accent transition-colors duration-200 leading-snug">
                        {value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </motion.div>

              {/* WhatsApp */}
              <motion.div variants={fade}>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body font-semibold text-sm px-6 py-3 rounded-sm border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all duration-200"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
            >
              <div className="bg-white border border-border rounded-sm p-8">
                <h3 className="font-heading font-semibold text-ink text-lg mb-1">Send Us a Message</h3>
                <p className="font-body text-xs text-muted mb-6">We typically respond within 24 hours.</p>
                <div className="h-px bg-border mb-6" />

                {success ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-10"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
                      <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="font-heading font-semibold text-ink text-lg mb-2">Message Sent!</h4>
                    <p className="font-body text-sm text-ink-3 mb-6">
                      Thank you for reaching out. We'll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => { setSuccess(false); setForm({ name: '', email: '', phone: '', message: '' }); }}
                      className="btn-ghost text-sm"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">
                          Full Name *
                        </label>
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
                        <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">
                          Phone
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">
                        Email *
                      </label>
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
                      <label className="font-body text-xs text-muted uppercase tracking-wide block mb-1.5">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder="Tell us how we can help you…"
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
                      ) : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map ─────────────────────────────────────────────────────── */}
      <div className="border-t border-border">
        <iframe
          title="Hanuvansh Estate Consultant Location"
          width="100%"
          height="400"
          style={{ border: 0, display: 'block' }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=Satellite+Road,+Ahmedabad,+Gujarat&z=14&output=embed"
          className="border border-border"
        />
      </div>

    </div>
  );
}
