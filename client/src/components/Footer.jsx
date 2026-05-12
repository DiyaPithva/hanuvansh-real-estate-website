import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const WHATSAPP = 'https://wa.me/919106788526?text=Hello%2C%20I%20am%20interested%20in%20a%20property.';

const SOCIAL = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/hanuvansh_estate_consultant?igsh=cmFiNTltYWw5bWU=',
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
    <footer className="relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fffaf5 0%, #fff4e8 50%, #fff1e0 100%)' }}>

      {/* Subtle top border */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, rgba(255,107,0,0.35), rgba(249,115,22,0.5), rgba(255,107,0,0.35), transparent)' }} />

      {/* Soft background glow */}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" aria-hidden="true"
        style={{ height: 220, background: 'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(255,122,0,0.07) 0%, transparent 70%)' }} />

      <div className="wrap py-14 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="lg:col-span-2 text-center md:text-left"
          >
            <div className="flex items-center gap-3 mb-5 justify-center md:justify-start">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-heading font-extrabold"
                style={{ background: 'linear-gradient(135deg, #FF6B00, #F97316)', boxShadow: '0 4px 14px rgba(255,107,0,0.25)' }}>
                H
              </div>
              <div>
                <div className="font-heading font-extrabold text-lg" style={{ color: '#0b0b2d' }}>Hanuvansh</div>
                <div className="font-body text-[9px] tracking-widest uppercase font-semibold" style={{ color: '#ff7a00' }}>Estate Consultant</div>
              </div>
            </div>
            <p className="font-body text-sm leading-relaxed max-w-xs mb-6 mx-auto md:mx-0" style={{ color: '#5f6475' }}>
              Authorized real estate consultant in Ahmedabad. Helping families find their dream homes with transparent consultation and trusted expertise.
            </p>
            <div className="flex gap-2.5 mb-6 justify-center md:justify-start">
              {SOCIAL.map(({ name, href, icon }) => (
                <a key={name} href={href} aria-label={name}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                  style={{ background: 'white', border: '1px solid rgba(255,122,0,0.18)', color: '#9a6040', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,0,0.08)'; e.currentTarget.style.color = '#ff6b00'; e.currentTarget.style.borderColor = 'rgba(255,107,0,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#9a6040'; e.currentTarget.style.borderColor = 'rgba(255,122,0,0.18)'; }}>
                  {icon}
                </a>
              ))}
            </div>
            <div className="flex justify-center md:justify-start">
              <a href={WHATSAPP} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #FF6B00, #F97316)', boxShadow: '0 4px 16px rgba(255,107,0,0.28)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,107,0,0.38)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,107,0,0.28)'; }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Enquiry
              </a>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center md:text-left">
            <h4 className="font-body font-bold text-[10px] tracking-widest uppercase mb-5" style={{ color: '#ff7a00' }}>Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: 'Home',        to: '/' },
                { label: 'Properties',  to: '/properties' },
                { label: 'About Us',    to: '/about' },
                { label: 'Our Founder', to: '/founder' },
                { label: 'Contact',     to: '/contact' },
              ].map(({ label, to }) => (
                <li key={to}>
                  <Link to={to}
                    className="font-body text-sm transition-colors duration-200 flex items-center justify-center md:justify-start gap-2"
                    style={{ color: '#5f6475' }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#ff6b00'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#5f6475'; }}>
                    <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'rgba(255,107,0,0.45)' }} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}
            className="text-center md:text-left">
            <h4 className="font-body font-bold text-[10px] tracking-widest uppercase mb-5" style={{ color: '#ff7a00' }}>Contact Us</h4>
            <ul className="space-y-4">
              {[
                { icon: '📞', href: 'tel:+919876543210',        text: '+91 98765 43210' },
                { icon: '✉️', href: 'mailto:info@hanuvansh.com', text: 'info@hanuvansh.com' },
                { icon: '📍', href: null,                        text: 'Ahmedabad, Gujarat, India' },
              ].map(({ icon, href, text }) => (
                <li key={text} className="flex items-start gap-3 justify-center md:justify-start">
                  <span className="text-sm mt-0.5">{icon}</span>
                  {href ? (
                    <a href={href} className="font-body text-sm transition-colors duration-200"
                      style={{ color: '#5f6475' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#ff6b00'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#5f6475'; }}>{text}</a>
                  ) : (
                    <span className="font-body text-sm" style={{ color: '#8a8fa8' }}>{text}</span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6" style={{ borderTop: '1px solid rgba(255,122,0,0.12)' }}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left">
            <p className="font-body text-xs" style={{ color: '#9a9fb8' }}>
              &copy; {new Date().getFullYear()} Hanuvansh Estate Consultant. All rights reserved.
            </p>
            <p className="font-body text-xs" style={{ color: '#b0b5c8' }}>
              Authorized Real Estate Consultant · Ahmedabad, Gujarat
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
