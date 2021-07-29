/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.userId = null;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
