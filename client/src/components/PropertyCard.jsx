import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '../utils/formatPrice.js';

function getOptimisedImageUrl(url) {
  if (!url || !url.includes('cloudinary.com')) return url;
  return url.replace('/upload/', '/upload/w_800,q_auto,f_auto/');
}

const STATUS_CONFIG = {
  Available:            { label: 'Available',          bg: 'rgba(16,185,129,0.1)',  color: '#059669', border: 'rgba(16,185,129,0.25)' },
  Sold:                 { label: 'Sold',               bg: 'rgba(239,68,68,0.1)',   color: '#dc2626', border: 'rgba(239,68,68,0.25)' },
  'Under Construction': { label: 'Under Construction', bg: 'rgba(249,115,22,0.09)', color: '#f97316', border: 'rgba(249,115,22,0.22)' },
};

const TYPE_ICONS = {
  Apartment:  '🏢', Villa: '🏡', Plot: '🗺️', Commercial: '🏬', Penthouse: '🌆',
};

export default function PropertyCard({ property, index = 0 }) {
  if (!property) return null;
  const { id, _id, name, location, type, price, configuration, status, images = [] } = property;
  const propId = id || _id;
  const primaryImage = images[0] ? getOptimisedImageUrl(images[0]) : null;
  const statusCfg = STATUS_CONFIG[status] || { label: status, bg: 'rgba(107,114,128,0.1)', color: '#6B7280', border: 'rgba(107,114,128,0.25)' };
  const typeIcon = TYPE_ICONS[type] || '🏠';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="prop-card group"
    >
      <Link to={`/properties/${propId}`} className="block">

        {/* Image */}
        <div className="relative overflow-hidden" style={{ height: 220 }}>
          {primaryImage ? (
            <motion.img
              src={primaryImage}
              alt={name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #FFF7ED, #FFEDD5)' }}
            >
              <span style={{ fontSize: 36 }}>{typeIcon}</span>
              <span className="font-body text-xs text-muted tracking-widest uppercase">No Image</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to top, rgba(26,26,46,0.5) 0%, transparent 55%)' }} />

          {/* Status badge */}
          <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-full"
            style={{ background: statusCfg.bg, color: statusCfg.color, border: `1px solid ${statusCfg.border}`, backdropFilter: 'blur(8px)' }}>
            {statusCfg.label}
          </span>

          {/* Type badge */}
          {type && (
            <span className="absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.9)', color: '#374151', border: '1px solid rgba(254,215,170,0.8)', backdropFilter: 'blur(8px)' }}>
              {typeIcon} {type}
            </span>
          )}

          {/* Price overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
            <p className="font-heading font-extrabold text-white"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>
              {formatPrice(price)}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pt-4 pb-5">
          <h3 className="font-heading font-bold text-ink leading-snug line-clamp-2 mb-2 group-hover:text-saffron transition-colors duration-200"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)' }}>
            {name}
          </h3>

          <p className="font-body text-[13px] text-muted flex items-center gap-1.5 mb-3">
            <svg width="12" height="14" viewBox="0 0 12 16" fill="none" aria-hidden="true">
              <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 6 3.5a1.5 1.5 0 0 1 0 3z" fill="#f97316" fillOpacity="0.6"/>
            </svg>
            <span className="line-clamp-1">{location}</span>
          </p>

          <div className="flex items-center justify-between">
            {configuration && (
              <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-lg"
                style={{ background: 'rgba(249,115,22,0.07)', color: '#f97316', border: '1px solid rgba(249,115,22,0.14)' }}>
                {configuration}
              </span>
            )}
            <span className="ml-auto flex items-center gap-1 text-[12px] font-semibold text-saffron opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              View Details
              <svg width="12" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
