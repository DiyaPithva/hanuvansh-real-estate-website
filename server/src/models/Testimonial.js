import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  clientTitle: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  avatar: {
    type: String, // Cloudinary URL, optional
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for sorted retrieval
testimonialSchema.index({ createdAt: -1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
