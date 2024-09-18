import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import "./ReactSidebar.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { IoSettings } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LogOutTaiKhoan } from "../../../../Rudux/Reducer/taiKhoanSlice";
import Swal from "sweetalert2";
import { AiFillSignal } from "react-icons/ai";
import { FaAddressBook } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { FaStar } from 'react-icons/fa';
import axios from "axios";
import { FontAwesomeIcon  } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon
import { MdDiscount } from "react-icons/md";
import { MdPublishedWithChanges } from "react-icons/md";
import { BsClipboard2Data } from "react-icons/bs";
import { AiOutlineShoppingCart } from 'react-icons/ai'; // Thêm dòng này



const ReactSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  // const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const user = useSelector((state) => state.user.User);
  const [hoaDons, setHoaDons] = useState([]);
  const [showList, setShowList] = useState(true);
  const [danhGias, setDanhGias] = useState([]);
  const [showListDanhGia, setShowListDanhGia] = useState(true);

  useEffect(() => {
    // Assuming email is used for display purposes, not for profile navigation
    console.log(user);
  }, [user]);
  useEffect(() => {
    // Fetch dữ liệu hóa đơn từ backend hoặc từ một nguồn dữ liệu khác
    const fetchData = async () => {
      const response = await axios.get(
        "https://localhost:7095/api/HoaDon/GetAllHDCho"
      );


      setHoaDons(response.data);
    };
    fetchData();
  }, []);
  useEffect(() => {
    // Fetch dữ liệu hóa đơn từ backend hoặc từ một nguồn dữ liệu khác
    const fetchDataDanhGia = async () => {
      const response = await axios.get(
        "https://localhost:7095/api/DanhGia/GetAllUnrespondedReview"
      );


      setDanhGias(response.data);
    };
    fetchDataDanhGia();
  }, []);
  const handleViewProfile = () => {
    navigate(`/admin/profile/${user.id}`);
  };
  //vaiTro
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
        dispath(LogOutTaiKhoan());
        navigate("/");
      } else {
      }
    });
    //let text = "Bạn có muốn đăng xuất không?";
    // if (window.confirm(text) === true) {
    // dispath(LogOutTaiKhoan());
    // navigate("/");
    // } else {
    // }
  };

  if (user.email && user.vaiTro === 0) {
    return (
      <div>
        <div
          style={{
            display: "flex",
            height: "800px",
          }}
        >
          <Sidebar
            collapsed={collapsed}
            // toggled={toggled}
            // onBackdropClick={() => setToggled(false)}
            onBreakPoint={setBroken}
            breakPoint="md"
            style={{ position: "fixed", zIndex: 2 }}
          >
            <div className="my-4 ms-5">
              <h1>Shop Man</h1>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <div style={{ flex: 1, marginBottom: "32px" }}>
                <div style={{ padding: "0 24px", marginBottom: "8px" }}></div>
                <Menu>
                  {/* <MenuItem
                    component={<Link to="/admin/dashboard" />}
                    icon={
                      <AiFillSignal style={{ color: "blue", size: "20px" }} />
                    }
                  >
                    Dashboard
                  </MenuItem>
                  <hr /> */}
                  <MenuItem
                    component={<Link to="/admin/banhangofline" />}
                    icon={<FaHome style={{ color: "blue", size: "40px" }} />}
                  >
                    Bán hàng
                  </MenuItem>
                  <hr />
                  <MenuItem
                    component={<Link to="/admin/quanlynhanvien" />}
                    icon={
                      <AiOutlineShoppingCart style={{ color: "blue", size: "40px" }} />
                    }
                    hidden={user.chucNang !== "Admin" ? true : false}
                  >
                    Quản lý nhân viên
                  </MenuItem>
                  <MenuItem
                    component={<Link to="/admin/quanlydanhgia" />}
                    icon={<BsClipboard2Data style={{ color: "blue", size: "2em" }} />} // Thay đổi ở đây
                  >
                    Quản lý đánh giá
                  </MenuItem>
                  <hr />
                  <SubMenu
                    icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                    label="Quản lý Sản phẩm"
                  >
                    <MenuItem
                      component={<Link to="/admin/quanlysanpham" />}
                      icon={<AiOutlineShoppingCart style={{ color: "blue", fontSize: "20px" }} />}
                    >
                      Sản phẩm
                    </MenuItem>

                    <MenuItem
                      component={<Link to="/admin/quanlychatlieu" />}
                      icon={<FaHome style={{ color: "blue", size: "40px" }} />}
                    >
                      Chất liệu
                    </MenuItem>
                    <MenuItem
                      component={<Link to="/admin/quanlyloaisanpham" />}
                      icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                    >
                      Loại sản phẩm
                    </MenuItem>
                    <MenuItem
                      component={<Link to="/admin/quanlymausac" />}
                      icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                    >
                      Màu sắc
                    </MenuItem>
                    <MenuItem
                      component={<Link to="/admin/quanlykichthuoc" />}
                      icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                    >
                      Kích thước
                    </MenuItem>
                    <MenuItem
                      component={<Link to="/admin/coao" />}
                      icon={<FaHome style={{ color: "blue", size: "40px" }} />}
                    >
                      Cổ áo
                    </MenuItem>
                  </SubMenu>

                  <hr />
                  <MenuItem
  component={<Link to="/admin/quanlykhachhang" />}
  icon={<FaAddressBook style={{ color: "blue", fontSize: "20px" }} />}
>
  Quản lý Khách hàng
</MenuItem>

                  <hr />
                  <MenuItem
                    component={<Link to="/admin/quanlydoidiem" />}
                    icon={<FaHome style={{ color: "blue", size: "40px" }} />}
                  >
                    Quản lý đổi điểm
                  </MenuItem>
                  <hr />
                  <MenuItem
                    component={<Link to="/admin/quanlyvoucher" />}
                    icon={<FaHome style={{ color: "blue", size: "40px" }} />}
                  >
                    
                    Quản lý voucher
                  </MenuItem>
                  
                  <hr />
                  <MenuItem
                    component={<Link to="/admin/quanlykhuyenmai" />}
                    icon={<FaHome style={{ color: "blue", size: "40px" }} />}
                  >
                    Quản lý khuyến mãi
                  </MenuItem>
                  <hr />
                  <MenuItem
                    component={<Link to="/admin/quanlyhoadon" />}
                    icon={<FaHome style={{ color: "blue", size: "40px" }} />}
                  >
                    Quản lý hóa đơn
                  </MenuItem>
                  <hr />
                  <MenuItem
                    component={<Link to="/admin/thongke" />}
                    icon={
                      <AiFillSignal style={{ color: "blue", size: "40px" }} />
                    }
                  >
                    Thống kê
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </Sidebar>
          <div
            style={{
              marginLeft: collapsed === true ? "65px" : "250px",
              width: collapsed === true ? "1440px" : "1250px",
            }}
          >
            <div className="ok" style={{ padding: "0 18px" }}>
              <div className="row" style={{ marginBottom: "11px" }}>
                <div className="row" style={{}}>
                  <div
                    style={{
                      paddingLeft: "10px",
                      height: "65px",
                      paddingBottom: "6px",
                      position: "fixed",
                      zIndex: 3,
                      // backgroundColor: "antiquewhite",
                    }}
                    className="col-11"
                    id="collapse"
                    label="Collapse"
                  >
                    <IoMenu
                      onClick={() => setCollapsed(!collapsed)}
                      style={{
                        width: "1.5em",
                        height: "1.5em",
                        marginTop: "22px",
                      }}
                    />
                  </div>

                  <div
                    className="col-1"
                    style={{
                      paddingTop: "15px",
                      // marginLeft: "auto",
                      position: "fixed",
                      zIndex: 4,
                      left: "1400px",
                    }}
                  >
                    <div
                      className="col-1"
                      style={{
                        paddingTop: "15px",
                        position: "fixed",
                        zIndex: 4,
                        left: "1400px",
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <div
                        className="notification-item"
                        onMouseEnter={() => setShowListDanhGia(true)}
                        onMouseLeave={() => setTimeout(() => setShowListDanhGia(false), 1000)} // Thêm độ trễ khi rời khỏi
                        style={{ position: "relative", padding: "10px" }}
                      >
                        <VscFeedback style={{ fontSize: "1.2rem", cursor: "pointer", marginLeft: "-60px" }} />
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                          style={{ fontSize: "0.6rem", marginLeft: "-60px" }}
                        >
                          {danhGias.length}
                        </span>
                        {showListDanhGia && (
                          <ul
                            className="dropdown-menu show"
                            style={{
                              position: "absolute",
                              top: "100%",
                              right: 0,
                              minWidth: "200px",
                              zIndex: 1000,
                              left: "auto",
                            }}
                          >
                            <p style={{ margin: "10px" }}>Danh sách đánh giá</p>
                            {danhGias.map((dg) => (
                              <li key={dg.id}>
                                <a className="dropdown-item" href="/admin/quanlydanhgia">
                                  {dg.binhLuan}
                                  <div className="star-rating">
                                    {[...Array(dg.sao)].map((_, index) => (
                                      <FaStar key={index} color="gold" size={10} />
                                    ))}
                                  </div>
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div
                        className="notification-item"
                        onMouseEnter={() => setShowList(true)}
                        onMouseLeave={() => setTimeout(() => setShowList(false), 1000)} // Thêm độ trễ khi rời khỏi
                        style={{ position: "relative", padding: "10px" }}
                      >
                        <FaBell style={{ fontSize: "1.2rem", cursor: "pointer", marginLeft: "-55px" }} />
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                          style={{ fontSize: "0.6rem", marginLeft: "-55px" }}
                        >
                          {hoaDons.length}
                        </span>
                        {showList && (
                          <ul
                            className="dropdown-menu show"
                            style={{
                              position: "absolute",
                              top: "100%",
                              right: 0,
                              minWidth: "200px",
                              zIndex: 1000,
                              left: "auto",
                            }}
                          >
                            <p style={{ margin: "10px" }}>Danh sách hóa đơn chờ</p>
                            {hoaDons.map((hd) => (
                              <li key={hd.id}>
                                <a className="dropdown-item" href="/admin/quanlyhoadon">
                                  {hd.maHD}
                                </a>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      <span
                        className="User"
                        style={{
                          fontSize: "18px",
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "-50px",
                        }}
                      >
                        {user.ten.length < 6
                          ? user.ten
                          : `${user.ten.substring(0, 6)}`}

                        <NavDropdown
                          id="nav-dropdown-dark-example"
                          title={<IoSettings />}
                          menuVariant="dark"
                          style={{ marginLeft: "10px" }}
                        >
                          <NavDropdown.Item onClick={handleViewProfile}>
                            Xem hồ sơ
                          </NavDropdown.Item>

                          <NavDropdown.Item onClick={HandleOnclickLogout}>
                            Đăng xuất
                          </NavDropdown.Item>
                        </NavDropdown>
                      </span>
                    </div>

                    {/* <span
                      className="User"
                      style={{ fontSize: "18px", display: "flex" }}
                    >
                      {user.ten && user.ten.length < 6
                        ? user.ten
                        : `${user.ten.substring(0, 6)}`}

                      <NavDropdown
                        id="nav-dropdown-dark-example"
                        title={<IoSettings />}
                        menuVariant="dark"
                        style={{ marginLeft: "10px" }}
                      >
                        <NavDropdown.Item onClick={handleViewProfile}>
                          Xem hồ sơ
                        </NavDropdown.Item>

                        <NavDropdown.Item onClick={HandleOnclickLogout}>
                          Đăng xuất
                        </NavDropdown.Item>
                      </NavDropdown>
                    </span> */}
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                padding: "16px 24px",
                color: "#44596e",
                marginTop: "63px",
              }}
            >
              <div>
                {broken && (
                  <button
                    className="sb-button"
                  // onClick={() => setToggled(!toggled)}
                  >
                    Toggle
                  </button>
                )}
              </div>
              <div className="sidebar_body_ok">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ReactSideBar;
