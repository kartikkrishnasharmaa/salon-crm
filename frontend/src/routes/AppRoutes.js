import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import SuperAdminRoutes from "./SuperAdminRoutes";
import SalonAdminRoutes from "./SalonAdminRoutes";
import ClientPageRoutes from "./ClientRoutes";

const AppRoutes = () => {
  return (
    <Router>
      <PublicRoutes />
      <SuperAdminRoutes />
      <SalonAdminRoutes />
      <ClientPageRoutes />
    </Router>
  );
};

export default AppRoutes;