// Feature: hanuvansh-mern-estate, Property 2: Mongoose model validation rejects invalid documents

/**
 * Property 2: Mongoose model validation rejects invalid documents
 *
 * For any document with missing required fields or out-of-enum / out-of-range
 * values, Mongoose's `validate()` method SHALL throw a `ValidationError`.
 *
 * Validates: Requirements 2.1, 2.2, 2.3, 2.4
 *
 * Approach: Use `model.validate()` (not `model.save()`) so no MongoDB connection
 * is needed. Mongoose runs schema validation synchronously/asynchronously without
 * a DB connection when `validate()` is called directly.
 *
 * For each model we test three categories of invalid input:
 *   1. Missing required fields  → ValidationError
 *   2. Invalid enum values      → ValidationError
 *   3. Out-of-range numbers     → ValidationError (Testimonial rating, Property price)
 */

import { describe, it, expect } from 'vitest';
import fc from 'fast-check';
import User from './User.js';
import Property from './Property.js';
import Inquiry from './Inquiry.js';
import Testimonial from './Testimonial.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Returns a rejected ValidationError from model.validate(), or throws if it
 *  unexpectedly resolves (meaning validation passed when it should have failed). */
async function expectValidationError(doc) {
  try {
    await doc.validate();
    // If we reach here, validation passed — that is the failure case for this test
    throw new Error('Expected ValidationError but validation passed');
  } catch (err) {
    expect(err.name).toBe('ValidationError');
  }
}

// Allowed enum values — used to generate strings that are NOT in the enum
const USER_ROLES = ['admin', 'user'];
const PROPERTY_TYPES = ['Apartment', 'Villa', 'Plot', 'Commercial', 'Penthouse'];
const PROPERTY_STATUSES = ['Available', 'Sold', 'Under Construction'];
const INQUIRY_STATUSES = ['New', 'Contacted', 'Closed'];

/** Arbitrary that generates a non-empty string guaranteed NOT to be in `allowed`. */
function invalidEnumArb(allowed) {
  return fc
    .string({ minLength: 1 })
    .filter((s) => !allowed.includes(s));
}

// ---------------------------------------------------------------------------
// User model
// ---------------------------------------------------------------------------

describe('User model – Property 2: validation rejects invalid documents', () => {
  it(
    '2a. Missing required fields (name, email, or password) → ValidationError',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate a subset of required fields to omit (at least one)
          fc.record({
            omitName: fc.boolean(),
            omitEmail: fc.boolean(),
            omitPassword: fc.boolean(),
          }).filter(({ omitName, omitEmail, omitPassword }) =>
            omitName || omitEmail || omitPassword
          ),
          fc.string({ minLength: 1 }),
          fc.string({ minLength: 1 }),
          fc.string({ minLength: 1 }),
          async ({ omitName, omitEmail, omitPassword }, name, email, password) => {
            const data = {};
            if (!omitName) data.name = name;
            if (!omitEmail) data.email = email;
            if (!omitPassword) data.password = password;

            const doc = new User(data);
            await expectValidationError(doc);
          }
        ),
        { numRuns: 100 }
      );
    },
    30_000
  );

  it(
    '2b. Invalid enum value for role → ValidationError',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          invalidEnumArb(USER_ROLES),
          async (invalidRole) => {
            const doc = new User({
              name: 'Test User',
              email: 'test@example.com',
              password: 'secret123',
              role: invalidRole,
            });
            await expectValidationError(doc);
          }
        ),
        { numRuns: 100 }
      );
    },
    30_000
  );
});

// ---------------------------------------------------------------------------
// Property model
// ---------------------------------------------------------------------------

