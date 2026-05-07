import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance.js';

// Feature: hanuvansh-mern-estate
// Testimonials slice: manages testimonial list for public display and admin management.
// Requirements: 7.1, 7.2, 7.3, 16.8

export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchTestimonials',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/testimonials');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch testimonials.'
      );
    }
  }
);

export const createTestimonial = createAsyncThunk(
  'testimonials/createTestimonial',
  async (testimonialData, { rejectWithValue }) => {
    try {
      const response = await api.post('/testimonials', testimonialData);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create testimonial.'
      );
    }
  }
);

export const deleteTestimonial = createAsyncThunk(
  'testimonials/deleteTestimonial',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/testimonials/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete testimonial.'
      );
    }
  }
);

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetchTestimonials
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.testimonials ?? action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // createTestimonial
    builder
      .addCase(createTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        const testimonial = action.payload.testimonial ?? action.payload;
        state.items.unshift(testimonial);
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // deleteTestimonial
    builder
      .addCase(deleteTestimonial.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((t) => t._id !== action.payload);
      })
      .addCase(deleteTestimonial.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default testimonialsSlice.reducer;
