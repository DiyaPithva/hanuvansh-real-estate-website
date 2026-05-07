import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/formatPrice.js';

// Feature: hanuvansh-mern-estate
// PropertyCard: premium luxury property card with layered design.
// Requirements: 12.7, 19.6

function getOptimisedImageUrl(url) {
  if (!url || !url.includes('cloudinary.com')) return url;
  return url.replace('/upload/', '/upload/w_800,q_auto,f_auto/');
}

const STATUS_CONFIG = {
  Available:            { label: 'Available',            bg: 'rgba(16,185,129,0.12)', color: '#059669', border: 'rgba(16,185,129,0.25)' },
  Sold:                 { label: 'Sold',                 bg: 'rgba(239,68,68,0.10)',  color: '#dc2626', border: 'rgba(239,68,68,0.22)' },
  'Under Construction': { label: 'Under Construction',   bg: 'rgba(245,158,11,0.10)', color: '#d97706', border: 'rgba(245,158,11,0.22)' },
};

const TYPE_ICONS = {
  Apartment:  '🏢',
  Villa:      '🏡',
  Plot:       '🗺️',
  Commercial: '🏬',
  Penthouse:  '🌆',
};

export default function PropertyCard({ property }) {
  const { _id, name, location, type, price, configuration, status, images = [] } = property;

  const primaryImage = images[0] ? getOptimisedImageUrl(images[0]) : null;
  const statusCfg = STATUS_CONFIG[status] || { label: status, bg: 'rgba(100,100,100,0.1)', color: '#666', border: 'rgba(100,100,100,0.2)' };
  const typeIcon = TYPE_ICONS[type] || '🏠';

  return (
    <motion.article
      initial="rest"
      whileHover="hover"
      className="prop-card group"
      style={{ borderRadius: 2 }}
    >
      <Link to={`/properties/${_id}`} className="block">

        {/* ── Image area ─────────────────────────────────────────── */}
        <div className="relative overflow-hidden" style={{ height: 220 }}>
          {primaryImage ? (
            <motion.img
              src={primaryImage}
              alt={name}
              className="w-full h-full object-cover"
              variants={{ rest: { scale: 1 }, hover: { scale: 1.04 } }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #f4f0e8, #ece6d8)' }}
            >
              <span style={{ fontSize: 32 }}>{typeIcon}</span>
              <span className="font-body text-xs text-muted tracking-widest uppercase">No Image</span>
            </div>
          )}

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(20,20,20,0.45) 0%, transparent 55%)',
            }}
          />

          {/* Status badge */}
          <span
            className="absolute top-3 left-3 font-body text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1"
            style={{
              background: statusCfg.bg,
              color: statusCfg.color,
              border: `1px solid ${statusCfg.border}`,
              borderRadius: 2,
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {statusCfg.label}
          </span>

          {/* Type badge */}
          {type && (
            <span
              className="absolute top-3 right-3 font-body text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1"
              style={{
                background: 'rgba(250,248,244,0.85)',
                color: '#454545',
                border: '1px solid rgba(224,217,206,0.8)',
                borderRadius: 2,
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              {typeIcon} {type}
            </span>
          )}

          {/* Price overlay at bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
            <p
              className="font-heading font-bold text-white"
              style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
            >
              {formatPrice(price)}
            </p>
          </div>
        </div>

        {/* ── Content area ───────────────────────────────────────── */}
        <div className="px-4 pt-4 pb-5">
          <h3
            className="font-heading font-semibold text-ink leading-snug line-clamp-2 mb-1.5"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.05rem)' }}
          >
            {name}
          </h3>

          <p className="font-body text-[12.5px] text-muted flex items-center gap-1.5 mb-3">
            <svg width="11" height="13" viewBox="0 0 12 16" fill="none" aria-hidden="true">
              <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 6 3.5a1.5 1.5 0 0 1 0 3z" fill="#B8860B" fillOpacity="0.7"/>
            </svg>
            <span className="line-clamp-1">{location}</span>
          </p>

          {/* Config tag */}
          {configuration && (
            <div className="flex items-center gap-2">
              <span
                className="font-body text-[11px] tracking-widest uppercase px-2.5 py-1"
                style={{
                  background: 'rgba(184,134,11,0.07)',
                  color: '#B8860B',
                  border: '1px solid rgba(184,134,11,0.18)',
                  borderRadius: 2,
                }}
              >
                {configuration}
              </span>
            </div>
          )}

          {/* Hover CTA line */}
          <div
            className="mt-4 flex items-center gap-1.5 font-body text-[11.5px] font-semibold tracking-widest uppercase transition-all duration-300"
            style={{ color: '#B8860B', opacity: 0 }}
            ref={(el) => {
              if (!el) return;
              const card = el.closest('article');
              if (!card) return;
              const show = () => { el.style.opacity = '1'; };
              const hide = () => { el.style.opacity = '0'; };
              card.addEventListener('mouseenter', show);
              card.addEventListener('mouseleave', hide);
            }}
          >
            View Details
            <svg width="12" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
              <path d="M1 5h12M8 1l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

      </Link>
    </motion.article>
  );
}
