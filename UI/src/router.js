import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/users/homepage";
import MasterLayout from "./pages/users/theme/masterLayout";
import { ROUTERS } from "./utils/router";
import ProfilePage from "./pages/users/profilePage";

const renDerUserRouter = () => {
  const userRouters = [
    {
      path: ROUTERS.USER.HOME,
      component: <Homepage />,
    },
    {
      path: ROUTERS.USER.PROFILE,
      component: <ProfilePage />,
    },
  ];

  return (
    <MasterLayout>
      <Routes>
        {userRouters.map((item, key) => (
          <Route key={key} path={item.path} element={item.component}></Route>
        ))}
      </Routes>
    </MasterLayout>
  );
};

const Routercustom = () => {
  return renDerUserRouter();
};

export default Routercustom;
