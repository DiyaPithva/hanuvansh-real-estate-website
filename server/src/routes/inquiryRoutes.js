import { Router } from 'express';
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from '../controllers/inquiryController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = Router();

// ── Public routes ─────────────────────────────────────────────────────────────

// POST /api/inquiries — submit a new inquiry
router.post('/', createInquiry);

// ── Admin-only routes ─────────────────────────────────────────────────────────

// GET /api/inquiries — list all inquiries sorted by createdAt desc
router.get('/', authMiddleware, adminMiddleware, getInquiries);

// PUT /api/inquiries/:id — update inquiry status
router.put('/:id', authMiddleware, adminMiddleware, updateInquiryStatus);

// DELETE /api/inquiries/:id — delete an inquiry
router.delete('/:id', authMiddleware, adminMiddleware, deleteInquiry);

export default router;
