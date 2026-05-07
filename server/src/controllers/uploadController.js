import cloudinary from '../config/cloudinary.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Upload a single image to Cloudinary.
 *
 * Expects req.file to be populated by multer (memoryStorage).
 * Pipes the file buffer into cloudinary.uploader.upload_stream().
 *
 * Success response: { success: true, data: { url: <secure_url> } }
 * Failure: throws AppError with appropriate status code.
 */
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      throw new AppError('No file provided', 400);
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'hanuvansh' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    res.json({ success: true, data: { url: result.secure_url } });
  } catch (err) {
    // Distinguish Cloudinary errors from AppErrors
    if (err instanceof AppError) {
      return next(err);
    }
    console.error('[uploadController] Cloudinary upload error:', err);
    next(new AppError('Image upload failed', 500));
  }
};
