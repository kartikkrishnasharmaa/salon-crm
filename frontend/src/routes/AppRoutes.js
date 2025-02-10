import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// public routes
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Home from '../pages/homepage/home';

// admin routes
import Dashboard from '../pages/admin/Dashboard';
import Booking from '../pages/admin/ManageBookings';
import Clients from '../pages/admin/ManageClients';
import Alluser from '../pages/admin/Allusers';
import Salonadmin from '../pages/admin/Salonadmin';
import Viewalladmin from '../pages/admin/AllSalonAdmin';
import Viewsingleadmin from '../pages/admin/Viewsingleadmin';


// salon admin routes
import SalonadminLogin from '../pages/auth/SALogin';
import Salondashboard from '../pages/sadmin/dashboard';
import Calender from '../pages/sadmin/booking/index';
import SAViewBooking from '../pages/sadmin/booking/viewbooking';
import Employee from '../pages/sadmin/employee/index';
import SAreport from '../pages/sadmin/report/index';
import SASetting from '../pages/sadmin/settings/index';
import SAViewSetting from '../pages/sadmin/settings/index';



// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check for token

  if (!isAuthenticated) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }
  return children; // Render children if authenticated
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        {/* super admin public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />


        {/* salon admin public route */}
        <Route path="/salon-admin/login" element={<SalonadminLogin />} />



        {/* Protected Admin Routes */}
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

        {/* // salon admin routes */}

        <Route
          path="/sadmin/dashboard"
          element={
            <ProtectedRoute>
              <Salondashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/sadmin/booking"
          element={
            <ProtectedRoute>
              <Salonbooking />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/sadmin/employee"
          element={
            <ProtectedRoute>
              <Employee />
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
          path="/sadmin/settings"
          element={
            <ProtectedRoute>
              <SASetting />
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
          path="/sadmin/view-settings"
          element={
            <ProtectedRoute>
              <SAViewBooking />
            </ProtectedRoute>
          }
        />



      </Routes>

    </Router >
  );
};

export default AppRoutes;
