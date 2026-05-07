import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['Apartment', 'Villa', 'Plot', 'Commercial', 'Penthouse'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  configuration: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Sold', 'Under Construction'],
    required: true,
  },
  amenities: [
    {
      type: String,
      trim: true,
    },
  ],
  images: [
    {
      type: String, // Cloudinary secure URLs
    },
  ],
  mapCoordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
  nearbyPlaces: [
    {
      type: String,
      trim: true,
    },
  ],
  description: {
    type: String,
    trim: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for filter queries
propertySchema.index({ type: 1 });
propertySchema.index({ status: 1 });
propertySchema.index({ featured: 1 });
propertySchema.index({ price: 1 });

const Property = mongoose.model('Property', propertySchema);

export default Property;
