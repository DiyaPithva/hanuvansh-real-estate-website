import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { register, login } from '../controllers/authController.js';

/**
 * Rate limiter applied only to the login endpoint.
 * 10 requests per 15-minute window per IP.
 */
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    success: false,
    message: 'Too many login attempts. Try again in 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const router = Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login  (rate-limited)
router.post('/login', loginRateLimiter, login);

export default router;
