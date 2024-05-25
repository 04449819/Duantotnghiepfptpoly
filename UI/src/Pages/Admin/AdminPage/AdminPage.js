import ReactSideBar from "../ReactSidebar/ReactSidebar";
import "./AdminPage.scss";
const AdminPage = () => {
  return (
    <div className="adminpage">
      <div className="sidebar">
        <ReactSideBar />
      </div>
      <div className="content"></div>
    </div>
  );
};
export default AdminPage;
