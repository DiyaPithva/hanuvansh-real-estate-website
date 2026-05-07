// Feature: hanuvansh-mern-estate, Property 4: adminMiddleware allows only admin-role users

/**
 * Property 4: adminMiddleware allows only admin-role users
 *
 * For any role string attached to `req.user`:
 * - If `req.user.role === 'admin'`, the middleware SHALL call `next()` and
 *   NOT send any HTTP response.
 * - For all other role values (arbitrary strings, empty string, undefined,
 *   null, or a missing `req.user`), the middleware SHALL respond HTTP 403
 *   with "Forbidden: Admin access required" and NOT call `next()`.
 *
 * Validates: Requirements 3.6, 3.7
 */

import { describe, it, expect, vi } from 'vitest';
import fc from 'fast-check';
import { adminMiddleware } from './adminMiddleware.js';

/**
 * Creates a mock req/res/next triple for testing the middleware.
 * @param {string|undefined} role - The role to set on req.user
 * @param {boolean} [omitUser=false] - If true, req.user is not set at all
 */
function createMocks(role, omitUser = false) {
  const req = omitUser
    ? {}
    : { user: { role } };

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

describe('adminMiddleware – Property 4: adminMiddleware allows only admin-role users', () => {
  // -------------------------------------------------------------------------
  // Admin role sub-property: middleware calls next() for role === 'admin'
  // -------------------------------------------------------------------------
  it(
    'should call next() and send no response when req.user.role is exactly "admin"',
    () => {
      fc.assert(
        fc.property(
          fc.constant('admin'),
          (role) => {
            const { req, res, next } = createMocks(role);

            adminMiddleware(req, res, next);

            // next() must have been called exactly once
            expect(next).toHaveBeenCalledOnce();
            // No HTTP response should have been sent
            expect(res._status).toBeNull();
            expect(res._body).toBeNull();
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Non-admin role sub-property: arbitrary role strings receive HTTP 403
  // -------------------------------------------------------------------------
  it(
    'should respond HTTP 403 and NOT call next() for any role string that is not exactly "admin"',
    () => {
      fc.assert(
        fc.property(
          // Generate arbitrary strings, filtering out the exact value 'admin'
          fc.string({ minLength: 0, maxLength: 50 }).filter((s) => s !== 'admin'),
          (role) => {
            const { req, res, next } = createMocks(role);

            adminMiddleware(req, res, next);

            // next() must NOT have been called
            expect(next).not.toHaveBeenCalled();
            // Response must be HTTP 403
            expect(res._status).toBe(403);
            expect(res._body).toMatchObject({
              success: false,
              message: 'Forbidden: Admin access required',
            });
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Common non-admin roles: 'user', 'guest', empty string
  // -------------------------------------------------------------------------
  it(
    'should respond HTTP 403 for well-known non-admin roles: "user", "guest", and empty string',
    () => {
      fc.assert(
        fc.property(
          fc.constantFrom('user', 'guest', ''),
          (role) => {
            const { req, res, next } = createMocks(role);

            adminMiddleware(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res._status).toBe(403);
            expect(res._body).toMatchObject({
              success: false,
              message: 'Forbidden: Admin access required',
            });
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Missing req.user sub-property: no user object receives HTTP 403
  // -------------------------------------------------------------------------
  it(
    'should respond HTTP 403 and NOT call next() when req.user is undefined',
    () => {
      fc.assert(
        fc.property(
          fc.constant(undefined),
          () => {
            const { req, res, next } = createMocks(undefined, true);

            adminMiddleware(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res._status).toBe(403);
            expect(res._body).toMatchObject({
              success: false,
              message: 'Forbidden: Admin access required',
            });
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Case-sensitivity sub-property: 'Admin', 'ADMIN', etc. receive HTTP 403
  // -------------------------------------------------------------------------
  it(
    'should respond HTTP 403 for case variants of "admin" (e.g., "Admin", "ADMIN")',
    () => {
      fc.assert(
        fc.property(
          fc.constantFrom('Admin', 'ADMIN', 'aDmin', 'adMin', 'admIn', 'admiN'),
          (role) => {
            const { req, res, next } = createMocks(role);

            adminMiddleware(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(res._status).toBe(403);
            expect(res._body).toMatchObject({
              success: false,
              message: 'Forbidden: Admin access required',
            });
          }
        ),
        { numRuns: 100 }
      );
    }
  );
});
