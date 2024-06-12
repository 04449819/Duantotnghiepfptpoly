import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  SanPhamGioHang: [],
  loadingdata: true,
  errordata: true,
};
export const FetchDataSanPhamGioHang = createAsyncThunk(
  "featchdata/SanPhamGioHang",
  async (inputsearch) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/GetChiTietSanPhamByIDChiTietSanPham?id=${inputsearch}`
      );
      return res.data;
    } catch (error) {
      toast.error("Thông tin sản phẩm không chính xác");
    }
  }
);

export const GetSanPhamGioHangSlice = createSlice({
  name: "SanPhamGioHang",
  initialState,
  reducers: {
    DeleteCTSP: (state, action) => {
      state.SanPhamGioHang = state.SanPhamGioHang.filter(
        (p) => p.idCTSP !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(FetchDataSanPhamGioHang.pending, (state, action) => {
      state.loadingdata = true;
      state.errordata = false;
    });
    builder.addCase(FetchDataSanPhamGioHang.fulfilled, (state, action) => {
      const existingItem = state.SanPhamGioHang.find(
        (item) => item.idCTSP === action.payload.idCTSP
      );
      if (!existingItem) {
        state.SanPhamGioHang = [...state.SanPhamGioHang, action.payload];
      } else {
        const sanpham = state.SanPhamGioHang.map((item) => {
          if (item.idCTSP === action.payload.idCTSP)
            return {
              ...item,
              soLuongmua: item.soLuongmua + action.payload.soLuongmua,
            };
          return item;
        });
        state.SanPhamGioHang = sanpham;
      }

      state.loadingdata = false;
      state.errordata = false;
      console.log(">>>> hahaha", state.SanPhamGioHang);
    });
    builder.addCase(FetchDataSanPhamGioHang.rejected, (state, action) => {
      state.loadingdata = false;
      state.errordata = true;
    });
  },
});
export const { DeleteCTSP } = GetSanPhamGioHangSlice.actions;
export default GetSanPhamGioHangSlice.reducer;
