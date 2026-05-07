// Feature: hanuvansh-mern-estate, Property 8: Filter state encodes correctly to query parameters
// Validates: Requirements 12.2, 12.3
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { buildQueryParams } from './buildQueryParams.js';
const ALLOWED_KEYS = ['type', 'minPrice', 'maxPrice', 'configuration', 'status', 'page'];
describe('buildQueryParams - unit tests', () => {
  it('encodes a single non-empty filter', () => {
    expect(buildQueryParams({ type: 'Villa' })).toBe('type=Villa');
  });
  it('encodes multiple non-empty filters', () => {
    const result = buildQueryParams({ type: 'Villa', minPrice: 5_000_000 });
    expect(result).toContain('type=Villa');
    expect(result).toContain('minPrice=5000000');
  });
  it('omits null values', () => {
    expect(buildQueryParams({ type: null, status: 'Available' })).toBe('status=Available');
  });
  it('omits undefined values', () => {
    expect(buildQueryParams({ type: undefined, status: 'Sold' })).toBe('status=Sold');
  });
  it('omits empty string values', () => {
    expect(buildQueryParams({ type: '', status: 'Available' })).toBe('status=Available');
  });
  it('returns empty string when all values are empty/null/undefined', () => {
    expect(buildQueryParams({ type: '', minPrice: null, status: undefined })).toBe('');
  });
  it('returns empty string for empty object', () => {
    expect(buildQueryParams({})).toBe('');
  });
  it('returns empty string for no argument', () => {
    expect(buildQueryParams()).toBe('');
  });
  it('encodes page parameter', () => {
    expect(buildQueryParams({ page: 3 })).toBe('page=3');
  });
});
const filterValueArb = fc.oneof(
  fc.constantFrom('', null, undefined),
  fc.string({ minLength: 1, maxLength: 20 }).filter((s) => s.trim().length > 0),
  fc.integer({ min: 1, max: 100 })
);
const filterObjectArb = fc.record(
  { type: filterValueArb, minPrice: filterValueArb, maxPrice: filterValueArb,
    configuration: filterValueArb, status: filterValueArb, page: filterValueArb },
  { requiredKeys: [] }
);
describe('buildQueryParams - property tests', () => {
  it('Property 8: output includes exactly the non-empty/non-null/non-undefined values', () => {
    fc.assert(
      fc.property(filterObjectArb, (filters) => {
        const result = buildQueryParams(filters);
        const params = new URLSearchParams(result);
        for (const key of ALLOWED_KEYS) {
          const value = filters[key];
          const isEmpty = value === null || value === undefined || value === '';
          if (isEmpty) {
            expect(params.has(key)).toBe(false);
          } else {
            expect(params.has(key)).toBe(true);
            expect(params.get(key)).toBe(String(value));
          }
        }
      }),
      { numRuns: 100 }
    );
  });
  it('Property 8: result is always a valid URL query string', () => {
    fc.assert(
      fc.property(filterObjectArb, (filters) => {
        const result = buildQueryParams(filters);
        expect(() => new URLSearchParams(result)).not.toThrow();
        expect(typeof result).toBe('string');
      }),
      { numRuns: 100 }
    );
  });
  it('Property 8: all-empty filter objects always produce an empty string', () => {
    fc.assert(
      fc.property(
        fc.record(
          { type: fc.constantFrom('', null, undefined),
            minPrice: fc.constantFrom('', null, undefined),
            maxPrice: fc.constantFrom('', null, undefined),
            configuration: fc.constantFrom('', null, undefined),
            status: fc.constantFrom('', null, undefined),
            page: fc.constantFrom('', null, undefined) },
          { requiredKeys: [] }
        ),
        (filters) => { expect(buildQueryParams(filters)).toBe(''); }
      ),
      { numRuns: 100 }
    );
  });
});
