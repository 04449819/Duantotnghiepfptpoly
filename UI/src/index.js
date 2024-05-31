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
import QuanLyKhachHang from "./Pages/Admin/QuanLyKhachHang/QuanLyKhachHang";
import QuanLyDoiDiem from "./Pages/Admin/QuanLyDoiDiem/QuanLyDoiDiem";
import QuanLyVoucher from "./Pages/Admin/QuanLyVoucher/QuanLyVoucher";
import QuanLyKhuyenMai from "./Pages/Admin/QuanLyKhuyenMai/QuanLyKhuyenMai";
import QuanLyHoaDon from "./Pages/Admin/QuanLyHoaDon/QuanLyHoaDon";
import ThongKe from "./Pages/Admin/ThongKePage/ThongKe";
import QuenMK from "./Pages/User/QuenMK/QuenMK";
import { Provider } from "react-redux";
import { store } from "./Rudux/store";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/dangki" element={<Dangki />} />
          <Route path="/quenmatkhau" element={<QuenMK />} />
        </Route>

        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<BanHangOfline />} />
          <Route path="/admin/banhangofline" element={<BanHangOfline />} />
          <Route
            path="/admin/quanlynhanvien"
            element={<QuanLyNhanVienPage />}
          />
          <Route path="/admin/quanlysanpham" element={<QuanLySanPham />} />
          <Route path="/admin/quanlykhachhang" element={<QuanLyKhachHang />} />
          <Route path="/admin/quanlydoidiem" element={<QuanLyDoiDiem />} />
          <Route path="/admin/quanlyvoucher" element={<QuanLyVoucher />} />
          <Route path="/admin/quanlykhuyenmai" element={<QuanLyKhuyenMai />} />
          <Route path="/admin/quanlyhoadon" element={<QuanLyHoaDon />} />
          <Route path="/admin/thongke" element={<ThongKe />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
