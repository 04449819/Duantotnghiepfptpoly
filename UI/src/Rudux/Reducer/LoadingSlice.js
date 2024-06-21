import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Loading: false,
};

export const LoadingSlice = createSlice({
  name: "setLoading",
  initialState,
  reducers: {
    SetLoading: (state, action) => {
      state.Loading = action.payload;
    },
  },
});

export const { SetLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;
