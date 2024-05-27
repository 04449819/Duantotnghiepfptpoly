import { Link, NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";

import "./Header.scss";
import { useState } from "react";
import ModalDangNhap from "../../HomePage/Modaldangnhap/ModalDangNhap";

const Header = (props) => {
  const [shows, setShows] = useState(false);

  return (
    <div className="Header">
      <div className="top-header ">
        <p>
          FREESHIP 15K mọi đơn hàng &nbsp; &nbsp; - &nbsp; &nbsp; Mua online
          nhận nhanh tại cửa hàng &nbsp; &nbsp;- &nbsp; &nbsp; TP. Hồ Chí Minh
          giao nhanh 24H
        </p>
      </div>
      <div className="bot-header">
        <nav className="navbar navbar-expand-lg  navbar-light bg-info p-3">
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

            <div className=" collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto ">
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-2 active"
                    aria-current="page"
                    to=""
                  >
                    Trang chủ
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link mx-2" to="/cuahang">
                    Cửa Hàng
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link mx-2" to="/lienhe">
                    Liên hệ
                  </NavLink>
                </li>
              </ul>
              <ul className="navbar-nav ms-auto d-none d-lg-inline-flex">
                <li className="nav-item mx-2">
                  <button
                    className="buttonHeader"
                    onClick={() => setShows(true)}
                  >
                    <BsPersonCircle />
                    <span>Đăng nhập</span>
                  </button>
                </li>
                <li className="nav-item mx-2">
                  <Link className="nav-link text-dark h5" to="" target="blank">
                    {/* <i className="fab fa-twitter"></i> */}
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  {/* <Link className="nav-link text-dark h5" to="/" target="blank"> */}
                  <button style={{ border: "none", backgroundColor: "white" }}>
                    <FiShoppingCart />
                  </button>

                  {/* </Link> */}
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
