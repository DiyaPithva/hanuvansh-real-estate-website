import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance.js';

// Feature: hanuvansh-mern-estate
// Inquiries slice: manages admin inquiry list with status updates and deletion.
// Requirements: 6.3, 6.4, 6.5, 16.6, 16.7

export const fetchInquiries = createAsyncThunk(
  'inquiries/fetchInquiries',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/inquiries');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch inquiries.'
      );
    }
  }
);

export const updateInquiryStatus = createAsyncThunk(
  'inquiries/updateInquiryStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/inquiries/${id}`, { status });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update inquiry status.'
      );
    }
  }
);

export const deleteInquiry = createAsyncThunk(
  'inquiries/deleteInquiry',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/inquiries/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete inquiry.'
      );
    }
  }
);

const inquiriesSlice = createSlice({
  name: 'inquiries',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // fetchInquiries
    builder
      .addCase(fetchInquiries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.inquiries ?? action.payload;
      })
      .addCase(fetchInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // updateInquiryStatus
    builder
      .addCase(updateInquiryStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInquiryStatus.fulfilled, (state, action) => {
        state.loading = false;
        const inquiry = action.payload.inquiry ?? action.payload;
        const index = state.items.findIndex((i) => i._id === inquiry._id);
        if (index !== -1) {
          state.items[index] = inquiry;
        }
      })
      .addCase(updateInquiryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // deleteInquiry
    builder
      .addCase(deleteInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((i) => i._id !== action.payload);
      })
      .addCase(deleteInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default inquiriesSlice.reducer;
