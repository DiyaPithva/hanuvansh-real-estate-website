import Testimonial from '../models/Testimonial.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * GET /api/testimonials  (Public)
 * Returns all Testimonial documents sorted by createdAt descending.
 */
export const getTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: { testimonials },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/testimonials  (Admin-only)
 * Body: { clientName, message, rating, clientTitle?, avatar? }
 * Validates required fields, creates a Testimonial document, returns HTTP 201.
 */
export const createTestimonial = async (req, res, next) => {
  try {
    const { clientName, message, rating } = req.body;

    const missing = [];
    if (!clientName) missing.push('clientName');
    if (!message) missing.push('message');
    if (rating === undefined || rating === null || rating === '') missing.push('rating');

    if (missing.length > 0) {
      throw new AppError(
        `Missing required fields: ${missing.join(', ')}`,
        400
      );
    }

    const testimonial = await Testimonial.create(req.body);

    return res.status(201).json({
      success: true,
      data: { testimonial },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/testimonials/:id  (Admin-only)
 * Deletes a Testimonial document by id.
 * Throws 404 if the document does not exist.
 */
export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

    if (!testimonial) {
      throw new AppError('Testimonial not found', 404);
    }

    return res.json({
      success: true,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
