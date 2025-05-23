// 📁 src/redux/slices/LaptopSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiRoutes from '../utils/apiRoutes';

// 🚀 Async thunk for fetching laptop data
export const fetchLaptops = createAsyncThunk(
  'laptops/fetchLaptops',
  async () => {
    const response = await fetch(apiRoutes.getAllLaptops());
    const data = await response.json();
    return data;
  }
);

const laptopSlice = createSlice({
  name: 'laptops',
  initialState: {
    laptopData: [],
    status: 'idle', // loading | succeeded | failed
  },
  reducers: {
    // 🧹 No extra reducers needed now
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaptops.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLaptops.fulfilled, (state, action) => {
        state.laptopData = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchLaptops.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default laptopSlice.reducer;
