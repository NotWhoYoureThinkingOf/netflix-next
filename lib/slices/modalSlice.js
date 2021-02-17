import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modal: false,
  },
  reducers: {
    openModal: (state) => {
      state.modal = true;
    },
    closeModal: (state) => {
      state.modal = false;
    },
  },
});

export const selectModal = (state) => state.modal.modal;

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
