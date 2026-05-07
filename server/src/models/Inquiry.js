import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
  },
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    default: null,
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Closed'],
    default: 'New',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for admin sorting/filtering
inquirySchema.index({ status: 1 });
inquirySchema.index({ createdAt: -1 });

const Inquiry = mongoose.model('Inquiry', inquirySchema);

export default Inquiry;
