import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
  name: "role",
  initialState: {
    role: null,
  },
  reducers: {
    grabRole: (state, action) => {
      state.role = action.payload;
    },
    releaseRole: (state) => {
      state.role = null;
    },
  },
});

export const { grabRole, releaseRole } = roleSlice.actions;

export const selectRole = (state) => state.role.role;

export default roleSlice.reducer;
