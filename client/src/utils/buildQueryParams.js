/**
 * Builds a URL query string from a filters object.
 *
 * Accepted keys: type, minPrice, maxPrice, configuration, status, page
 * Values that are null, undefined, or empty string are omitted.
 *
 * Requirements: 12.2, 12.3
 *
 * @param {Object} filters - Filter state object.
 * @returns {string} URL query string without leading '?'.
 */
export function buildQueryParams(filters = {}) {
  const params = new URLSearchParams();
  const ALLOWED_KEYS = ['type', 'minPrice', 'maxPrice', 'configuration', 'status', 'page'];
  for (const key of ALLOWED_KEYS) {
    const value = filters[key];
    if (value === null || value === undefined || value === '') {
      continue;
    }
    params.append(key, String(value));
  }
  return params.toString();
}
