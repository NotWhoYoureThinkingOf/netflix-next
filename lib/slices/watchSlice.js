import { createSlice } from "@reduxjs/toolkit";

const watchSlice = createSlice({
  name: "watch",
  initialState: {
    watch: null,
  },
  reducers: {
    grabWatch: (state, action) => {
      state.watch = action.payload;
    },
    releaseWatch: (state) => {
      state.watch = null;
    },
  },
});

export const selectWatch = (state) => state.watch.watch;

export const { grabWatch, releaseWatch } = watchSlice.actions;

export default watchSlice.reducer;
