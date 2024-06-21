import Header from "./Pages/User/theme/Header/Header";
import Footerq from "./Pages/User/theme/Footer/Footer";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Index() {
  return (
    <div className="App">
      <div className="Header">
        <Header />
      </div>
      <div className="content">
        <Outlet />
      </div>
      <div className="Footer">
        <Footerq />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={1000}
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
}

export default Index;
