import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Salondashboard from "../pages/sadmin/dashboard";
import Calender from "../pages/sadmin/booking/index";
import SAViewBooking from "../pages/sadmin/booking/viewbooking";
import Employee from "../pages/sadmin/employee/index";
import SAreport from "../pages/sadmin/report/index";
import SAcreatereport from "../pages/sadmin/report/create_report";
import SASetting from "../pages/sadmin/settings/index";
import SAViewEmployee from "../pages/sadmin/employee/viewEmployee";
import ProfilePage from "../pages/sadmin/profilepage";
import Createcustomer from "../pages/sadmin/customer/create-customer";
import SAallCustomer from "../pages/sadmin/customer/all-customer";

const SalonAdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/sadmin/dashboard"
        element={
          <ProtectedRoute>
            <Salondashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/create-booking"
        element={
          <ProtectedRoute>
            <Calender />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/view-booking"
        element={
          <ProtectedRoute>
            <SAViewBooking />
          </ProtectedRoute>
        }
      />
        <Route
        path="/sadmin/create-customer"
        element={
          <ProtectedRoute>
            <Createcustomer/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/view-allcustomer"
        element={
          <ProtectedRoute>
            <SAallCustomer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/employee"
        element={
          <ProtectedRoute>
            <Employee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/view-employee"
        element={
          <ProtectedRoute>
            <SAViewEmployee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/report"
        element={
          <ProtectedRoute>
            <SAreport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/create-report"
        element={
          <ProtectedRoute>
            <SAcreatereport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/settings"
        element={
          <ProtectedRoute>
            <SASetting />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default SalonAdminRoutes;
