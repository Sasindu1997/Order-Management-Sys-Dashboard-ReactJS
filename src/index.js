/**
=========================================================
* Dashboard React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { Routes, Route, Navigate, useLocation, HashRouter } from "react-router-dom";

// Dashboard React Context Provider
import { MaterialUIControllerProvider } from "context";

ReactDOM.render(
  <HashRouter> 
    <MaterialUIControllerProvider >
      <App />
    </MaterialUIControllerProvider>
  </HashRouter>,
  document.getElementById("root")
);
