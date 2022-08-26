/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const loggedinSlice = createSlice({
  name: 'loggedin',
  initialState: {
    value: false,
  },
  reducers: {
    logout: (state) => {
      state.value = false;
    },
    login: (state) => {
      state.value = true;
    },
  },
});

export const { logout, login } = loggedinSlice.actions;

export default loggedinSlice.reducer;
