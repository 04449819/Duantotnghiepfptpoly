import ReactSideBar from "./ReactSidebar/ReactSidebar";
import "./AdminPage.scss";
import BarLoader from "react-spinners/BarLoader";
import { useSelector } from "react-redux";
const AdminPage = () => {
  const loading = useSelector((p) => p.Loading.Loading);
  return (
    <div className="adminpage">
      <BarLoader
        color="rgba(54, 214, 181, 1)"
        cssOverride={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2000,
        }}
        height={4}
        loading={loading}
        speedMultiplier={0.5}
        width={1550}
      />
      <ReactSideBar />
    </div>
  );
};
export default AdminPage;
