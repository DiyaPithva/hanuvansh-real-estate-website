import mongoose from 'mongoose';
import Property from '../models/Property.js';
import { AppError } from '../middleware/errorHandler.js';

/**
 * GET /api/properties
 * Query params: type, minPrice, maxPrice, configuration, status, page (default 1)
 * Returns paginated list of properties with optional filters applied.
 */
export const getProperties = async (req, res, next) => {
  try {
    const { type, minPrice, maxPrice, configuration, status, page = 1 } = req.query;

    const query = {};

    if (type) {
      query.type = type;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (configuration) {
      query.configuration = { $regex: configuration, $options: 'i' };
    }

    if (status) {
      query.status = status;
    }

    const pageSize = 12;
    const pageNum = Math.max(1, Number(page));
    const skip = (pageNum - 1) * pageSize;

    const [properties, total] = await Promise.all([
      Property.find(query).skip(skip).limit(pageSize),
      Property.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / pageSize);

    return res.json({
      success: true,
      data: {
        properties,
        pagination: {
          page: pageNum,
          totalPages,
          total,
          pageSize,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/properties/featured
 * Returns all properties where featured === true.
 */
export const getFeaturedProperties = async (req, res, next) => {
  try {
    const properties = await Property.find({ featured: true });

    return res.json({
      success: true,
      data: { properties },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * GET /api/properties/:id
 * Returns a single property by MongoDB ObjectId.
 * Throws 404 if the id is invalid or the document does not exist.
 */
export const getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError('Property not found', 404);
    }

    const property = await Property.findById(id);

    if (!property) {
      throw new AppError('Property not found', 404);
    }

    return res.json({
      success: true,
      data: { property },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/properties  (Admin-only)
 * Body: { name, location, type, price, configuration, status, ...optional fields }
 * Creates a new Property document and returns it with HTTP 201.
 */
export const createProperty = async (req, res, next) => {
  try {
    const { name, location, type, price, configuration, status } = req.body;

    if (!name || !location || !type || price === undefined || price === null || price === '' || !configuration || !status) {
      throw new AppError(
        'name, location, type, price, configuration, and status are required',
        400
      );
    }

    const property = await Property.create(req.body);

    return res.status(201).json({
      success: true,
      data: { property },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * PUT /api/properties/:id  (Admin-only)
 * Body: { name, location, type, price, configuration, status, ...optional fields }
 * Updates an existing Property document and returns the updated version.
 */
export const updateProperty = async (req, res, next) => {
  try {
    const { name, location, type, price, configuration, status } = req.body;

    if (!name || !location || !type || price === undefined || price === null || price === '' || !configuration || !status) {
      throw new AppError(
        'name, location, type, price, configuration, and status are required',
        400
      );
    }

    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!property) {
      throw new AppError('Property not found', 404);
    }

    return res.json({
      success: true,
      data: { property },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/properties/:id  (Admin-only)
 * Deletes a Property document by id.
 * Throws 404 if the document does not exist.
 */
export const deleteProperty = async (req, res, next) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      throw new AppError('Property not found', 404);
    }

    return res.status(200).json({
      success: true,
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
