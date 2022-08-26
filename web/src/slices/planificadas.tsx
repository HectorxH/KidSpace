/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const planificadasSlice = createSlice({
  name: 'planificadas',
  initialState: {
    actividades: [],
  },
  reducers: {
    setPlanificadas: (state, action) => {
      state.actividades = action.payload;
    },
  },
});

export const { setPlanificadas } = planificadasSlice.actions;

export default planificadasSlice.reducer;
