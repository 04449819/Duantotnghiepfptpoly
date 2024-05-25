import Header from "./Pages/User/theme/Header/Header";
import Footerq from "./Pages/User/theme/Footer/Footer";
import { Outlet } from "react-router-dom";
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
    </div>
  );
}

export default Index;
