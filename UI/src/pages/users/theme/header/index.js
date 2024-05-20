import "./style.scss";
import { memo } from "react";
import { CiShop, CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { BsJustify } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ROUTERS } from "../../../../utils/router";
const Header = () => {
  const [menus] = useState([
    {
      name: "Sản phẩm mới",
      path: ROUTERS.USER.PROFILE,
    },
    {
      name: "Áo nam",
      path: ROUTERS.USER.AONAM,
      isShowSubMenu: false,
      child: [
        {
          name: "Áo sơ mi",
          path: "",
        },
        {
          name: "Áo thun",
          path: "",
        },
        {
          name: "Áo polo",
          path: "",
        },
        {
          name: "Áo khoác",
          path: "",
        },
        {
          name: "Áo Hoodie",
          path: "",
        },
        {
          name: "Áo len",
          path: "",
        },
        {
          name: "Áo vest",
          path: "",
        },
        {
          name: "Áo ghi lê",
          path: "",
        },
      ],
    },
    {
      name: "Quần nam",
      path: ROUTERS.USER.QUANNAM,
      isShowSubMenu: false,
      child: [
        {
          name: "Quần jean",
          path: "",
        },
        {
          name: "Quần tây",
          path: "",
        },
        {
          name: "Quần kaki",
          path: "",
        },
        {
          name: "Quần jogger",
          path: "",
        },
        {
          name: "Quần short",
          path: "",
        },
        {
          name: "Quần lót",
          path: "",
        },
      ],
    },
    {
      name: "Phụ kiện",
      path: ROUTERS.USER.PHUKIEN,
      isShowSubMenu: false,
      child: [
        {
          name: "Thắt lưng",
          path: "",
        },
        {
          name: "Ví da",
          path: "",
        },
        {
          name: "Cà vạt",
          path: "",
        },
        {
          name: "Nơ",
          path: "",
        },
        {
          name: "Vớ nam",
          path: "",
        },
        {
          name: "Mũ nón",
          path: "",
        },
        {
          name: "Túi xách",
          path: "",
        },
        {
          name: "Mắt kính",
          path: "",
        },
      ],
    },
    {
      name: "Giaỳ dép",
      path: ROUTERS.USER.GIAYDEP,
      isShowSubMenu: false,
      child: [
        {
          name: "Giaỳ",
          path: "",
        },
        {
          name: "Sandal",
          path: "",
        },
        {
          name: "Dép nam",
          path: "",
        },
      ],
    },
    {
      name: "Khuyến mãi",
      path: ROUTERS.USER.KHUYENMAI,
    },
  ]);

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
      <nav className="container header-bottom">
        <ul>
          {menus?.map((menu, menuKey) => (
            <li className="li-father nav-item dropdown">
              <Link to={menu.path} key={menuKey}>
                {menu.name}
                {menu.child != null ? (
                  <IoIosArrowDown style={{ width: "1.2em" }} />
                ) : (
                  <div></div>
                )}
              </Link>
              {menu.child != null ? (
                <ul>
                  {menu.child.map((child, childKey) => (
                    <li className="dropdown-item">
                      <Link to={child.path} key={{ childKey } - { menuKey }}>
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div></div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <hr />
    </>
  );
};
export default memo(Header);
