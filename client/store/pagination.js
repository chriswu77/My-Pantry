/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  totalPages: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    changePage: (state, action) => {
      state.currentPage = action.payload;
    },
    goToPrev: (state) => {
      state.currentPage -= 1;
    },
    goToNext: (state) => {
      state.currentPage += 1;
    },
    setTotal: (state, action) => {
      state.totalPages = action.payload;
    },
  },
});
export const paginationActions = paginationSlice.actions;

export default paginationSlice;
