import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chitietsp: {},
};

export const chitietsanphamonl = createSlice({
  name: "setchitietsp",
  initialState,
  reducers: {
    setchitietsp: (state, action) => {
      state.chitietsp = action.payload;
    },
    Deletechitietsp: (state) => {
      state.chitietsp = {};
    },
  },
});

export const { setchitietsp, Deletechitietsp } = chitietsanphamonl.actions;
export default chitietsanphamonl.reducer;
