import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  User: {},
  loadingdata: true,
  errordata: true,
};

export const FetchData = createAsyncThunk(
  "featchdata/sinhvien",
  async ({ name, pass }) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/QuanLyNguoiDung/DangNhap?lg=${name}&password=${pass}`
      );
      return res.data;
    } catch (error) {
      toast.error("chưa điền thông tin");
    }
  }
);

export const taiKhoanSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LogOutTaiKhoan: (state) => {
      state.User = {};
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(FetchData.pending, (state, action) => {
      state.loadingdata = true;
      state.errordata = false;
    });
    builder.addCase(FetchData.fulfilled, (state, action) => {
      state.User = action.payload;
      state.loadingdata = false;
      state.errordata = false;
    });
    builder.addCase(FetchData.rejected, (state, action) => {
      state.loadingdata = false;
      state.errordata = true;
    });
  },
});
export const { LogOutTaiKhoan } = taiKhoanSlice.actions;
export default taiKhoanSlice.reducer;
