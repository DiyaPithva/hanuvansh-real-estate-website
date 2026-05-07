/**
 * Pure filter function that replicates the Mongoose query logic from
 * `getProperties` in propertyController.js.
 *
 * This function is extracted so it can be unit/property-tested without
 * requiring a live MongoDB connection.
 *
 * @param {Object[]} properties - Array of property-shaped objects
 * @param {Object}   filters    - Filter criteria (all fields optional)
 * @param {string}   [filters.type]          - Exact match on property type
 * @param {number|string} [filters.minPrice] - Minimum price (inclusive)
 * @param {number|string} [filters.maxPrice] - Maximum price (inclusive)
 * @param {string}   [filters.configuration] - Exact match on configuration
 * @param {string}   [filters.status]        - Exact match on status
 * @returns {Object[]} Filtered array of property objects
 */
export function applyPropertyFilters(properties, filters = {}) {
  const { type, minPrice, maxPrice, configuration, status } = filters;

  return properties.filter((property) => {
    // Filter by type (exact match)
    if (type !== undefined && type !== null && type !== '') {
      if (property.type !== type) return false;
    }

    // Filter by minPrice (price >= minPrice)
    if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
      if (property.price < Number(minPrice)) return false;
    }

    // Filter by maxPrice (price <= maxPrice)
    if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
      if (property.price > Number(maxPrice)) return false;
    }

    // Filter by configuration (exact match)
    if (configuration !== undefined && configuration !== null && configuration !== '') {
      if (property.configuration !== configuration) return false;
    }

    // Filter by status (exact match)
    if (status !== undefined && status !== null && status !== '') {
      if (property.status !== status) return false;
    }

    return true;
  });
}
