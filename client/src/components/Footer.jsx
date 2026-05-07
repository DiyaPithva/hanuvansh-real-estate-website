import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const WHATSAPP = 'https://wa.me/919876543210?text=Hello%2C%20I%20am%20interested%20in%20a%20property.';

const SOCIAL = [
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: '#',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)' }}>

      {/* Orange glow top */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" aria-hidden="true"
        style={{ height: 200, background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,107,0,0.12) 0%, transparent 70%)' }} />

      {/* Top border */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, transparent, #FF6B00, #F97316, transparent)' }} />

      <div className="wrap py-14 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-heading font-extrabold"
                style={{ background: 'linear-gradient(135deg, #FF6B00, #F97316)' }}>
                H
              </div>
              <div>
                <div className="font-heading font-extrabold text-white text-lg">Hanuvansh</div>
                <div className="font-body text-saffron-4 text-[9px] tracking-widest uppercase font-semibold">Estate Consultant</div>
              </div>
            </div>
            <p className="font-body text-white/50 text-sm leading-relaxed max-w-xs mb-6">
              Authorized real estate consultant in Ahmedabad. Helping families find their dream homes with transparent consultation and trusted expertise.
            </p>
            <div className="flex gap-2.5 mb-6">
              {SOCIAL.map(({ name, href, icon }) => (
                <a key={name} href={href} aria-label={name}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,0,0.2)'; e.currentTarget.style.color = '#FF6B00'; e.currentTarget.style.borderColor = 'rgba(255,107,0,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}>
                  {icon}
                </a>
              ))}
            </div>
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, #FF6B00, #F97316)', boxShadow: '0 4px 16px rgba(255,107,0,0.3)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,0,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,107,0,0.3)'; }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              WhatsApp Enquiry
            </a>
          </motion.div>

          {/* Navigation */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <h4 className="font-body font-bold text-white/60 text-[10px] tracking-widest uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', to: '/' },
                { label: 'Properties', to: '/properties' },
                { label: 'About Us', to: '/about' },
                { label: 'Our Founder', to: '/founder' },
                { label: 'Contact', to: '/contact' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to}
                    className="font-body text-sm text-white/45 hover:text-saffron-4 transition-colors duration-200 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-saffron-4 opacity-40 flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
            <h4 className="font-body font-bold text-white/60 text-[10px] tracking-widest uppercase mb-5">Contact Us</h4>
            <ul className="space-y-4">
              {[
                { icon: '📞', href: 'tel:+919876543210', text: '+91 98765 43210' },
                { icon: '✉️', href: 'mailto:info@hanuvansh.com', text: 'info@hanuvansh.com' },
                { icon: '📍', href: null, text: 'Ahmedabad, Gujarat, India' },
              ].map(({ icon, href, text }) => (
                <li key={text} className="flex items-start gap-3">
                  <span className="text-sm mt-0.5">{icon}</span>
                  {href ? (
                    <a href={href} className="font-body text-sm text-white/45 hover:text-saffron-4 transition-colors duration-200">{text}</a>
                  ) : (
                    <span className="font-body text-sm text-white/35">{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="font-body text-white/25 text-xs">
              &copy; {new Date().getFullYear()} Hanuvansh Estate Consultant. All rights reserved.
            </p>
            <p className="font-body text-white/20 text-xs">
              Authorized Real Estate Consultant · Ahmedabad, Gujarat
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
