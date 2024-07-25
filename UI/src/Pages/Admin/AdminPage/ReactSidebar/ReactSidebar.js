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
const ReactSideBar = () => {
  const [emailUser, setemailUser] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(false);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const user = useSelector((state) => state.user.User);

  useEffect(() => {
    setemailUser(localStorage.getItem("useremail"));
    console.log(user);
  }, []);
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
            toggled={toggled}
            onBackdropClick={() => setToggled(false)}
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
                  <MenuItem
                    component={<Link to="/admin/dashboard" />}
                    icon={
                      <AiFillSignal style={{ color: "blue", size: "20px" }} />
                    }
                  >
                    Dashboard
                  </MenuItem>
                  <hr />
                  <MenuItem
                    component={<Link to="/admin/banhangofline" />}
                    icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                  >
                    Bán hàng
                  </MenuItem>
                  <hr />
                  <MenuItem
                    component={<Link to="/admin/quanlynhanvien" />}
                    icon={
                      <FaAddressBook style={{ color: "blue", size: "20px" }} />
                    }
                    hidden={user.chucNang !== "Admin" ? true : false}
                  >
                    Quản lý nhân viên
                  </MenuItem>
                  <hr />
                  <SubMenu
                    icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                    label="Quản lý Sản phẩm"
                  >
                    <MenuItem
                      component={<Link to="/admin/quanlysanpham" />}
                      icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                    >
                      sản phẩm
                    </MenuItem>
                    <MenuItem
                      component={<Link to="/admin/quanlychatlieu" />}
                      icon={<FaHome style={{ color: "blue", size: "20px" }} />}
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
                      icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                    >
                      Cổ áo
                    </MenuItem>
                  </SubMenu>

                  <hr />
                  <MenuItem
                    component={<Link to="/admin/quanlykhachhang" />}
                    icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                  >
                    Quản lý Khách hàng
                  </MenuItem>
                  <hr />
                  <MenuItem
                    component={<Link to="/admin/quanlydoidiem" />}
                    icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                  >
                    Quản lý đổi điểm
                  </MenuItem>
                  <hr />
                  <MenuItem
                    component={<Link to="/admin/quanlyvoucher" />}
                    icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                  >
                    Quản lý voucher
                  </MenuItem>
                  <hr />
                  <MenuItem
                    component={<Link to="/admin/quanlykhuyenmai" />}
                    icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                  >
                    Quản lý khuyến mãi
                  </MenuItem>
                  <hr />
                  <MenuItem
                    component={<Link to="/admin/quanlyhoadon" />}
                    icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                  >
                    Quản lý hóa đơn
                  </MenuItem>
                  <hr />
                  <MenuItem
                    component={<Link to="/admin/thongke" />}
                    icon={<FaHome style={{ color: "blue", size: "20px" }} />}
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
            <div style={{ padding: "0 18px" }}>
              <div className="row" style={{ marginBottom: "11px" }}>
                <div
                  style={{
                    paddingLeft: "10px",
                    height: "65px",
                    paddingBottom: "6px",
                    position: "fixed",
                    zIndex: 3,
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
                    position: "fixed",
                    zIndex: 4,
                    left: "1400px",
                  }}
                >
                  <span
                    className="User"
                    style={{ fontSize: "18px", display: "flex" }}
                  >
                    {user.ten}
                    <NavDropdown
                      id="nav-dropdown-dark-example"
                      title=<IoSettings />
                      menuVariant="dark"
                      style={{ marginLeft: "10px" }}
                    >
                      <NavDropdown.Item
                        href="#action/3.1"
                        onClick={HandleOnclickLogout}
                      >
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </span>
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
                    onClick={() => setToggled(!toggled)}
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
