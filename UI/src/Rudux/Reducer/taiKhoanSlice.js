import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  User: {},
  giohangonl: [],
  loadingdata: true,
  errordata: true,
};

export const FetchData = createAsyncThunk(
  "featchdata/user",
  async ({ name, pass, dssp }) => {
    if (name.trim() === "") {
      toast.error("Tên tài khoản không hợp lệ !");
      return;
    }
    if (pass.trim() === "") {
      toast.error("Mật khẩu không hợp lệ !");
      return;
    }
    try {
      const res = await axios.post(
        `https://localhost:7095/api/QuanLyNguoiDung/DangNhap?lg=${name}&password=${pass}`,
        dssp
      );
      console.log("day là tttk", res.data);
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
      state.giohangonl = [];
    },
    SetDiachiChinhNhanHang: (state, action) => {
      const data = state.User.diaChi.map((p) => {
        if (p.id === action.payload.id) {
          return { ...p, trangThai: 1 };
        }
        return { ...p, trangThai: 0 };
      });
      state.User = { ...state.User, diaChi: data };
    },
    setchitietspgiohang: (state, action) => {
      const existingItemIndex = state.giohangonl.findIndex(
        (sp) => sp.id === action.payload.id
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        state.giohangonl[existingItemIndex] = {
          ...state.giohangonl[existingItemIndex],
          soluongmua: state.giohangonl[existingItemIndex].soluongmua + 1,
        };
      } else {
        // Add new item
        state.giohangonl.push(action.payload);
      }
    },
    Updatespchitietspgiohang: (state, action) => {
      const data = state.giohangonl.map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.soluongmua <= item.soluong) {
            return { ...item, soluongmua: action.payload.soluongmua };
          } else {
            return { ...item, soluongmua: item.soluong };
          }
        }
        return item;
      });
      state.giohangonl = data;
    },
    checkspchitietspgiohang: (state, action) => {
      const data = state.giohangonl.map((p) => {
        if (p.id === action.payload.id) return { ...p, check: !p.check };
        return p;
      });
      state.giohangonl = data;
    },
    Deletechitietspgiohang: (state, action) => {
      state.giohangonl = state.giohangonl.filter(
        (p) => p.id !== action.payload.id
      );
    },
    setnamekhachhang: (state, action) => {
      console.log(action.payload);
      state.User = { ...state.User, ten: action.payload };
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

      if (action.payload && action.payload.vaiTro === 1) {
        const dssp = action.payload.chiTietGioHang.map((p) => ({
          ...p,
          check: false,
        }));
        console.log("dsbandau", action.payload.chiTietGioHang);
        console.log("danh sách sản phẩm:", dssp);
        state.giohangonl = dssp;
        //   if (state.giohangonl.length > 0) {
        //     const dssptam = state.giohangonl.map((p) => {
        //       const itemInDssp = dssp.find((q) => q.id === p.id);
        //       if (itemInDssp) {
        //         return {
        //           ...p,
        //           soluongmua: p.soluongmua + itemInDssp.soluongmua,
        //         };
        //       }
        //       return p;
        //     });

        //     const newItems = dssp.filter(
        //       (q) => !state.giohangonl.some((p) => p.id === q.id)
        //     );

        //     state.giohangonl = [...dssptam, ...newItems];
        //   } else {
        //     state.giohangonl = dssp;
        //   }
      }

      state.loadingdata = false;
      state.errordata = false;
    });

    builder.addCase(FetchData.rejected, (state, action) => {
      state.loadingdata = false;
      state.errordata = true;
    });
  },
});
export const {
  LogOutTaiKhoan,
  setchitietspgiohang,
  Deletechitietspgiohang,
  Updatespchitietspgiohang,
  checkspchitietspgiohang,
  SetDiachiChinhNhanHang,
  setnamekhachhang,
} = taiKhoanSlice.actions;

export const deleteAndFetch = (id, credentials) => async (dispatch) => {
  dispatch(Deletechitietspgiohang(id));
  dispatch(FetchData(credentials));
};
export default taiKhoanSlice.reducer;
