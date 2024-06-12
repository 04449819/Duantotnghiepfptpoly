import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  idCTSP: "",
};

export const IDchitietsanphamSlice = createSlice({
  name: "getID",
  initialState,
  reducers: {
    GetIDCTSP: (state, action) => {
      state.idCTSP = action.payload;
    },
  },
});

export const { GetIDCTSP } = IDchitietsanphamSlice.actions;
export default IDchitietsanphamSlice.reducer;
