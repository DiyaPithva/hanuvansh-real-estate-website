// Feature: hanuvansh-mern-estate, Property 5: Property filter logic returns only matching results

/**
 * Property 5: Property filter logic returns only matching results
 *
 * For any array of Property documents and any combination of filter parameters
 * (type, minPrice, maxPrice, configuration, status), the filter function SHALL
 * return only documents where every specified filter criterion is satisfied.
 * No document in the result set SHALL violate any applied filter constraint.
 *
 * Validates: Requirements 4.1, 4.2
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { applyPropertyFilters } from '../utils/propertyFilters.js';

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

const PROPERTY_TYPES = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Penthouse'];
const PROPERTY_STATUSES = ['Available', 'Sold', 'Under Construction'];

/** Generates a single property-shaped object with valid enum values. */
const propertyArb = fc.record({
  name: fc.string({ minLength: 1, maxLength: 50 }),
  location: fc.string({ minLength: 1, maxLength: 100 }),
  type: fc.constantFrom(...PROPERTY_TYPES),
  price: fc.integer({ min: 0, max: 100_000_000 }),
  configuration: fc.constantFrom('1BHK', '2BHK', '3BHK', '4BHK', 'Studio', 'Duplex', 'Penthouse Suite'),
  status: fc.constantFrom(...PROPERTY_STATUSES),
});

/** Generates an array of 0–30 property-shaped objects. */
const propertiesArb = fc.array(propertyArb, { minLength: 0, maxLength: 30 });

/**
 * Generates a filters object where each field is either a valid value or
 * absent/empty (representing "no filter applied").
 *
 * We use `fc.option` to randomly include or omit each filter key.
 */
