import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loaisp: {},
};

export const IDLoaiSPSlice = createSlice({
  name: "setidloaisp",
  initialState,
  reducers: {
    setidloaisp: (state, action) => {
      state.loaisp = action.payload;
    },
    DeleteLoaisp: (state) => {
      state.loaisp = {};
    },
  },
});

export const { setidloaisp, DeleteLoaisp } = IDLoaiSPSlice.actions;
export default IDLoaiSPSlice.reducer;
