import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
const ReactSideBar = () => {
  return (
    <Sidebar>
      <Menu style={{ textAlign: "center" }}>
        <MenuItem> Dashboard </MenuItem>
        <hr />
        <SubMenu label="Quản lý đơn hàng">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <hr />
        <SubMenu label="Bán hàng">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <hr />
        <SubMenu icon="" label="Quản lý sản phẩm">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <hr />
        <SubMenu label="Quản lý Khách hàng">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
        <hr />
        <SubMenu label="Quản lý đổi trả">
          <MenuItem> Pie charts </MenuItem>
          <MenuItem> Line charts </MenuItem>
        </SubMenu>
      </Menu>
    </Sidebar>
  );
};

export default ReactSideBar;
