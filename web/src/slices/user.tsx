/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    nombre: '',
    apellidos: '',
  },
  reducers: {
    setUser: (state, action) => {
      state = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
