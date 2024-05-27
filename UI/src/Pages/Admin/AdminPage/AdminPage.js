import ReactSideBar from "./ReactSidebar/ReactSidebar";
import "./AdminPage.scss";
import { Outlet } from "react-router-dom";
const AdminPage = () => {
  return (
    <div className="adminpage">
      <div className="sidebar">
        <ReactSideBar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};
export default AdminPage;
