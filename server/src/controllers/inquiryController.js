import Inquiry from '../models/Inquiry.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * POST /api/inquiries  (Public)
 * Body: { name, email, phone, message, propertyId? }
 * Validates required fields, creates an Inquiry document, returns HTTP 201.
 */
export const createInquiry = async (req, res, next) => {
  try {
    const { name, email, phone, message, propertyId } = req.body;

    const missing = [];
    if (!name) missing.push('name');
    if (!email) missing.push('email');
    if (!phone) missing.push('phone');
    if (!message) missing.push('message');

    if (missing.length > 0) {
      throw new AppError(
        `Missing required fields: ${missing.join(', ')}`,
        400
      );
    }

    const inquiryData = { name, email, phone, message };
    if (propertyId) {
      inquiryData.propertyId = propertyId;
    }

    const inquiry = await Inquiry.create(inquiryData);

    return res.status(201).json({
      success: true,
      data: { inquiry },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/inquiries  (Admin-only)
 * Returns all Inquiry documents sorted by createdAt descending.
 */
export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: { inquiries },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/inquiries/:id  (Admin-only)
 * Body: { status }
 * Updates the status field of an Inquiry document.
 * Throws 404 if the document does not exist.
 */
export const updateInquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      throw new AppError('Inquiry not found', 404);
    }

    return res.json({
      success: true,
      data: { inquiry },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/inquiries/:id  (Admin-only)
 * Deletes an Inquiry document by id.
 * Throws 404 if the document does not exist.
 */
export const deleteInquiry = async (req, res, next) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id);

    if (!inquiry) {
      throw new AppError('Inquiry not found', 404);
    }

    return res.json({
      success: true,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
