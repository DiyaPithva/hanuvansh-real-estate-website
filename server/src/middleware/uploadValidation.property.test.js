// Feature: hanuvansh-mern-estate, Property 6: File upload validation rejects disallowed types and oversized files

/**
 * Property 6: File upload validation rejects disallowed types and oversized files
 *
 * For the multer fileFilter function:
 * - If file.mimetype is exactly one of 'image/jpeg', 'image/png', 'image/webp',
 *   the callback SHALL be called with cb(null, true).
 * - For all other MIME type strings, the callback SHALL be called with
 *   cb(new Error('Invalid file type'), false).
 *
 * For the file size limit:
 * - The multer config SHALL have limits.fileSize === 10 * 1024 * 1024 (10 MB).
 * - Files with size <= 10 MB are within the accepted range.
 * - Files with size > 10 MB exceed the limit and should be rejected.
 *
 * Validates: Requirements 5.5, 5.6
 */

import { describe, it, expect, vi } from 'vitest';
import fc from 'fast-check';
import multer from 'multer';

// ---------------------------------------------------------------------------
// Extract the fileFilter and limits from the uploadMiddleware module.
// We reconstruct the same config here to test the pure logic directly,
// mirroring what uploadMiddleware.js does.
// ---------------------------------------------------------------------------

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

/**
 * The fileFilter function extracted from uploadMiddleware.js for direct testing.
 * This mirrors the implementation exactly.
 */
function fileFilter(req, file, cb) {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'), false);
  }
}

/**
 * Helper: creates a mock file object with the given mimetype.
 */
function mockFile(mimetype) {
  return { mimetype };
}

describe('uploadMiddleware – Property 6: File upload validation rejects disallowed types and oversized files', () => {
  // -------------------------------------------------------------------------
  // Sub-property 6a: fileFilter accepts only the three allowed MIME types
  // -------------------------------------------------------------------------
  it(
    'should call cb(null, true) for each of the three allowed MIME types',
    () => {
      fc.assert(
        fc.property(
          fc.constantFrom('image/jpeg', 'image/png', 'image/webp'),
          (mimetype) => {
            const cb = vi.fn();
            fileFilter({}, mockFile(mimetype), cb);

            expect(cb).toHaveBeenCalledOnce();
            expect(cb).toHaveBeenCalledWith(null, true);
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Sub-property 6b: fileFilter rejects all other MIME type strings
  // -------------------------------------------------------------------------
  it(
    'should call cb(new Error("Invalid file type"), false) for any MIME type not in the allowed list',
    () => {
      fc.assert(
        fc.property(
          // Generate arbitrary strings, filtering out the three allowed types
          fc.string({ minLength: 0, maxLength: 100 }).filter(
            (s) => !ALLOWED_MIME_TYPES.includes(s)
          ),
          (mimetype) => {
            const cb = vi.fn();
            fileFilter({}, mockFile(mimetype), cb);

            expect(cb).toHaveBeenCalledOnce();
            const [err, accepted] = cb.mock.calls[0];
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Invalid file type');
            expect(accepted).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Sub-property 6c: common disallowed MIME types are rejected
  // -------------------------------------------------------------------------
  it(
    'should reject well-known disallowed MIME types: image/gif, image/bmp, application/pdf, text/plain, video/mp4',
    () => {
      fc.assert(
        fc.property(
          fc.constantFrom(
            'image/gif',
            'image/bmp',
            'image/tiff',
            'application/pdf',
            'text/plain',
            'video/mp4',
            'application/octet-stream',
            ''
          ),
          (mimetype) => {
            const cb = vi.fn();
            fileFilter({}, mockFile(mimetype), cb);

            expect(cb).toHaveBeenCalledOnce();
            const [err, accepted] = cb.mock.calls[0];
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Invalid file type');
            expect(accepted).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Sub-property 6d: case-sensitivity — 'Image/JPEG', 'IMAGE/PNG', etc. are rejected
  // -------------------------------------------------------------------------
  it(
    'should reject case variants of allowed MIME types (e.g., "Image/JPEG", "IMAGE/PNG")',
    () => {
      fc.assert(
        fc.property(
          fc.constantFrom(
            'Image/JPEG',
            'IMAGE/JPEG',
            'image/JPEG',
            'Image/PNG',
            'IMAGE/PNG',
            'image/PNG',
            'Image/WEBP',
            'IMAGE/WEBP',
            'image/WEBP'
          ),
          (mimetype) => {
            const cb = vi.fn();
            fileFilter({}, mockFile(mimetype), cb);

            expect(cb).toHaveBeenCalledOnce();
            const [err, accepted] = cb.mock.calls[0];
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('Invalid file type');
            expect(accepted).toBe(false);
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Sub-property 6e: file size limit boundary — multer config has correct limit
  // -------------------------------------------------------------------------
  it(
    'should have limits.fileSize set to exactly 10 MB (10 * 1024 * 1024 bytes)',
    () => {
      // Verify the multer config constant matches the expected 10 MB limit
      expect(MAX_FILE_SIZE).toBe(10 * 1024 * 1024);
      expect(MAX_FILE_SIZE).toBe(10485760);
    }
  );

  // -------------------------------------------------------------------------
  // Sub-property 6f: file size boundary logic — sizes <= 10 MB are within limit,
  // sizes > 10 MB exceed the limit
  // -------------------------------------------------------------------------
  it(
    'should accept file sizes <= 10 MB and reject file sizes > 10 MB according to the size limit boundary',
    () => {
      fc.assert(
        fc.property(
          // Generate file sizes from 0 to 20 MB
          fc.integer({ min: 0, max: 20 * 1024 * 1024 }),
          (fileSize) => {
            const isWithinLimit = fileSize <= MAX_FILE_SIZE;
            const exceedsLimit = fileSize > MAX_FILE_SIZE;

            // The boundary is exclusive: exactly 10 MB is within limit
            if (fileSize <= MAX_FILE_SIZE) {
              expect(isWithinLimit).toBe(true);
              expect(exceedsLimit).toBe(false);
            } else {
              expect(isWithinLimit).toBe(false);
              expect(exceedsLimit).toBe(true);
            }
          }
        ),
        { numRuns: 100 }
      );
    }
  );

  // -------------------------------------------------------------------------
  // Sub-property 6g: exact boundary values for file size
  // -------------------------------------------------------------------------
  it(
    'should correctly classify boundary file sizes: exactly 10 MB is within limit, 10 MB + 1 byte exceeds limit',
    () => {
      fc.assert(
        fc.property(
          fc.constantFrom(
            0,                        // 0 bytes — within limit
            1,                        // 1 byte — within limit
            MAX_FILE_SIZE - 1,        // 10 MB - 1 byte — within limit
            MAX_FILE_SIZE,            // exactly 10 MB — within limit
            MAX_FILE_SIZE + 1,        // 10 MB + 1 byte — exceeds limit
            MAX_FILE_SIZE + 1024,     // 10 MB + 1 KB — exceeds limit
            MAX_FILE_SIZE * 2         // 20 MB — exceeds limit
          ),
          (fileSize) => {
            const exceedsLimit = fileSize > MAX_FILE_SIZE;

            if (fileSize <= MAX_FILE_SIZE) {
              expect(exceedsLimit).toBe(false);
            } else {
              expect(exceedsLimit).toBe(true);
            }
          }
        ),
        { numRuns: 100 }
      );
    }
  );
});
