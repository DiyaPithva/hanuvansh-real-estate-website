/**
 * Footer — dark luxury footer with company branding, navigation links,
 * social media icons, WhatsApp contact, and copyright notice.
 *
 * Requirements: 8.4, 17.9
 */

import React from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { label: 'Home',       to: '/' },
  { label: 'About',      to: '/about' },
  { label: 'Founder',    to: '/founder' },
  { label: 'Properties', to: '/properties' },
  { label: 'Contact',    to: '/contact' },
];

// SVG icon components
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    className="w-5 h-5" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
    className="w-5 h-5" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    className="w-5 h-5" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const YouTubeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    className="w-5 h-5" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
    className="w-5 h-5" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href:  'https://www.instagram.com',
    Icon:  InstagramIcon,
  },
  {
    label: 'Facebook',
    href:  'https://www.facebook.com',
    Icon:  FacebookIcon,
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com',
    Icon:  LinkedInIcon,
  },
  {
    label: 'YouTube',
    href:  'https://www.youtube.com',
    Icon:  YouTubeIcon,
  },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        background: '#0a0a0a',
        borderColor: 'rgba(212, 175, 55, 0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <h2
              className="font-heading font-bold text-2xl tracking-widest"
              style={{ color: '#D4AF37' }}
            >
              HANUVANSH
            </h2>
            <p
              className="font-heading text-xs tracking-widest uppercase"
              style={{ color: '#9CA3AF' }}
            >
              ESTATE CONSULTANT
            </p>
            <p
              className="text-xs font-body tracking-wider mt-1"
              style={{ color: '#FF6B00' }}
            >
              BEYOND TRANSACTIONS — CREATING TIMELESS PROPERTY WEALTH
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 px-4 py-2 rounded text-sm font-body font-medium transition-colors duration-200"
              style={{
                background: '#25D366',
                color: '#FFFFFF',
                width: 'fit-content',
              }}
              aria-label="Contact us on WhatsApp"
            >
              <WhatsAppIcon />
              WhatsApp Us
            </a>
          </div>

          {/* Navigation column */}
          <div className="flex flex-col gap-3">
            <h3
              className="font-heading text-sm font-semibold tracking-widest uppercase mb-2"
              style={{ color: '#D4AF37' }}
            >
              Navigation
            </h3>
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-sm font-body transition-colors duration-200"
                style={{ color: '#9CA3AF' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#9CA3AF'; }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Social media column */}
          <div className="flex flex-col gap-4">
            <h3
              className="font-heading text-sm font-semibold tracking-widest uppercase mb-2"
              style={{ color: '#D4AF37' }}
            >
              Follow Us
            </h3>
            <div className="flex gap-4 flex-wrap">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200"
                  style={{
                    background: 'rgba(212, 175, 55, 0.1)',
                    color: '#9CA3AF',
                    border: '1px solid rgba(212, 175, 55, 0.2)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)';
                    e.currentTarget.style.color = '#D4AF37';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)';
                    e.currentTarget.style.color = '#9CA3AF';
                  }}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="mt-10 pt-6 border-t text-center"
          style={{ borderColor: 'rgba(212, 175, 55, 0.1)' }}
        >
          <p className="text-xs font-body" style={{ color: '#9CA3AF' }}>
            © 2024 HANUVANSH ESTATE CONSULTANT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
