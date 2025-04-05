import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";
import SalonAdminRoutes from "./SalonAdminRoutes";

const AppRoutes = () => {
  return (
    <Router>
      <PublicRoutes />
      <SuperAdminRoutes />
      <SalonAdminRoutes />
    </Router>
  );
};

export default AppRoutes;