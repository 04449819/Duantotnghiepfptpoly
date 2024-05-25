import "./style.scss";
import { memo } from "react";
import { CiShop, CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";
import { BsJustify } from "react-icons/bs";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="header_top">
        <div className="container">
          <p>
            FREESHIP 15K mọi đơn hàng &nbsp; &nbsp; - &nbsp; &nbsp; Mua online
            nhận nhanh tại cửa hàng &nbsp; &nbsp;- &nbsp; &nbsp; TP. Hồ Chí Minh
            giao nhanh 24H
          </p>
        </div>
      </div>
      <div className="header_middle container">
        <div className="row">
          <div className="col-6 row">
            <div className="col-5">
              <h5> THE FACE SHOP</h5>
              <p style={{ paddingLeft: "20px" }}> CLEAN BUEATY</p>
            </div>
            <div className=" col-7">
              <div className="search-box">
                <button className="btn-search">
                  <i className="fa fa-search"></i>
                </button>
                <input
                  type="text"
                  className="input-search"
                  placeholder="Type to Search..."
                />
              </div>
            </div>
          </div>
          <div className="headeright col-6">
            <ul>
              <li style={{ display: "flex" }}>
                <Link to={""}>
                  <CiShop />
                  <span>Hệ thống cửa hàng</span>
                </Link>
              </li>
              <li>
                <Link to={""}>
                  <BsJustify />
                </Link>
              </li>
              <li>
                <Link>
                  <CiUser />
                  <span>đăng nhập</span>
                </Link>
              </li>
              <li>
                <Link>
                  <CiHeart />
                </Link>
              </li>
              <li>
                <Link>
                  <CiShoppingCart />
                  <span>3</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};
export default memo(Header);
