/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipes: [],
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    set: (state, action) => {
      state.recipes = action.payload;
    },
  },
});
export const recipesActions = recipesSlice.actions;

export default recipesSlice;
