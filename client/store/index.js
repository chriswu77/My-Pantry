import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth';
import ingredientsSlice from './ingredients';
import recipesSlice from './recipes';
import paginationSlice from './pagination';
import searchRecipes from './searchRecipes';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ingredients: ingredientsSlice.reducer,
    recipes: recipesSlice.reducer,
    pagination: paginationSlice.reducer,
    searchRecipes: searchRecipes.reducer,
  },
});

export default store;
