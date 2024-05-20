import React from "react";
import ReactDOM from "react-dom/client";
import Routercustom from "./router.js";
import { BrowserRouter } from "react-router-dom";
import "./style/style.scss";
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routercustom />
  </BrowserRouter>
);
