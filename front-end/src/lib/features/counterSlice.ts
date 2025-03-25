import { createSlice } from "@reduxjs/toolkit";

// Définition de l'état initial
const initialState = {
  value: 0,
};

// Création du Slice Redux
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Export des actions
export const { increment, decrement, reset } = counterSlice.actions;

// Export du reducer
export default counterSlice.reducer;
