import { configureStore } from "@reduxjs/toolkit";
import taiKhoanSlice from "./Reducer/taiKhoanSlice";

export const store = configureStore({
  reducer: {
    user: taiKhoanSlice,
  },
});
