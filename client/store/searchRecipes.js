/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  results: [],
  sortBy: 'used',
};

const searchRecipesSlice = createSlice({
  name: 'searchRecipes',
  initialState,
  reducers: {
    sort: (state, action) => {
      state.sortBy = action.payload;
    },
    set: (state, action) => {
      state.results = action.payload;
    },
  },
});
export const searchRecipesActions = searchRecipesSlice.actions;

export default searchRecipesSlice;
