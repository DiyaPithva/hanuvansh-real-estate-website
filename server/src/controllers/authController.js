import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * Sign a JWT for the given user.
 * @param {{ _id: string, role: string }} user
 * @returns {string} signed JWT
 */
const signToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

/**
 * POST /api/auth/register
 * Body: { name, email, password }
 * Returns: { success: true, data: { token } }
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      throw new AppError('name, email, and password are required', 400);
    }

    // Check for duplicate email
    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      throw new AppError('An account with that email already exists', 400);
    }

    // Create user — password is hashed by the pre-save hook
    const user = await User.create({ name, email, password });

    const token = signToken(user);

    return res.status(201).json({ success: true, data: { token } });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { success: true, data: { token, user: { id, name, email, role } } }
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      throw new AppError('email and password are required', 400);
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = signToken(user);

    return res.status(200).json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};
