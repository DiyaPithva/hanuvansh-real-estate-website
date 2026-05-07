import { Router } from 'express';
import upload from '../middleware/uploadMiddleware.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import { uploadImage } from '../controllers/uploadController.js';

const router = Router();

/**
 * POST /api/upload
 * Admin-only: authenticate → authorize → parse single image → upload to Cloudinary
 */
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  upload.single('image'),
  uploadImage
);

/**
 * Multer error handler for this router.
 * Catches oversized files and invalid file type errors before the global handler.
 */
// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res
      .status(400)
      .json({ success: false, message: 'File size exceeds 10MB limit' });
  }
  if (err.message === 'Invalid file type') {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid file type' });
  }
  next(err);
});

export default router;
