import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance.js';

// Feature: hanuvansh-mern-estate
// Auth slice: manages admin authentication state with JWT stored in localStorage.
// Requirements: 15.1, 15.2, 15.3, 15.4, 15.5

export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token } = response.data.data;
      localStorage.setItem('adminToken', token);
      return token;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('adminToken') || null,
    isAuthenticated: !!localStorage.getItem('adminToken'),
    loading: false,
    error: null,
  },
  reducers: {
    logoutAdmin(state) {
      localStorage.removeItem('adminToken');
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.token = null;
      });
  },
});

export const { logoutAdmin } = authSlice.actions;
export default authSlice.reducer;
