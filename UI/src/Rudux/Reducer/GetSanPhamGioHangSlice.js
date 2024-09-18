import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  HoaDons: [
    {
      ma: `HD${Math.floor(10000 + Math.random() * 90000)}`,
      ten: "",
      sdt: "",
      diachi: "",
      email: "",
      diem: 0,
      giamkm: 0,
      tongtienn: 0,
      voucher: "",
      SanPhamGioHang: [],
      check: true,
      tienship: 0,
      checkgiaohang: false,
      checkdungdiem: false,
      giamvoucher: 0,
      ghiChu: "",
      soDiemSuDung: 0,
    },
  ],
  SanPhamGioHang: [],
  quyDoiDiem: null,
  diemTich: null,
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

export const GetQuyDoiDiem = createAsyncThunk(
  "featchdata/GetQuyDoiDiem",
  async () => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/QuyDoiDiem/GetApplicableQuyDoiDiem`
      );
      console.log(res.data);
      
      return res.data;
    } catch (error) {
      console.error("Error fetching QuyDoiDiem:", error);
      throw error;
    }
  }
);
export const GetDiemTich = createAsyncThunk(
  "featchdata/GetDiemTich",
  async (idKhachHang) => {
    try {
      const res = await axios.get(
        `https://localhost:7095/api/KhachHang/GetById?id=${idKhachHang}`
      );
      console.log(res.data);
      
      return res.data;
    } catch (error) {
      console.error("Error fetching QuyDoiDiem:", error);
      throw error;
    }
  }
);


