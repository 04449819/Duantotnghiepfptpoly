import React, { useEffect, useState } from "react";
import { FaBars, FaHome, FaUser, FaCog } from "react-icons/fa";
import "./ReactSidebar.scss";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const ReactSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const user = useSelector((state) => state.user.User);
  // const name = user.ten.substring(0, 5);
  if (user.email !== undefined) {
    return (
      <div style={{ display: "flex" }}>
        <div
          style={{ height: "100vw" }}
          className={`sidebar ${collapsed ? "collapsed" : ""}`}
        >
          <ul className="sidebar-menu">
            <li className="sidebar-item">
              <FaHome />
              {!collapsed && <Link to={"/admin/banhangofline"}>Dashboard</Link>}
            </li>
            <hr />
            <li className="sidebar-item">
              <FaHome />
              {!collapsed && <Link to={"/admin/banhangofline"}>Bán hàng</Link>}
            </li>
            <hr />
            <li className="sidebar-item">
              <FaUser />
              {!collapsed && (
                <Link to={"/admin/quanlynhanvien"}>Quản lý nhân viên</Link>
              )}
            </li>
            <hr />
            <li className="sidebar-item">
              <FaCog />
              {!collapsed && (
                <Link to={"/admin/quanlysanpham"}>Quản lý sản phẩm</Link>
              )}
            </li>
            <hr />
            <li className="sidebar-item">
              <FaCog />
              {!collapsed && (
                <Link to={"/admin/quanlykhachhang"}>Quản lý Khách hàng</Link>
              )}
            </li>
            <hr />
            <li className="sidebar-item">
              <FaCog />
              {!collapsed && (
                <Link to={"/admin/quanlydoidiem"}>Quản lý đổi điểm</Link>
              )}
            </li>
            <hr />
            <li className="sidebar-item">
              <FaCog />
              {!collapsed && (
                <Link to={"/admin/quanlyvoucher"}>Quản lý voucher</Link>
              )}
            </li>
            <hr />
            <li className="sidebar-item">
              <FaCog />
              {!collapsed && (
                <Link to={"/admin/quanlykhuyenmai"}>Quản lý khuyến mãi</Link>
              )}
            </li>
            <hr />
            <li className="sidebar-item">
              <FaCog />
              {!collapsed && (
                <Link to={"/admin/quanlyhoadon"}> Quản lý hóa đơn</Link>
              )}
            </li>
            <hr />
            <li className="sidebar-item">
              <FaCog />
              {!collapsed && <Link to={"/admin/thongke"}>Thống kê</Link>}
            </li>
          </ul>
        </div>
        <div className="sidebar-header">
          <div className="row">
            <div className="col-10">
              <FaBars onClick={toggleSidebar} />
            </div>
            <div className="col-2">
              <span className="User">
                {user.ten} <FaBars />
              </span>
            </div>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default ReactSideBar;
