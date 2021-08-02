import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import ingredientsSlice from './ingredients';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ingredients: ingredientsSlice.reducer,
  },
});

export default store;
