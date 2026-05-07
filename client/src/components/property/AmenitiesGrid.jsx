// Feature: hanuvansh-mern-estate
// AmenitiesGrid: icon-label pairs for property amenities in a responsive grid.
// Requirements: 13.3

/** Map of common amenity names to emoji icons */
const AMENITY_ICONS = {
  parking: '🚗',
  gym: '🏋️',
  pool: '🏊',
  'swimming pool': '🏊',
  security: '🔒',
  'power backup': '⚡',
  lift: '🛗',
  elevator: '🛗',
  garden: '🌿',
  clubhouse: '🏛️',
  playground: '🛝',
  wifi: '📶',
  'cctv': '📷',
  'fire safety': '🧯',
  'intercom': '📞',
  'rainwater harvesting': '💧',
  'solar panels': '☀️',
  'jogging track': '🏃',
  'sports court': '🏸',
  'basketball court': '🏀',
  'tennis court': '🎾',
  'amphitheatre': '🎭',
  'library': '📚',
  'spa': '💆',
  'sauna': '🧖',
  'rooftop': '🏙️',
  'terrace': '🌇',
  'balcony': '🌅',
  'modular kitchen': '🍳',
  'air conditioning': '❄️',
  'ac': '❄️',
  'gas pipeline': '🔥',
  'vastu compliant': '🧭',
};

/**
 * Returns an emoji icon for a given amenity string.
 * Falls back to a generic star icon.
 */
function getAmenityIcon(amenity) {
  const key = amenity.toLowerCase().trim();
  return AMENITY_ICONS[key] || '✨';
}

/**
 * @param {{ amenities: string[] }} props
 */
export default function AmenitiesGrid({ amenities = [] }) {
  if (!amenities.length) {
    return (
      <p className="text-text-muted text-sm">No amenities listed.</p>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {amenities.map((amenity, index) => (
        <div
          key={index}
          className="flex items-center gap-2 bg-bg-secondary rounded-lg px-3 py-2 border border-white/10"
        >
          <span className="text-xl flex-shrink-0" aria-hidden="true">
            {getAmenityIcon(amenity)}
          </span>
          <span className="text-text-primary text-sm font-medium leading-tight">
            {amenity}
          </span>
        </div>
      ))}
    </div>
  );
}
