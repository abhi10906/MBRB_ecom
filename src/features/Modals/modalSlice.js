// src/features/modal/modalSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  type: null, // 'modal' or 'drawer'
  props: {}, // Additional props to pass to the modal/drawer
};

const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.type = action.payload.type; // 'modal' or 'drawer'
      state.props = action.payload.props || {};
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.props = {};
    },
  },
});

export const { openModal, closeModal } = ModalSlice.actions;

export default ModalSlice.reducer;
