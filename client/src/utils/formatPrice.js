/**
 * Formats a number as an Indian Rupee (INR) string using Indian numbering
 * notation (lakhs / crores).
 *
 * Examples:
 *   formatPrice(5000000)  => 'Rs50 Lakh'
 *   formatPrice(10000000) => 'Rs1 Crore'
 *   formatPrice(150000)   => 'Rs1.5 Lakh'
 *   formatPrice(0)        => 'Rs0'
 *
 * Requirements: 12.7
 */
const LAKH = 100_000;
const CRORE = 10_000_000;

/**
 * @param {number} number - The price value to format.
 * @returns {string} INR-formatted string with rupee symbol.
 */
export function formatPrice(number) {
  if (typeof number !== 'number' || isNaN(number) || number <= 0) {
    return '\u20B90';
  }
  if (number >= CRORE) {
    const crores = number / CRORE;
    const formatted = parseFloat(crores.toFixed(2));
    return `\u20B9${formatted} Crore`;
  }
  if (number >= LAKH) {
    const lakhs = number / LAKH;
    const formatted = parseFloat(lakhs.toFixed(2));
    return `\u20B9${formatted} Lakh`;
  }
  const formatted = new Intl.NumberFormat('en-IN').format(Math.round(number));
  return `\u20B9${formatted}`;
}
