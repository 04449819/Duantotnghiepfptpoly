import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Link } from "react-router-dom";
const ReactSideBar = () => {
  return (
    <Sidebar>
      <Menu style={{ textAlign: "center" }}>
        <MenuItem> Dashboard </MenuItem>
        <hr />
        <MenuItem component={<Link to={"/admin/banhangofline"} />}>
          Bán Hàng
        </MenuItem>
        <hr />
        <MenuItem component={<Link to={"/admin/quanlynhanvien"} />}>
          Quản lý nhân viên
        </MenuItem>
        <hr />
        <MenuItem component={<Link to={"/admin/quanlysanpham"} />}>
          Quản lý sản phẩm
        </MenuItem>
        <hr />
        <MenuItem component={<Link to={"/admin/quanlykhachhang"} />}>
          Quản lý Khách hàng
        </MenuItem>
        <hr />
        <MenuItem component={<Link to={"/admin/quanlydoidiem"} />}>
          Quản lý đổi điểm{" "}
        </MenuItem>
        <hr />
        <MenuItem component={<Link to={"/admin/quanlyvoucher"} />}>
          Quản lý voucher
        </MenuItem>
        <hr />
        <MenuItem component={<Link to={"/admin/quanlykhuyenmai"} />}>
          Quản lý khuyến mãi
        </MenuItem>
        <hr />
        <MenuItem component={<Link to={"/admin/quanlyhoadon"} />}>
          Quản lý hóa đơn
        </MenuItem>
        <hr />
        <MenuItem component={<Link to={"/admin/thongke"} />}>Thống kê</MenuItem>
      </Menu>
    </Sidebar>
  );
};

export default ReactSideBar;
