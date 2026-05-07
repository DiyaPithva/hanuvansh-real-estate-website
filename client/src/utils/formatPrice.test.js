// Feature: hanuvansh-mern-estate, Property 7: Price formatting produces valid INR strings
// Validates: Requirements 12.7
import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import { formatPrice } from './formatPrice.js';
const LAKH = 100_000;
const CRORE = 10_000_000;
describe('formatPrice - unit tests', () => {
  it('formats 5000000 as Rs50 Lakh', () => {
    expect(formatPrice(5_000_000)).toBe('\u20B950 Lakh');
  });
  it('formats 10000000 as Rs1 Crore', () => {
    expect(formatPrice(10_000_000)).toBe('\u20B91 Crore');
  });
  it('formats 150000 as Rs1.5 Lakh', () => {
    expect(formatPrice(150_000)).toBe('\u20B91.5 Lakh');
  });
  it('formats 0 as Rs0', () => {
    expect(formatPrice(0)).toBe('\u20B90');
  });
  it('formats negative numbers as Rs0', () => {
    expect(formatPrice(-500_000)).toBe('\u20B90');
  });
  it('formats non-number as Rs0', () => {
    expect(formatPrice('abc')).toBe('\u20B90');
    expect(formatPrice(null)).toBe('\u20B90');
    expect(formatPrice(undefined)).toBe('\u20B90');
    expect(formatPrice(NaN)).toBe('\u20B90');
  });
  it('formats 100000 as Rs1 Lakh', () => {
    expect(formatPrice(100_000)).toBe('\u20B91 Lakh');
  });
  it('formats 20000000 as Rs2 Crore', () => {
    expect(formatPrice(20_000_000)).toBe('\u20B92 Crore');
  });
});
describe('formatPrice - property tests', () => {
  it('Property 7: always returns a non-empty string containing the rupee symbol', () => {
    fc.assert(
      fc.property(
        fc.float({ min: 0, max: 1e9, noNaN: true }),
        (price) => {
          const result = formatPrice(price);
          expect(typeof result).toBe('string');
          expect(result.length).toBeGreaterThan(0);
          expect(result).toContain('\u20B9');
        }
      ),
      { numRuns: 100 }
    );
  });
  it('Property 7: values >= 1 Crore are formatted with Crore label', () => {
    fc.assert(
      fc.property(
        fc.float({ min: CRORE, max: 1e10, noNaN: true }),
        (price) => {
          const result = formatPrice(price);
          expect(result).toContain('Crore');
          expect(result).toContain('\u20B9');
        }
      ),
      { numRuns: 100 }
    );
  });
  it('Property 7: values >= 1 Lakh and < 1 Crore are formatted with Lakh label', () => {
    fc.assert(
      fc.property(
        fc.float({ min: LAKH, max: CRORE - 1, noNaN: true }),
        (price) => {
          const result = formatPrice(price);
          expect(result).toContain('Lakh');
          expect(result).toContain('\u20B9');
          expect(result).not.toContain('Crore');
        }
      ),
      { numRuns: 100 }
    );
  });
  it('Property 7: zero and negative numbers always return Rs0', () => {
    fc.assert(
      fc.property(
        fc.float({ min: -1e9, max: 0, noNaN: true }),
        (price) => {
          expect(formatPrice(price)).toBe('\u20B90');
        }
      ),
      { numRuns: 100 }
    );
  });
});
