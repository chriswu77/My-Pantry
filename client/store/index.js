import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import ingredientsSlice from './ingredients';
import recipesSlice from './recipes';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    recipes: recipesSlice.reducer,
  },
});

export default store;
