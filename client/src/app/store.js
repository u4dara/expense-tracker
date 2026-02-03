import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../features/auth/authSlice';
import categoryReducer from '../features/category/categorySlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
  },
});
