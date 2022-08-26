/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const favoritasSlice = createSlice({
  name: 'favoritas',
  initialState: {
    actividades: [],
  },
  reducers: {
    setFavoritas: (state, action) => {
      state.actividades = action.payload;
    },
  },
});

export const { setFavoritas } = favoritasSlice.actions;

export default favoritasSlice.reducer;
