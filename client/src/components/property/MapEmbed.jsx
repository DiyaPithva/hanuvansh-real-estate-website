// Feature: hanuvansh-mern-estate
// MapEmbed: Google Maps iframe with lat/lng props in a responsive container.
// Requirements: 13.5

/**
 * @param {{ lat: number, lng: number, title?: string }} props
 */
export default function MapEmbed({ lat, lng, title = 'Property Location' }) {
  if (lat == null || lng == null) {
    return (
      <div className="w-full aspect-video bg-bg-secondary rounded-xl flex items-center justify-center text-text-muted text-sm border border-white/10">
        Location not available
      </div>
    );
  }

  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-lg">
      <iframe
        src={embedUrl}
        title={title}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        aria-label={title}
      />
    </div>
  );
}
