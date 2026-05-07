import { Router } from 'express';
import {
  getTestimonials,
  createTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = Router();

// ── Public routes ─────────────────────────────────────────────────────────────

// GET /api/testimonials — list all testimonials sorted by createdAt desc
router.get('/', getTestimonials);

// ── Admin-only routes ─────────────────────────────────────────────────────────

// POST /api/testimonials — create a new testimonial
router.post('/', authMiddleware, adminMiddleware, createTestimonial);

// DELETE /api/testimonials/:id — delete a testimonial
router.delete('/:id', authMiddleware, adminMiddleware, deleteTestimonial);

export default router;
