import SideBar from "./Sidebar/Sidebar";

const Admin = (props) => {
  return (
    <div className="Admin-Container">
      <div className="Slide-bar">
        <SideBar />
      </div>
      <div className="content"></div>
    </div>
  );
};
export default Admin;
