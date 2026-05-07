// Feature: hanuvansh-mern-estate, Property 3: JWT authMiddleware accepts valid tokens and rejects invalid ones

/**
 * Property 3: JWT authMiddleware accepts valid tokens and rejects invalid ones
 *
 * For any token string:
 * - If the token is a valid JWT signed with the correct JWT_SECRET and not expired,
 *   the middleware SHALL call `next()` and attach `req.user`.
 * - For all other tokens (arbitrary strings, tokens signed with a wrong secret,
 *   expired tokens), the middleware SHALL respond HTTP 401 with
 *   "Unauthorized: Invalid or expired token" and NOT call `next()`.
 *
 * Validates: Requirements 3.4, 3.5
 */

import { describe, it, expect, beforeAll, vi } from 'vitest';
import fc from 'fast-check';
import jwt from 'jsonwebtoken';

const TEST_SECRET = 'test-secret';

// Set JWT_SECRET before importing the middleware
beforeAll(() => {
  process.env.JWT_SECRET = TEST_SECRET;
});

// Dynamically import after env is set
let authMiddleware;
beforeAll(async () => {
  const mod = await import('./authMiddleware.js');
  authMiddleware = mod.authMiddleware;
});

/**
 * Creates a mock req/res/next triple for testing the middleware.
 */
function createMocks(authorizationHeader) {
  const req = {
    headers: authorizationHeader !== undefined
      ? { authorization: authorizationHeader }
      : {},
    user: undefined,
  };

  const res = {
    _status: null,
    _body: null,
    status(code) {
      this._status = code;
      return this;
    },
    json(body) {
      this._body = body;
      return this;
    },
  };

  const next = vi.fn();

  return { req, res, next };
}

describe('authMiddleware – Property 3: JWT authMiddleware accepts valid tokens and rejects invalid ones', () => {
  // -------------------------------------------------------------------------
  // Valid token sub-property: middleware calls next() and sets req.user
  // -------------------------------------------------------------------------
  it(
    'should call next() and attach req.user for any valid JWT signed with the correct secret',
    () => {
      fc.assert(
        fc.property(
          // Generate arbitrary non-empty payload objects (string keys, string values)
          fc.record({
            userId: fc.string({ minLength: 1, maxLength: 24 }),
            role: fc.constantFrom('admin', 'user', 'guest'),
          }),
          (payload) => {
            const token = jwt.sign(payload, TEST_SECRET, { expiresIn: '1h' });
            const { req, res, next } = createMocks(`Bearer ${token}`);

            authMiddleware(req, res, next);

            // next() must have been called exactly once
            expect(next).toHaveBeenCalledOnce();
            // req.user must be set and contain the original payload fields
            expect(req.user).toBeDefined();
            expect(req.user.userId).toBe(payload.userId);
            expect(req.user.role).toBe(payload.role);
            // res must NOT have been used (no 401 sent)
            expect(res._status).toBeNull();
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Invalid token sub-property: arbitrary strings receive HTTP 401
  // -------------------------------------------------------------------------
  it(
    'should respond HTTP 401 for arbitrary strings that are not valid JWTs signed with the correct secret',
    () => {
      fc.assert(
        fc.property(
          // Generate arbitrary strings; these will almost never be valid JWTs
          fc.string({ minLength: 0, maxLength: 200 }),
          (arbitraryToken) => {
            // Skip the rare case where the arbitrary string happens to be a
            // valid JWT signed with TEST_SECRET (astronomically unlikely but
            // we guard against it to keep the property sound).
            try {
              jwt.verify(arbitraryToken, TEST_SECRET);
              // If verification succeeds, skip this sample
              return;
            } catch {
              // Expected: the string is not a valid JWT — proceed with assertion
            }

            const { req, res, next } = createMocks(`Bearer ${arbitraryToken}`);

            authMiddleware(req, res, next);

            // next() must NOT have been called
            expect(next).not.toHaveBeenCalled();
            // Response must be HTTP 401
            expect(res._status).toBe(401);
            expect(res._body).toMatchObject({
              success: false,
              message: 'Unauthorized: Invalid or expired token',
            });
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Wrong-secret sub-property: tokens signed with a different secret get 401
  // -------------------------------------------------------------------------
  it(
    'should respond HTTP 401 for tokens signed with a wrong secret',
    () => {
      fc.assert(
        fc.property(
          // Generate arbitrary non-empty strings as wrong secrets (exclude the real one)
          fc.string({ minLength: 1, maxLength: 50 }).filter((s) => s !== TEST_SECRET),
          fc.record({
            userId: fc.string({ minLength: 1, maxLength: 24 }),
          }),
          (wrongSecret, payload) => {
            const token = jwt.sign(payload, wrongSecret, { expiresIn: '1h' });
            const { req, res, next } = createMocks(`Bearer ${token}`);

            authMiddleware(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res._status).toBe(401);
            expect(res._body).toMatchObject({
              success: false,
              message: 'Unauthorized: Invalid or expired token',
            });
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Expired token sub-property: expired JWTs receive HTTP 401
  // -------------------------------------------------------------------------
  it(
    'should respond HTTP 401 for expired tokens',
    () => {
      fc.assert(
        fc.property(
          fc.record({
            userId: fc.string({ minLength: 1, maxLength: 24 }),
          }),
          (payload) => {
            // Sign with a past exp claim (1 second in the past)
            const token = jwt.sign(
              { ...payload, exp: Math.floor(Date.now() / 1000) - 1 },
              TEST_SECRET
            );
            const { req, res, next } = createMocks(`Bearer ${token}`);

            authMiddleware(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res._status).toBe(401);
            expect(res._body).toMatchObject({
              success: false,
              message: 'Unauthorized: Invalid or expired token',
            });
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Missing / malformed Authorization header sub-property
  // -------------------------------------------------------------------------
  it(
    'should respond HTTP 401 when Authorization header is missing or does not start with "Bearer "',
    () => {
      fc.assert(
        fc.property(
          // Generate strings that do NOT start with "Bearer " (or are empty)
          fc.oneof(
            fc.constant(''),
            fc.constant(undefined),
            fc.string({ minLength: 1, maxLength: 100 }).filter(
              (s) => !s.startsWith('Bearer ')
            )
          ),
          (badHeader) => {
            const { req, res, next } = createMocks(badHeader);

            authMiddleware(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res._status).toBe(401);
            expect(res._body).toMatchObject({
              success: false,
              message: 'Unauthorized: Invalid or expired token',
            });
          }
        ),
        { numRuns: 100 }
      );
    }
  );
});
