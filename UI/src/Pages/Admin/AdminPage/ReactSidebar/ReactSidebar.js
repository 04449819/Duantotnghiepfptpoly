import React, { useEffect, useState } from "react";
import { FaBars, FaHome } from "react-icons/fa";
import "./ReactSidebar.scss";
import { Form, Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Bounce, ToastContainer } from "react-toastify";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { IoSettings } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LogOutTaiKhoan } from "../../../../Rudux/Reducer/taiKhoanSlice";
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
  }, []);
  //vaiTro
  const HandleOnclickLogout = () => {
    let text = "Bạn có muốn đăng xuất không?";
    if (window.confirm(text) === true) {
      dispath(LogOutTaiKhoan());
      navigate("/");
    } else {
    }
  };

  if (user.email && user.vaiTro === 0) {
    return (
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
        >
          <div
            style={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <div style={{ flex: 1, marginBottom: "32px" }}>
              <div style={{ padding: "0 24px", marginBottom: "8px" }}></div>
              <Menu>
                <MenuItem
                  component={<Link to="/admin/banhangofline" />}
                  icon={<FaHome style={{ color: "blue", size: "20px" }} />}
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
                  icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                >
                  Quản lý nhân viên
                </MenuItem>
                <hr />
                <MenuItem
                  component={<Link to="/admin/quanlysanpham" />}
                  icon={<FaHome style={{ color: "blue", size: "20px" }} />}
                >
                  Quản lý sản phẩm
                </MenuItem>
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
        <div style={{ width: "1440px" }}>
          <div style={{ padding: "0 18px" }}>
            <div className="row" style={{ marginBottom: "11px" }}>
              <div
                style={{ paddingLeft: "10px", paddingBottom: "6px" }}
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
                style={{ paddingTop: "15px", position: "relative" }}
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
          <hr />
          <div style={{ padding: "16px 24px", color: "#44596e" }}>
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

        <ToastContainer
          position="top-right"
          autoClose={5000}
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
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ReactSideBar;