describe('Property model – Property 2: validation rejects invalid documents', () => {
  it(
    '2c. Missing required fields (name, location, type, price, configuration, or status) → ValidationError',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            omitName: fc.boolean(),
            omitLocation: fc.boolean(),
            omitType: fc.boolean(),
            omitPrice: fc.boolean(),
            omitConfiguration: fc.boolean(),
            omitStatus: fc.boolean(),
          }).filter(
            ({ omitName, omitLocation, omitType, omitPrice, omitConfiguration, omitStatus }) =>
              omitName || omitLocation || omitType || omitPrice || omitConfiguration || omitStatus
          ),
          async ({ omitName, omitLocation, omitType, omitPrice, omitConfiguration, omitStatus }) => {
            const data = {};
            if (!omitName) data.name = 'Luxury Villa';
            if (!omitLocation) data.location = 'Mumbai';
            if (!omitType) data.type = 'Villa';
            if (!omitPrice) data.price = 5000000;
            if (!omitConfiguration) data.configuration = '3BHK';
            if (!omitStatus) data.status = 'Available';

            const doc = new Property(data);
            await expectValidationError(doc);
          }
        ),
        { numRuns: 100 }
      );
    },
    30_000
  );

  it(
    '2d. Invalid enum value for type → ValidationError',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          invalidEnumArb(PROPERTY_TYPES),
          async (invalidType) => {
            const doc = new Property({
              name: 'Luxury Villa',
              location: 'Mumbai',
              type: invalidType,
              price: 5000000,
              configuration: '3BHK',
              status: 'Available',
            });
            await expectValidationError(doc);
          }
        ),
        { numRuns: 100 }
      );
    },
    30_000
  );

  it(
    '2e. Invalid enum value for status → ValidationError',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          invalidEnumArb(PROPERTY_STATUSES),
          async (invalidStatus) => {
            const doc = new Property({
              name: 'Luxury Villa',
              location: 'Mumbai',
              type: 'Villa',
              price: 5000000,
              configuration: '3BHK',
              status: invalidStatus,
            });
            await expectValidationError(doc);
          }
        ),
        { numRuns: 100 }
      );
    },
    30_000
  );

  it(
    '2f. Negative price (below min: 0) → ValidationError',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate negative numbers (strictly below 0)
          fc.integer({ max: -1 }),
          async (negativePrice) => {
            const doc = new Property({
              name: 'Luxury Villa',
              location: 'Mumbai',
              type: 'Villa',
              price: negativePrice,
              configuration: '3BHK',
              status: 'Available',
            });
            await expectValidationError(doc);
          }
        ),
        { numRuns: 100 }
      );
    },
    30_000
  );
});

// ---------------------------------------------------------------------------
// Inquiry model
// ---------------------------------------------------------------------------

describe('Inquiry model – Property 2: validation rejects invalid documents', () => {
  it(
    '2g. Missing required fields (name, email, phone, or message) → ValidationError',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            omitName: fc.boolean(),
            omitEmail: fc.boolean(),
            omitPhone: fc.boolean(),
            omitMessage: fc.boolean(),
          }).filter(
            ({ omitName, omitEmail, omitPhone, omitMessage }) =>
              omitName || omitEmail || omitPhone || omitMessage
          ),
          async ({ omitName, omitEmail, omitPhone, omitMessage }) => {
            const data = {};
            if (!omitName) data.name = 'John Doe';
            if (!omitEmail) data.email = 'john@example.com';
            if (!omitPhone) data.phone = '9876543210';
            if (!omitMessage) data.message = 'I am interested in this property.';

            const doc = new Inquiry(data);
            await expectValidationError(doc);
          }
        ),
        { numRuns: 100 }
      );
    },
    30_000
  );

  it(
    '2h. Invalid enum value for status → ValidationError',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          invalidEnumArb(INQUIRY_STATUSES),
          async (invalidStatus) => {
            const doc = new Inquiry({
              name: 'John Doe',
              email: 'john@example.com',
              phone: '9876543210',
              message: 'I am interested in this property.',
              status: invalidStatus,
            });
            await expectValidationError(doc);
          }
        ),
        { numRuns: 100 }
      );
    },
    30_000
  );
});

// ---------------------------------------------------------------------------
// Testimonial model
// ---------------------------------------------------------------------------

describe('Testimonial model – Property 2: validation rejects invalid documents', () => {
  it(
    '2i. Missing required fields (clientName, message, or rating) → ValidationError',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          fc.record({
            omitClientName: fc.boolean(),
            omitMessage: fc.boolean(),
            omitRating: fc.boolean(),
          }).filter(
            ({ omitClientName, omitMessage, omitRating }) =>
              omitClientName || omitMessage || omitRating
          ),
          async ({ omitClientName, omitMessage, omitRating }) => {
            const data = {};
            if (!omitClientName) data.clientName = 'Jane Smith';
            if (!omitMessage) data.message = 'Excellent service!';
            if (!omitRating) data.rating = 5;

            const doc = new Testimonial(data);
            await expectValidationError(doc);
          }
        ),
        { numRuns: 100 }
      );
    },
    30_000
  );

  it(
    '2j. Rating below min (< 1) → ValidationError',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate integers strictly below 1 (0 and negatives)
          fc.integer({ max: 0 }),
          async (invalidRating) => {
            const doc = new Testimonial({
              clientName: 'Jane Smith',
              message: 'Excellent service!',
              rating: invalidRating,
            });
            await expectValidationError(doc);
          }
        ),
        { numRuns: 100 }
      );
    },
    30_000
  );

  it(
    '2k. Rating above max (> 5) → ValidationError',
    async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate integers strictly above 5
          fc.integer({ min: 6 }),
          async (invalidRating) => {
            const doc = new Testimonial({
              clientName: 'Jane Smith',
              message: 'Excellent service!',
              rating: invalidRating,
            });
            await expectValidationError(doc);
          }
        ),
        { numRuns: 100 }
      );
    },
    30_000
  );
});
