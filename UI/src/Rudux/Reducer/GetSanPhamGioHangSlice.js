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
      if (res.data.length === 0) {
        toast.error("Thông tin sản phẩm không chính xác");
      }

      return res.data;
    } catch (error) {
      toast.error("Thông tin sản phẩm không chính xác");
    }
  }
);

export const GetChiTietHoaDonByIdHoaDon = createAsyncThunk(
  "featchdata/GetChiTietHoaDonByIdHoaDon",
  async (hoaDonId) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/SanPham/GetChiTietSanPhamByIdHD?hoaDonId=${hoaDonId}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching invoice details:", error);
      // Optionally: Handle errors gracefully (e.g., display error message)
      throw error; // Re-throw the error for potential handling in extraReducers
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
    UpdateSoLuong: (state, action) => {
      const data = state.SanPhamGioHang.map((item) => {
        if (item.idCTSP === action.payload.idctsp) {
          if (action.payload.soluong <= item.soLuong) {
            return { ...item, soLuongmua: action.payload.soluong };
          } else {
            return { ...item, soLuongmua: item.soLuong };
          }
        }
        return item;
      });
      state.SanPhamGioHang = data;
    },
    resetSanPhamGioHang: (state) => {
      state.SanPhamGioHang = [];
      console.log("resetSanPhamGioHang:", state.SanPhamGioHang);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetChiTietHoaDonByIdHoaDon.fulfilled, (state, action) => {
      state.SanPhamGioHang = action.payload;
    });
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(FetchDataSanPhamGioHang.pending, (state, action) => {
      state.loadingdata = true;
      state.errordata = false;
    });
    builder.addCase(FetchDataSanPhamGioHang.fulfilled, (state, action) => {
      const payload = action.payload;
      if (!payload || !payload.idCTSP) {
        state.errordata = true;
        return;
      }

      const existingItem = state.SanPhamGioHang.find(
        (item) => item.idCTSP === payload.idCTSP
      );

      if (!existingItem) {
        state.SanPhamGioHang.push(payload);
      } else {
        state.SanPhamGioHang = state.SanPhamGioHang.map((item) => {
          if (item.idCTSP === payload.idCTSP) {
            return {
              ...item,
              soLuongmua: item.soLuongmua + payload.soLuongmua,
            };
          }
          return item;
        });
      }

      state.loadingdata = false;
      state.errordata = false;
    });
    builder.addCase(FetchDataSanPhamGioHang.rejected, (state, action) => {
      state.loadingdata = false;
      state.errordata = true;
    });
  },
});
export const { DeleteCTSP, UpdateSoLuong, resetSanPhamGioHang } = GetSanPhamGioHangSlice.actions;
export default GetSanPhamGioHangSlice.reducer;