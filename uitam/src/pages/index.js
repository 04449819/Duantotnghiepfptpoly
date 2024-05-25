import { Outlet } from "react-router-dom";
import Header from "./users/theme/header";
import Footer from "./users/theme/footer";
const App = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default App;