export const GetSanPhamGioHangSlice = createSlice({
  name: "SanPhamGioHang",
  initialState,
  reducers: {
    TinhTienGiamDiem: (state) => {
      if (!state.quyDoiDiem) return;
      
      state.HoaDons = state.HoaDons.map((hoadon) => {
        if (hoadon.check && hoadon.checkdungdiem) {
          const maxTienGiam = hoadon.tongtienn; // Số tiền tối đa có thể giảm
          const maxDiemSuDung = Math.floor(maxTienGiam / state.quyDoiDiem.tiLeTieuDiem); // Số điểm tối đa có thể sử dụng
          const diemSuDung = Math.min(hoadon.diem, maxDiemSuDung); // Sử dụng tất cả điểm có sẵn hoặc số điểm tối đa có thể sử dụng
          const tienGiam = diemSuDung * state.quyDoiDiem.tiLeTieuDiem;
          const tongTienSauGiam = hoadon.tongtienn - tienGiam;
          
          return {
            ...hoadon,
            soDiemSuDung: diemSuDung,
            tienGiamDiem: tienGiam,
            tongtienn: tongTienSauGiam
          };
        }
        return hoadon;
      });
    },
    DeleteHoaDonDaThanhToan: (state, action) => {
      state.HoaDons = state.HoaDons.filter(hoadon => hoadon.ma !== action.payload);
      if (state.HoaDons.length > 0) {
        state.HoaDons[0].check = true;
      }
    },
    SetDiaChiKhachHang: (state, action) => {
      if (state.HoaDons.length < 1) {
        toast.error("Bạn chưa có hóa đơn chờ");
        return;
      }
      state.HoaDons = state.HoaDons.map((hoadon) => {
        if (hoadon.check === true) {
          return {
            ...hoadon,
            ten: action.payload.khachhang.ten,
            sdt: action.payload.khachhang.sdt,
            diachi: action.payload.diaChi,
            email: action.payload.khachhang.email,
            diem: action.payload.khachhang.diemTich
          };
        }
        return hoadon;
      });
    },
    SetTenKhachHang: (state, action) => {
      state.HoaDons = state.HoaDons.map((hoadon) =>
        hoadon.check ? { ...hoadon, ten: action.payload } : hoadon
      );
    },
    SetCheckGiaoHang: (state) => {
      state.HoaDons = state.HoaDons.map((hoadon) =>
        hoadon.check
          ? { ...hoadon, checkgiaohang: !hoadon.checkgiaohang }
          : hoadon
      );
    },
    SetDiemKhachHang: (state, action) => {
      state.HoaDons = state.HoaDons.map((hoadon) =>
        hoadon.check ? { ...hoadon, diem: action.payload } : hoadon
      );
    },
    // SetCheckDungDiem: (state) => {
    //   state.HoaDons = state.HoaDons.map((hoadon) =>
    //     hoadon.check
    //       ? { ...hoadon, checkdungdiem: !hoadon.checkdungdiem }
    //       : hoadon
    //   );
    // },
    SetCheckDungDiem: (state) => {
      state.HoaDons = state.HoaDons.map((hoadon) => {
        if (hoadon.check) {
          const newCheckDungDiem = !hoadon.checkdungdiem;
          return { 
            ...hoadon, 
            checkdungdiem: newCheckDungDiem,
            soDiemSuDung: newCheckDungDiem ? hoadon.diem : 0,
            tienGiamDiem: 0,
            tongtienn: newCheckDungDiem ? hoadon.tongtienn : (hoadon.tongtienn + (hoadon.tienGiamDiem || 0))
          };
        }
        return hoadon;
      });
    },
    SetDiaChiKhachHangg: (state, action) => {
      state.HoaDons = state.HoaDons.map((hoadon) =>
        hoadon.check ? { ...hoadon, diachi: action.payload } : hoadon
      );
    },
    SetSDT: (state, action) => {
      state.HoaDons = state.HoaDons.map((hoadon) =>
        hoadon.check ? { ...hoadon, sdt: action.payload } : hoadon
      );
    },
    SetEmail: (state, action) => {
      state.HoaDons = state.HoaDons.map((hoadon) =>
        hoadon.check ? { ...hoadon, email: action.payload } : hoadon
      );
    },
    SetGiamKhuyeMai: (state, action) => {
      state.HoaDons = state.HoaDons.map((hoadon) =>
        hoadon.check ? { ...hoadon, giamkm: action.payload } : hoadon
      );
    },
    SetTongTien: (state, action) => {
      state.HoaDons = state.HoaDons.map((hoadon) =>
        hoadon.check ? { ...hoadon, tongtienn: action.payload } : hoadon
      );
    },
    // SetVoucher: (state, action) => {
    //   console.log("idvoucher can tim", action.payload);

    //   const { id, hinhThucGiamGia, giaTri } = action.payload;

    //   state.HoaDons = state.HoaDons.map((hoadon) => {
    //     if (hoadon.check) {
    //       const giamVoucher =
    //         hinhThucGiamGia === 1 ? (hoadon.tongtienn * giaTri) / 100 : giaTri;

    //       return {
    //         ...hoadon,
    //         voucher: id,
    //         giamvoucher: giamVoucher,
    //         tongtienn: hoadon.tongtienn - giamVoucher,
    //       };
    //     }
    //     return hoadon;
    //   });
    // },
    SetVoucher: (state, action) => {
      const { id, hinhThucGiamGia, giaTri } = action.payload;
  
      state.HoaDons = state.HoaDons.map((hoadon) => {
          if (hoadon.check) {
              // Tính toán giảm giá mới
              const newGiamVoucher = hinhThucGiamGia === 1 
                  ? (hoadon.tongtienn * giaTri) / 100 
                  : giaTri;
  
              // Trừ đi giảm giá cũ nếu có
              const oldGiamVoucher = hoadon.giamvoucher || 0; // Nếu chưa có giảm giá, mặc định là 0
  
              // Tính toán lại tổng tiền sau khi áp dụng voucher mới
              const updatedTongtienn = hoadon.tongtienn - newGiamVoucher + oldGiamVoucher;
  
              // Đảm bảo rằng tổng tiền không bị âm
              const finalTongtienn = Math.max(updatedTongtienn, 0);
  
              return {
                  ...hoadon,
                  voucher: id,
                  giamvoucher: newGiamVoucher,
                  tongtienn: finalTongtienn, // Sử dụng tổng tiền cuối cùng đã giới hạn
              };
          }
          return hoadon;
      });
  },
    

    SetGiChu: (state, action) => {
      // alert("ok");
      state.HoaDons = state.HoaDons.map((hoadon) =>
        hoadon.check ? { ...hoadon, ghiChu: action.payload } : hoadon
      );
    },
    SetTienShip: (state, action) => {
      // alert("ok");
      if (action.payload < 0) {
        toast.error("Giá trị phải lớn hơn 0");
        return;
      }
      state.HoaDons = state.HoaDons.map((hoadon) =>
        hoadon.check ? { ...hoadon, tienship: action.payload } : hoadon
      );
    },
    
    SetSoDiemSuDung: (state, action) => {
      state.HoaDons = state.HoaDons.map((hoadon) =>
        hoadon.check ? { ...hoadon, soDiemSuDung: action.payload } : hoadon
      );
    },
    Delete: (state) => {
      state.HoaDons = [];
    },
    AddHoaDon: (state) => {
      if (state.HoaDons.length === 0) {
        let hoadon = {
          ma: `HD${Math.floor(10000 + Math.random() * 90000)}`,
          ten: "",
          sdt: "",
          diachi: "",
          email: "",
          diem: 0,
          voucher: "",
          giamkm: 0,
          tongtienn: 0,
          SanPhamGioHang: [],
          tienship: 0,
          ghiChu: "",
          giamvoucher: 0,
          checkgiaohang: false,
          checkdungdiem: false,
          check: true,
          soDiemSuDung: 0,
        };
        state.HoaDons.push(hoadon);
      } else if (state.HoaDons.length <= 4) {
        state.HoaDons = state.HoaDons.map((hoadon) => ({
          ...hoadon,
          check: false,
        }));
        let hoadon1 = {
          ma: `HD${Math.floor(10000 + Math.random() * 90000)}`,
          ten: "",
          sdt: "",
          diachi: "",
          email: "",
          diem: 0,
          voucher: "",
          giamkm: 0,
          tongtienn: 0,
          SanPhamGioHang: [],
          tienship: 0,
          ghiChu: "",
          giamvoucher: 0,
          checkgiaohang: false,
          checkdungdiem: false,
          check: true,
          soDiemSuDung: 0,
        };
        state.HoaDons.push(hoadon1);
      } else {
        toast.error("Số lượng hóa đơn chờ tối đa là 5 !");
      }
    },
    ChonHoaDon: (state, action) => {
      let hdtam = state.HoaDons.map((hoadon) => {
        if (hoadon.ma === action.payload) {
          return { ...hoadon, check: true };
        }
        return { ...hoadon, check: false };
      });
      state.HoaDons = hdtam;
    },
    DeleteHoaDons: (state, action) => {
      console.log("Deleting", action.payload);
      // state.HoaDons = [];
      // alert(`Are you sure you want to delete ${action.payload}`);

      if (action.payload.check === true) {
        const hdtam = state.HoaDons.filter((p) => p.ma !== action.payload.ma);
        if (hdtam.length >= 1) {
          hdtam[0].check = true;
          state.HoaDons = hdtam;
        } else {
          state.HoaDons = [
            {
              ma: `HD${Math.floor(10000 + Math.random() * 90000)}`,
              ten: "",
              sdt: "",
              diachi: "",
              email: "",
              diem: 0,
              giamkm: 0,
              voucher: "",
              tongtienn: 0,
              SanPhamGioHang: [],
              tienship: 0,
              ghiChu: "",
              giamvoucher: 0,
              checkgiaohang: false,
              checkdungdiem: false,
              check: true,
              soDiemSuDung: 0,
            },
          ];
        }
      } else {
        const hdtam = state.HoaDons.filter((p) => p.ma !== action.payload.ma);
        state.HoaDons = hdtam;
      }
    },
    DeleteCTSP: (state, action) => {
      state.HoaDons = state.HoaDons.map((p) => {
        if (p.check === true) {
          return {
            ...p,
            SanPhamGioHang: p.SanPhamGioHang.filter(
              (a) => a.idCTSP !== action.payload
            ),
          };
        } else {
          return p;
        }
      });
    },
    UpdateSoLuong: (state, action) => {
      state.HoaDons = state.HoaDons.map((p) => {
        if (p.check === true) {
          return {
            ...p,
            SanPhamGioHang: p.SanPhamGioHang.map((item) => {
              if (item.idCTSP === action.payload.idctsp) {
                // Cập nhật số lượng mua nếu số lượng trong yêu cầu nhỏ hơn hoặc bằng số lượng tồn
                return {
                  ...item,
                  soLuongmua: Math.min(action.payload.soluong, item.soLuong),
                };
              }
              return item;
            }),
          };
        }
        return p;
      });

      // const data = state.SanPhamGioHang.map((item) => {
      //   if (item.idCTSP === action.payload.idctsp) {
      //     if (action.payload.soluong <= item.soLuong) {
      //       return { ...item, soLuongmua: action.payload.soluong };
      //     } else {
      //       return { ...item, soLuongmua: item.soLuong };
      //     }
      //   }
      //   return item;
      // });
      // state.SanPhamGioHang = data;
    },
    resetSanPhamGioHang: (state) => {
      state.SanPhamGioHang = [];
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
    // builder.addCase(FetchDataSanPhamGioHang.fulfilled, (state, action) => {
    //   const payload = action.payload;
    //   if (!payload || !payload.idCTSP) {
    //     state.errordata = true;
    //     return;
    //   }

    //   const existingItem = state.SanPhamGioHang.find(
    //     (item) => item.idCTSP === payload.idCTSP
    //   );

    //   if (!existingItem) {
    //     state.SanPhamGioHang.push(payload);
    //   } else {
    //     state.SanPhamGioHang = state.SanPhamGioHang.map((item) => {
    //       if (item.idCTSP === payload.idCTSP) {
    //         return {
    //           ...item,
    //           soLuongmua: item.soLuongmua + payload.soLuongmua,
    //         };
    //       }
    //       return item;
    //     });
    //   }

    //   state.loadingdata = false;
    //   state.errordata = false;
    // });
    builder.addCase(FetchDataSanPhamGioHang.fulfilled, (state, action) => {
      const payload = action.payload;
      if (!payload || !payload.idCTSP) {
        state.errordata = true;
        return;
      }
      if (state.HoaDons.length < 1) {
        toast.error("Bạn chưa có hóa đơn chờ");
        return;
      }
      // Cập nhật mảng HoaDons mà không chỉnh sửa trực tiếp
      state.HoaDons = state.HoaDons.map((item) => {
        if (item.check === true) {
          // Tìm sản phẩm trong giỏ hàng hiện tại
          const existingItem = item.SanPhamGioHang.find(
            (item) => item.idCTSP === payload.idCTSP
          );

          if (!existingItem) {
            // Nếu không tìm thấy sản phẩm, thêm mới sản phẩm vào giỏ hàng
            return {
              ...item,
              SanPhamGioHang: [...item.SanPhamGioHang, payload], // Tạo bản sao mới
            };
          } else {
            // Nếu tìm thấy, cập nhật số lượng mua của sản phẩm
            return {
              ...item,
              SanPhamGioHang: item.SanPhamGioHang.map((item1) =>
                item1.idCTSP === payload.idCTSP
                  ? {
                      ...item1,
                      soLuongmua: item1.soLuongmua + payload.soLuongmua,
                    }
                  : item1
              ),
            };
          }
        }
        return item;
      });
      toast.success("Sản phẩm đã được thêm vào giỏ hàng !");
      state.loadingdata = false;
      state.errordata = false;
    });

    builder.addCase(FetchDataSanPhamGioHang.rejected, (state, action) => {
      state.loadingdata = false;
      state.errordata = true;
    });
    builder.addCase(GetQuyDoiDiem.fulfilled, (state, action) => {
      state.quyDoiDiem = action.payload;
    });
  },
});
export const {
  DeleteCTSP,
  SetSDT,
  SetDiemKhachHang,
  SetCheckGiaoHang,
  SetCheckDungDiem,
  SetTienShip,
  SetGiChu,
  SetEmail,
  SetTenKhachHang,
  SetDiaChiKhachHangg,
  UpdateSoLuong,
  resetSanPhamGioHang,
  AddHoaDon,
  DeleteHoaDons,
  ChonHoaDon,
  SetDiaChiKhachHang,
  Delete,
  SetGiamKhuyeMai,
  SetTongTien,
  SetVoucher,
  SetSoDiemSuDung,
  TinhTienGiamDiem,
  DeleteHoaDonDaThanhToan,


} = GetSanPhamGioHangSlice.actions;
export default GetSanPhamGioHangSlice.reducer;
