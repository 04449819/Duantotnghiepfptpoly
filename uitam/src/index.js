import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./style/style.scss";
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import App from "./pages/index.js";
import Homepage from "./pages/users/homepage/index.js";
import Admin from "./pages/admin/Admin.js";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<App />}>
        <Route index element={<Homepage />}></Route>
        <Route path="/sanphammoi"></Route>
      </Route>
      <Route path="/admin" element={<Admin />} />
    </Routes>
  </BrowserRouter>
);
