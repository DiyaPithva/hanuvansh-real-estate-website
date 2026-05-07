/**
 * HANUVANSH ESTATE CONSULTANT — Express Server
 * JSON-based data storage, no database required
 */

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

// ── Data file paths ──────────────────────────────────────────────────────────
const DATA_DIR = join(__dirname, 'src/data');
const PROPERTIES_FILE = join(DATA_DIR, 'properties.json');
const TESTIMONIALS_FILE = join(DATA_DIR, 'testimonials.json');
const INQUIRIES_FILE = join(DATA_DIR, 'inquiries.json');

// ── Helpers ──────────────────────────────────────────────────────────────────
const readJSON = (filePath) => JSON.parse(readFileSync(filePath, 'utf-8'));
const writeJSON = (filePath, data) => writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

// ── Middleware ───────────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({
  origin: CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'HANUVANSH ESTATE API is running' });
});

// ── Properties ───────────────────────────────────────────────────────────────
app.get('/api/properties', (req, res) => {
  try {
    let properties = readJSON(PROPERTIES_FILE);
    const { type, minPrice, maxPrice, configuration, status, search, page = 1, limit = 12 } = req.query;

    // Filters
    if (type) properties = properties.filter(p => p.type.toLowerCase() === type.toLowerCase());
    if (status) properties = properties.filter(p => p.status.toLowerCase() === status.toLowerCase());
    if (configuration) properties = properties.filter(p => p.configuration.toLowerCase().includes(configuration.toLowerCase()));
    if (minPrice) properties = properties.filter(p => p.price >= Number(minPrice));
    if (maxPrice) properties = properties.filter(p => p.price <= Number(maxPrice));
    if (search) {
      const q = search.toLowerCase();
      properties = properties.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
      );
    }

    // Pagination
    const total = properties.length;
    const pageNum = Number(page);
    const pageSize = Number(limit);
    const totalPages = Math.ceil(total / pageSize);
    const paginated = properties.slice((pageNum - 1) * pageSize, pageNum * pageSize);

    res.json({
      success: true,
      data: {
        properties: paginated,
        pagination: { page: pageNum, totalPages, total, pageSize }
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load properties' });
  }
});

app.get('/api/properties/featured', (req, res) => {
  try {
    const properties = readJSON(PROPERTIES_FILE);
    const featured = properties.filter(p => p.featured);
    res.json({ success: true, data: featured });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load featured properties' });
  }
});

app.get('/api/properties/:id', (req, res) => {
  try {
    const properties = readJSON(PROPERTIES_FILE);
    const property = properties.find(p => p.id === req.params.id);
    if (!property) return res.status(404).json({ success: false, message: 'Property not found' });
    res.json({ success: true, data: property });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load property' });
  }
});

// ── Testimonials ─────────────────────────────────────────────────────────────
app.get('/api/testimonials', (req, res) => {
  try {
    const testimonials = readJSON(TESTIMONIALS_FILE);
    res.json({ success: true, data: testimonials });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to load testimonials' });
  }
});

// ── Inquiries ─────────────────────────────────────────────────────────────────
app.post('/api/inquiries', (req, res) => {
  try {
    const { name, email, phone, message, propertyId, propertyName } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and message are required'
      });
    }

    const inquiries = readJSON(INQUIRIES_FILE);
    const newInquiry = {
      id: `inq-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim(),
      propertyId: propertyId || null,
      propertyName: propertyName || null,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    inquiries.push(newInquiry);
    writeJSON(INQUIRIES_FILE, inquiries);

    res.status(201).json({ success: true, data: newInquiry });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to submit inquiry' });
  }
});

// ── Global error handler ──────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🏛️  HANUVANSH ESTATE API running on http://localhost:${PORT}`);
  console.log(`📁  Data stored in: ${DATA_DIR}\n`);
});

export default app;