const filtersArb = fc.record({
  type: fc.option(fc.constantFrom(...PROPERTY_TYPES), { nil: undefined }),
  minPrice: fc.option(fc.integer({ min: 0, max: 50_000_000 }), { nil: undefined }),
  maxPrice: fc.option(fc.integer({ min: 0, max: 100_000_000 }), { nil: undefined }),
  configuration: fc.option(
    fc.constantFrom('1BHK', '2BHK', '3BHK', '4BHK', 'Studio', 'Duplex', 'Penthouse Suite'),
    { nil: undefined }
  ),
  status: fc.option(fc.constantFrom(...PROPERTY_STATUSES), { nil: undefined }),
});

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('applyPropertyFilters – Property 5: Property filter logic returns only matching results', () => {
  // -------------------------------------------------------------------------
  // Core property: every result satisfies ALL applied filter constraints
  // -------------------------------------------------------------------------
  it(
    'should return only properties that satisfy every applied filter constraint',
    () => {
      fc.assert(
        fc.property(propertiesArb, filtersArb, (properties, filters) => {
          const result = applyPropertyFilters(properties, filters);

          for (const property of result) {
            // type filter: exact match
            if (filters.type !== undefined && filters.type !== null && filters.type !== '') {
              expect(property.type).toBe(filters.type);
            }

            // minPrice filter: price >= minPrice
            if (filters.minPrice !== undefined && filters.minPrice !== null && filters.minPrice !== '') {
              expect(property.price).toBeGreaterThanOrEqual(Number(filters.minPrice));
            }

            // maxPrice filter: price <= maxPrice
            if (filters.maxPrice !== undefined && filters.maxPrice !== null && filters.maxPrice !== '') {
              expect(property.price).toBeLessThanOrEqual(Number(filters.maxPrice));
            }

            // configuration filter: exact match
            if (filters.configuration !== undefined && filters.configuration !== null && filters.configuration !== '') {
              expect(property.configuration).toBe(filters.configuration);
            }

            // status filter: exact match
            if (filters.status !== undefined && filters.status !== null && filters.status !== '') {
              expect(property.status).toBe(filters.status);
            }
          }
        }),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // No filters applied: all properties are returned
  // -------------------------------------------------------------------------
  it(
    'should return all properties when no filters are applied',
    () => {
      fc.assert(
        fc.property(propertiesArb, (properties) => {
          const result = applyPropertyFilters(properties, {});
          expect(result).toHaveLength(properties.length);
        }),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Result is a subset: filtered results are always a subset of the input
  // -------------------------------------------------------------------------
  it(
    'should return a subset of the input array (no new items introduced)',
    () => {
      fc.assert(
        fc.property(propertiesArb, filtersArb, (properties, filters) => {
          const result = applyPropertyFilters(properties, filters);
          // Every item in result must exist in the original array
          for (const item of result) {
            expect(properties).toContain(item);
          }
        }),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Type filter: only matching types appear in results
  // -------------------------------------------------------------------------
  it(
    'should return only properties with the specified type when type filter is applied',
    () => {
      fc.assert(
        fc.property(
          propertiesArb,
          fc.constantFrom(...PROPERTY_TYPES),
          (properties, type) => {
            const result = applyPropertyFilters(properties, { type });
            for (const property of result) {
              expect(property.type).toBe(type);
            }
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Price range filter: results respect both minPrice and maxPrice bounds
  // -------------------------------------------------------------------------
  it(
    'should return only properties within the specified price range',
    () => {
      fc.assert(
        fc.property(
          propertiesArb,
          fc.integer({ min: 0, max: 50_000_000 }),
          fc.integer({ min: 0, max: 50_000_000 }),
          (properties, priceA, priceB) => {
            const minPrice = Math.min(priceA, priceB);
            const maxPrice = Math.max(priceA, priceB);

            const result = applyPropertyFilters(properties, { minPrice, maxPrice });

            for (const property of result) {
              expect(property.price).toBeGreaterThanOrEqual(minPrice);
              expect(property.price).toBeLessThanOrEqual(maxPrice);
            }
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Status filter: only matching statuses appear in results
  // -------------------------------------------------------------------------
  it(
    'should return only properties with the specified status when status filter is applied',
    () => {
      fc.assert(
        fc.property(
          propertiesArb,
          fc.constantFrom(...PROPERTY_STATUSES),
          (properties, status) => {
            const result = applyPropertyFilters(properties, { status });
            for (const property of result) {
              expect(property.status).toBe(status);
            }
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Configuration filter: only matching configurations appear in results
  // -------------------------------------------------------------------------
  it(
    'should return only properties with the specified configuration when configuration filter is applied',
    () => {
      fc.assert(
        fc.property(
          propertiesArb,
          fc.constantFrom('1BHK', '2BHK', '3BHK', '4BHK', 'Studio', 'Duplex', 'Penthouse Suite'),
          (properties, configuration) => {
            const result = applyPropertyFilters(properties, { configuration });
            for (const property of result) {
              expect(property.configuration).toBe(configuration);
            }
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Combined filters: all constraints hold simultaneously
  // -------------------------------------------------------------------------
  it(
    'should satisfy all constraints simultaneously when multiple filters are combined',
    () => {
      fc.assert(
        fc.property(
          propertiesArb,
          fc.constantFrom(...PROPERTY_TYPES),
          fc.constantFrom(...PROPERTY_STATUSES),
          fc.integer({ min: 0, max: 50_000_000 }),
          fc.integer({ min: 0, max: 50_000_000 }),
          (properties, type, status, priceA, priceB) => {
            const minPrice = Math.min(priceA, priceB);
            const maxPrice = Math.max(priceA, priceB);

            const result = applyPropertyFilters(properties, { type, status, minPrice, maxPrice });

            for (const property of result) {
              expect(property.type).toBe(type);
              expect(property.status).toBe(status);
              expect(property.price).toBeGreaterThanOrEqual(minPrice);
              expect(property.price).toBeLessThanOrEqual(maxPrice);
            }
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Empty/undefined filters are treated as "no filter" (not as empty-string match)
  // -------------------------------------------------------------------------
  it(
    'should treat undefined filter values as absent (no filtering applied for that field)',
    () => {
      fc.assert(
        fc.property(propertiesArb, (properties) => {
          const filtersWithUndefined = {
            type: undefined,
            minPrice: undefined,
            maxPrice: undefined,
            configuration: undefined,
            status: undefined,
          };
          const result = applyPropertyFilters(properties, filtersWithUndefined);
          expect(result).toHaveLength(properties.length);
        }),
        { numRuns: 100 }
      );
    }
  );
});
