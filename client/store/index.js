import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import ingredientsSlice from './ingredients';
import recipesSlice from './recipes';
import paginationSlice from './pagination';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    recipes: recipesSlice.reducer,
    pagination: paginationSlice.reducer,
  },
});

export default store;
