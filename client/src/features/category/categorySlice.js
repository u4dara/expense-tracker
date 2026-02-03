import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import categoryService from './categoryService';

// Create New Category
export const createCategory = createAsyncThunk(
  'category/create',
  async (category, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await categoryService.createCategory(category, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

const initialState = {
  categories: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    reset: () => initialState,
  },
});

export const { reset } = categorySlice.actions;

export default categorySlice.reducer;
