import { Router } from 'express';
import {
  getProperties,
  getFeaturedProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/propertyController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = Router();

// ── Public routes ─────────────────────────────────────────────────────────────

// GET /api/properties — paginated list with optional filters
router.get('/', getProperties);

// GET /api/properties/featured — must be declared before /:id to avoid conflict
router.get('/featured', getFeaturedProperties);

// GET /api/properties/:id — single property by ObjectId
router.get('/:id', getPropertyById);

// ── Admin-only routes ─────────────────────────────────────────────────────────

// POST /api/properties — create a new property
router.post('/', authMiddleware, adminMiddleware, createProperty);

// PUT /api/properties/:id — update an existing property
router.put('/:id', authMiddleware, adminMiddleware, updateProperty);

// DELETE /api/properties/:id — delete a property
router.delete('/:id', authMiddleware, adminMiddleware, deleteProperty);

export default router;
