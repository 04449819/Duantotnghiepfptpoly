import Header from "./Pages/User/theme/Header/Header";
import Footerq from "./Pages/User/theme/Footer/Footer";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import BarLoader from "react-spinners/BarLoader";
import { useSelector } from "react-redux";
const Index = () => {
  const loading = useSelector((p) => p.Loading.Loading);

  return (
    <div className="App">
      <BarLoader
        color="rgba(54, 214, 181, 1)"
        cssOverride={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 5,
        }}
        height={4}
        loading={loading}
        speedMultiplier={0.5}
        width={1550}
      />
      <div className="Header">
        <Header />
      </div>
      <div className="content">
        <Outlet />
      </div>
      <div className="Footer">
        <Footerq />
      </div>
    </div>
  );
};

export default Index;
