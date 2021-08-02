/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingredients: [],
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    set: (state, action) => {
      state.ingredients = action.payload;
    },
  },
});

export const ingredientsActions = ingredientsSlice.actions;

export default ingredientsSlice;
