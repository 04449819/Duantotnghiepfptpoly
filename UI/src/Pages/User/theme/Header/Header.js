import { Link, NavLink } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { BsPersonCircle } from "react-icons/bs";
import Carousel from "react-bootstrap/Carousel";
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
        <nav className="navbar navbar-expand-lg container navbar-light bg-info p-3">
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
                  <Link className="nav-link text-dark h5" to="" target="blank">
                    <FiShoppingCart />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <ModalDangNhap show={shows} setShow={setShows} />
      </div>
      <div className="content">
        <Carousel interval={4000}>
          <Carousel.Item>
            <img src="https://media3.coolmate.me/cdn-cgi/image/width=1000,quality=90,format=auto/uploads/May2024/SOMI_PREMIUM_XAM.png" />
            <Carousel.Caption>
              {/* <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://media3.coolmate.me/cdn-cgi/image/width=1000,quality=90,format=auto/uploads/May2024/SOMI_PREMIUM_XAM.png" />
            <Carousel.Caption>
              {/* <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="https://media3.coolmate.me/cdn-cgi/image/width=1000,quality=90,format=auto/uploads/May2024/SOMI_PREMIUM_XAM.png" />
            <Carousel.Caption>
              {/* <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Header;
