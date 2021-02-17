import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: "text",
  initialState: {
    text: null,
  },
  reducers: {
    grabText: (state, action) => {
      state.text = action.payload;
    },
    releaseText: (state) => {
      state.text = null;
    },
  },
});

export const selectText = (state) => state.text.text;

export const { grabText, releaseText } = textSlice.actions;

export default textSlice.reducer;
