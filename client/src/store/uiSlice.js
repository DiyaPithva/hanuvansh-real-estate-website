import { createSlice } from '@reduxjs/toolkit';

// Feature: hanuvansh-mern-estate
// UI slice: manages global toast notification state.
// Requirements: 18.4, 17.7

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    toastMessage: null,
    toastType: null, // 'success' | 'error'
  },
  reducers: {
    showToast(state, action) {
      state.toastMessage = action.payload.toastMessage;
      state.toastType = action.payload.toastType;
    },
    clearToast(state) {
      state.toastMessage = null;
      state.toastType = null;
    },
  },
});

export const { showToast, clearToast } = uiSlice.actions;
export default uiSlice.reducer;
