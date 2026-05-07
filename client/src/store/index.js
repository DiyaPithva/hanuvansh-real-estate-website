import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import propertiesReducer from './propertiesSlice.js';
import inquiriesReducer from './inquiriesSlice.js';
import testimonialsReducer from './testimonialsSlice.js';
import uiReducer from './uiSlice.js';

// Feature: hanuvansh-mern-estate
// Redux store combining all slices for the application.
// Requirements: 15.1, 15.2, 15.5, 12.1, 6.3, 7.1

const store = configureStore({
  reducer: {
    auth: authReducer,
    properties: propertiesReducer,
    inquiries: inquiriesReducer,
    testimonials: testimonialsReducer,
    ui: uiReducer,
  },
});

export default store;

// Auth
export { loginAdmin, logoutAdmin } from './authSlice.js';

// Properties
export {
  fetchProperties,
  fetchFeaturedProperties,
  fetchPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  setFilters,
} from './propertiesSlice.js';

// Inquiries
export {
  fetchInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from './inquiriesSlice.js';

// Testimonials
export {
  fetchTestimonials,
  createTestimonial,
  deleteTestimonial,
} from './testimonialsSlice.js';

// UI
export { showToast, clearToast } from './uiSlice.js';
