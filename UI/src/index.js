import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import HomePage from "./Pages/User/HomePage/HomePage";
import AdminPage from "./Pages/Admin/AdminPage/AdminPage";
import Dangki from "./Pages/User/Dangki/Dangki";
import QuanLyNhanVienPage from "./Pages/Admin/QuanLyNhanVienPage/QuanLyNhanVienPage";
import BanHangOfline from "./Pages/Admin/BanHangOfLine/BanHangOfline";
import QuanLySanPham from "./Pages/Admin/QuanLySanPham/QuanLySanPham";
import QuanLyLoaiSanPham from "./Pages/Admin/QuanLySanPham/QuanLyLoaiSanPham/QuanLyLoaiSanPham";
import QuanLyChatLieu from "./Pages/Admin/QuanLySanPham/QuanLyChatLieu/QuanLyChatLieu";
import QuanLyKhachHang from "./Pages/Admin/QuanLyKhachHang/QuanLyKhachHang";
import QuanLyDoiDiem from "./Pages/Admin/QuanLyDoiDiem/QuanLyDoiDiem";
import QuanLyVoucher from "./Pages/Admin/QuanLyVoucher/QuanLyVoucher";
import QuanLyKhuyenMai from "./Pages/Admin/QuanLyKhuyenMai/QuanLyKhuyenMai";
import QuanLyHoaDon from "./Pages/Admin/QuanLyHoaDon/QuanLyHoaDon";
import ThongKe from "./Pages/Admin/ThongKePage/ThongKe";
import QuenMK from "./Pages/User/QuenMK/QuenMK";
import { Provider } from "react-redux";
import { store, persistor } from "./Rudux/store";
import { PersistGate } from "redux-persist/integration/react";
import DashBoard from "./Pages/Admin/Dashboard/DashBoard";
import { Bounce, ToastContainer } from "react-toastify";
import MauSac from "./Pages/Admin/QuanLySanPham/MauSac/MauSac";
import KichThuoc from "./Pages/Admin/QuanLySanPham/KichThuoc/KichThuoc";
import CoAo from "./Pages/Admin/QuanLySanPham/CoAo/CoAo";
import CuaHang from "./Pages/User/CuaHang/CuaHang";
import LienHe from "./Pages/User/LienHe/LienHe";
import ChiTietSanPhamKH from "./Pages/User/ChiTietSanPhamKH/ChiTietSanPhamKH";
import ScrollToTop from "./ScrollToTop";
import GioHang from "./Pages/User/GioHang/GioHang";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/dangki" element={<Dangki />} />
            <Route path="/quenmatkhau" element={<QuenMK />} />
            <Route path="/cuahang" element={<CuaHang />} />
            <Route path="/lienhe" element={<LienHe />} />
            <Route path="/chitietsanpham" element={<ChiTietSanPhamKH />} />
            <Route path="/giohang" element={<GioHang />} />
          </Route>

          <Route path="/admin" element={<AdminPage />}>
            <Route index element={<BanHangOfline />} />
            <Route path="/admin/banhangofline" element={<BanHangOfline />} />
            <Route
              path="/admin/quanlynhanvien"
              element={<QuanLyNhanVienPage />}
            />
            <Route path="/admin/quanlysanpham" element={<QuanLySanPham />} />
            <Route path="/admin/quanlychatlieu" element={<QuanLyChatLieu />} />
            <Route path="/admin/quanlymausac" element={<MauSac />} />
            <Route path="/admin/quanlykichthuoc" element={<KichThuoc />} />
            <Route path="/admin/coao" element={<CoAo />} />
            <Route
              path="/admin/quanlyloaisanpham"
              element={<QuanLyLoaiSanPham />}
            />
            <Route
              path="/admin/quanlykhachhang"
              element={<QuanLyKhachHang />}
            />
            <Route path="/admin/quanlydoidiem" element={<QuanLyDoiDiem />} />
            <Route path="/admin/quanlyvoucher" element={<QuanLyVoucher />} />
            <Route path="/admin/dashboard" element={<DashBoard />} />
            <Route
              path="/admin/quanlykhuyenmai"
              element={<QuanLyKhuyenMai />}
            />
            <Route path="/admin/quanlyhoadon" element={<QuanLyHoaDon />} />
            <Route path="/admin/thongke" element={<ThongKe />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <ToastContainer />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
