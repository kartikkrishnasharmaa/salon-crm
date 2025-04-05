import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/superadmin/Dashboard";
import Booking from "../pages/superadmin/ManageBookings";
import Clients from "../pages/superadmin/ManageClients";
import Alluser from "../pages/superadmin/Allusers";
import Salonadmin from "../pages/superadmin/Salonadmin";
import Viewalladmin from "../pages/superadmin/AllSalonAdmin";
import Viewsingleadmin from "../pages/superadmin/Viewsingleadmin";
import SalonBranchCreate from "../pages/superadmin/Branch";
import Viewbranch from "../pages/superadmin/Viewbranch";

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/superadmin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/salonadmin"
        element={
          <ProtectedRoute>
            <Salonadmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/view-salonadmin"
        element={
          <ProtectedRoute>
            <Viewalladmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/view-single-admin/:adminId"
        element={
          <ProtectedRoute>
            <Viewsingleadmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/clients"
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/all-users"
        element={
          <ProtectedRoute>
            <Alluser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/bookings"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/create-branch"
        element={
          <ProtectedRoute>
            <SalonBranchCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/superadmin/view-branch"
        element={
          <ProtectedRoute>
            <Viewbranch />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default SuperAdminRoutes;
