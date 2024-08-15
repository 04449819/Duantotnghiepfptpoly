import Header from "./Pages/User/theme/Header/Header";
import Footer from "./Pages/User/theme/Footer/Footer";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import BarLoader from "react-spinners/BarLoader";

import { useSelector } from "react-redux";
import { useEffect } from "react";
const App = () => {
  const loading = useSelector((p) => p.Loading.Loading);

  const user = useSelector((p) => p.user.giohangonl);
  useEffect(() => {
    console.log("ok", user);
    if (user && user.vaiTro === 1) {
      console.log(user);
    }
  }, [user]);

  return (
    <div className="App">
      <BarLoader
        color="rgba(54, 214, 181, 1)"
        cssOverride={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 2001,
        }}
        height={4}
        loading={loading}
        speedMultiplier={0.5}
        width={1550}
      />
      <div
        style={{ position: "fixed", zIndex: "20", width: "1520px" }}
        className="Header"
      >
        <Header />
      </div>
      <div
        style={{ paddingTop: "115px", backgroundColor: "#e1e1e1" }}
        className="content"
      >
        <Outlet />
      </div>
      <div className="Footer">
        <Footer />
      </div>
      {loading && <div className="overlay"></div>}
    </div>
  );
};

export default App;
