import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";

import "./Header.scss";
import { useState } from "react";
import ModalDangNhap from "../../HomePage/Modaldangnhap/ModalDangNhap";
import { useDispatch, useSelector } from "react-redux";
import { LogOutTaiKhoan } from "../../../../Rudux/Reducer/taiKhoanSlice";
import Swal from "sweetalert2";
import { NavDropdown } from "react-bootstrap";
import "../../CuaHang/cuahang.scss";

const Header = (props) => {
  const [shows, setShows] = useState(false);
  const user = useSelector((state) => state.user.User);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const HandleOnclickLogout = () => {
    Swal.fire({
      title: "Xác nhận",
      text: "Bạn có muốn đăng xuất không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(LogOutTaiKhoan());
        navigate("/");
      }
    });
  };

  const HandleOnclickGioHang = () => {
    navigate("/giohang");
  };

  const HandleOnclickManageAccount = () => {
    // Điều hướng đến trang xem profile
    if (user && user.id) {
      navigate(`/HosoKh/${user.id}`); // Đảm bảo user.id có giá trị hợp lệ
    } else {
      // Xử lý trường hợp không có user.id, có thể thông báo lỗi hoặc điều hướng đến trang lỗi
      navigate("/login"); // Ví dụ: điều hướng đến trang đăng nhập nếu không có ID
    }
  };

  return (
    <div className="Header">
      <div className="top-header">
        <p>
          FREESHIP 15K mọi đơn hàng &nbsp; &nbsp; - &nbsp; &nbsp; Mua online
          nhận nhanh tại cửa hàng &nbsp; &nbsp;- &nbsp; &nbsp; TP. Hồ Chí Minh
          giao nhanh 24H
        </p>
      </div>
      <div className="bot-header">
        <nav className="navbar navbar-expand-lg navbar-light bg-info p-3">
          <div className="container-fluid">
            <Link className="navbar-brand" to="">
              <h2>SHOP MAN</h2>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-2 active hover-underline-animation"
                    aria-current="page"
                    to=""
                  >
                    Trang chủ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-2 hover-underline-animation"
                    to="/cuahang"
                  >
                    Cửa Hàng
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-2 hover-underline-animation"
                    to="/lienhe"
                  >
                    Liên hệ
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto d-none d-lg-inline-flex">
                <li className="nav-item mx-2">
                  <button
                    className="buttonHeader"
                    onClick={() => setShows(true)}
                    hidden={user && user.vaiTro !== 1 ? false : true}
                  >
                    <BsPersonCircle />
                    <span>Đăng nhập</span>
                  </button>
                  <button
                    className="buttonHeader"
                    hidden={user && user.vaiTro !== 1 ? true : false}
                  >
                    <div className="d-flex">
                      <div className="mt-1">
                        <BsPersonCircle />
                      </div>

                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title={user && user.ten}
                        menuVariant="dark"
                      >
                        <NavDropdown.Item onClick={HandleOnclickLogout}>
                          Đăng xuất
                        </NavDropdown.Item>
                        <NavDropdown.Item onClick={HandleOnclickManageAccount}>
                          Quản lý tài khoản
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </button>
                </li>
                <li className="nav-item mx-2">
                  <button style={{ border: "none", backgroundColor: "white" }}>
                    <div className="mt-1">
                      <FiShoppingCart onClick={HandleOnclickGioHang} />
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <ModalDangNhap show={shows} setShow={setShows} />
      </div>
    </div>
  );
};

export default Header;
