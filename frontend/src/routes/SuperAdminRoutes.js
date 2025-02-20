import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";
import Booking from "../pages/admin/ManageBookings";
import Clients from "../pages/admin/ManageClients";
import Alluser from "../pages/admin/Allusers";
import Salonadmin from "../pages/admin/Salonadmin";
import Viewalladmin from "../pages/admin/AllSalonAdmin";
import Viewsingleadmin from "../pages/admin/Viewsingleadmin";
import SalonBranchCreate from "../pages/admin/Branch";
import Viewbranch from "../pages/admin/Viewbranch";

const SuperAdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/salonadmin"
        element={
          <ProtectedRoute>
            <Salonadmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/view-salonadmin"
        element={
          <ProtectedRoute>
            <Viewalladmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/view-single-admin/:adminId"
        element={
          <ProtectedRoute>
            <Viewsingleadmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/clients"
        element={
          <ProtectedRoute>
            <Clients />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/all-users"
        element={
          <ProtectedRoute>
            <Alluser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/bookings"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/create-branch"
        element={
          <ProtectedRoute>
            <SalonBranchCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/view-branch"
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
