import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axiosInstance.js';

// Feature: hanuvansh-mern-estate
// Properties slice: manages property listings, filters, pagination, and CRUD operations.
// Requirements: 4.1, 4.2, 4.3, 4.5, 4.6, 4.7, 12.1, 12.2, 12.3, 12.4

export const fetchProperties = createAsyncThunk(
  'properties/fetchProperties',
  async ({ filters = {}, page = 1 } = {}, { rejectWithValue }) => {
    try {
      const params = { page };
      if (filters.type) params.type = filters.type;
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.configuration) params.configuration = filters.configuration;
      if (filters.status) params.status = filters.status;

      const response = await api.get('/properties', { params });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch properties.'
      );
    }
  }
);

export const fetchFeaturedProperties = createAsyncThunk(
  'properties/fetchFeaturedProperties',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/properties/featured');
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch featured properties.'
      );
    }
  }
);

export const fetchPropertyById = createAsyncThunk(
  'properties/fetchPropertyById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to fetch property.'
      );
    }
  }
);

export const createProperty = createAsyncThunk(
  'properties/createProperty',
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await api.post('/properties', propertyData);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to create property.'
      );
    }
  }
);

export const updateProperty = createAsyncThunk(
  'properties/updateProperty',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/properties/${id}`, data);
      return response.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update property.'
      );
    }
  }
);

export const deleteProperty = createAsyncThunk(
  'properties/deleteProperty',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/properties/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to delete property.'
      );
    }
  }
);

const propertiesSlice = createSlice({
  name: 'properties',
  initialState: {
    items: [],
    featured: [],
    selected: null,
    pagination: {
      page: 1,
      totalPages: 1,
      total: 0,
      pageSize: 12,
    },
    filters: {
      type: '',
      minPrice: '',
      maxPrice: '',
      configuration: '',
      status: '',
    },
    loading: false,
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    // fetchProperties
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.properties ?? action.payload.items ?? action.payload;
        if (action.payload.pagination) {
          state.pagination = { ...state.pagination, ...action.payload.pagination };
        }
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchFeaturedProperties
    builder
      .addCase(fetchFeaturedProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeaturedProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload.properties ?? action.payload;
      })
      .addCase(fetchFeaturedProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // fetchPropertyById
    builder
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selected = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selected = action.payload.property ?? action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // createProperty
    builder
      .addCase(createProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.loading = false;
        const property = action.payload.property ?? action.payload;
        state.items.unshift(property);
      })
      .addCase(createProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // updateProperty
    builder
      .addCase(updateProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
        const property = action.payload.property ?? action.payload;
        const index = state.items.findIndex((p) => p._id === property._id);
        if (index !== -1) {
          state.items[index] = property;
        }
        if (state.selected?._id === property._id) {
          state.selected = property;
        }
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // deleteProperty
    builder
      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((p) => p._id !== action.payload);
        if (state.selected?._id === action.payload) {
          state.selected = null;
        }
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters } = propertiesSlice.actions;
export default propertiesSlice.reducer;
