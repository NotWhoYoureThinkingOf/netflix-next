import { createSlice } from "@reduxjs/toolkit";

const inputSlice = createSlice({
  name: "input",
  initialState: {
    input: null,
  },
  reducers: {
    grabInput: (state, action) => {
      state.input = action.payload;
    },
    releaseInput: (state) => {
      state.input = null;
    },
  },
});

export const selectInput = (state) => state.input.input;

export const { grabInput, releaseInput } = inputSlice.actions;

export default inputSlice.reducer;
