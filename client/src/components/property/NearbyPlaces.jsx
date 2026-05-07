// Feature: hanuvansh-mern-estate
// NearbyPlaces: styled list of nearby places with location pin icon.
// Requirements: 13.4

/**
 * @param {{ places: Array<string | { name: string, distance?: string }> }} props
 */
export default function NearbyPlaces({ places = [] }) {
  if (!places.length) {
    return (
      <p className="text-text-muted text-sm">No nearby places listed.</p>
    );
  }

  return (
    <ul className="space-y-2">
      {places.map((place, index) => {
        const name = typeof place === 'string' ? place : place.name;
        const distance = typeof place === 'object' ? place.distance : null;

        return (
          <li
            key={index}
            className="flex items-start gap-3 bg-bg-secondary rounded-lg px-4 py-3 border border-white/10"
          >
            {/* Location pin icon */}
            <span
              className="text-accent text-lg flex-shrink-0 mt-0.5"
              aria-hidden="true"
            >
              📍
            </span>
            <div className="flex flex-col">
              <span className="text-text-primary text-sm font-medium">
                {name}
              </span>
              {distance && (
                <span className="text-text-muted text-xs mt-0.5">
                  {distance}
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
