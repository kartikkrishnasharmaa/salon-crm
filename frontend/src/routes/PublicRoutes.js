import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import Home from "../pages/homepage/home";
import SalonadminLogin from "../pages/auth/SALogin";
import CustomerLogin from "../pages/auth/CustomerLogin";
import CustomerSignup from "../pages/auth/CustomerSignup";



const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Super admin routes */}

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* salon admin routes */}
      <Route path="/salon-admin/login" element={<SalonadminLogin />} />

      {/* Client login */}
      <Route path="/client/login" element={<CustomerLogin/>} />
      <Route path="/client/signup" element={<CustomerSignup/>} />
    </Routes>
  );
};

export default PublicRoutes;
