import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/client/dashboard";
import BookingHistory from "../pages/client/booking/BookingHistory";
import BookingByClient from "../pages/client/booking/BookingClient";
import Paymenthistory from "../pages/client/payment/Paymenthistroy";
import PaymentPage from "../pages/client/payment/PaymentPage";
const ClientPageRoutes = () => {
  return (
    <Routes>
      <Route path="/client/dashboard" element={<Dashboard />} />
      <Route path="/client/appointment-history" element={<BookingHistory />} />

      <Route path="/client/book-appointment" element={<BookingByClient />} />
      <Route path="/client/payment-histroy" element={<Paymenthistory />} />
      <Route path="/client/payment-Info" element={<PaymentPage />} />
    </Routes>
  );
};

export default ClientPageRoutes;
