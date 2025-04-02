import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Salondashboard from "../pages/sadmin/dashboard";
import Calender from "../pages/sadmin/booking/index";
import SAViewBooking from "../pages/sadmin/booking/viewbooking";
import Employee from "../pages/sadmin/employee/index";
import SAreport from "../pages/sadmin/report/index";
import Customerreport from "../pages/sadmin/report/customer-report";
import EmployeeReport from "../pages/sadmin/report/employee-report";
import BookingReport from "../pages/sadmin/report/booking-report";
import SASetting from "../pages/sadmin/settings/index";
import SAViewEmployee from "../pages/sadmin/employee/viewEmployee";
import ProfilePage from "../pages/sadmin/profilepage";
import Createcustomer from "../pages/sadmin/customer/create-customer";
import SAallCustomer from "../pages/sadmin/customer/all-customer";
import CreateService from "../pages/sadmin/service/createservice";
import ViewService from "../pages/sadmin/service/viewservice";
import CreateProduct from "../pages/sadmin/product/createproduct";
import AllProduct from "../pages/sadmin/product/allproduct";
import Stockmangement from "../pages/sadmin/product/stockmanagement";
import Assignrole from "../pages/sadmin/employee/assignrole";
import AssignStaff from "../pages/sadmin/service/assignstaff";
import ViewServicee from "../pages/sadmin/service/viewservice";
import ViewBranch from "../pages/sadmin/branch/view-branch";
import SalonNewBooking from "../pages/sadmin/booking/newbooking";
import Allorders from "../pages/sadmin/orders/allorders";
import CreateCategory from "../pages/sadmin/product/createcategory";
import SalonCalendardummy from "../pages/sadmin/booking/SalonCalendar";
import ClientDetails from "../pages/sadmin/customer/client-info";

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
        path="/sadmin/btesting"
        element={
          <ProtectedRoute>
            <SalonCalendardummy />
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
        path="/sadmin/new-booking"
        element={
          <ProtectedRoute>
            <SalonNewBooking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/create-service"
        element={
          <ProtectedRoute>
            <CreateService />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/view-services"
        element={
          <ProtectedRoute>
            <ViewService />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/create-customer"
        element={
          <ProtectedRoute>
            <Createcustomer />
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
        path="/sadmin/customer-report"
        element={
          <ProtectedRoute>
            <Customerreport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/employee-report"
        element={
          <ProtectedRoute>
            <EmployeeReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/booking-report"
        element={
          <ProtectedRoute>
            <BookingReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/assign-branch"
        element={
          <ProtectedRoute>
            <SASetting />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/view-branch"
        element={
          <ProtectedRoute>
            <ViewBranch />
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
      <Route
        path="/sadmin/create-product"
        element={
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/create-category"
        element={
          <ProtectedRoute>
            <CreateCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/display-product"
        element={
          <ProtectedRoute>
            <AllProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/stock-management"
        element={
          <ProtectedRoute>
            <Stockmangement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/assign-role"
        element={
          <ProtectedRoute>
            <Assignrole />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/assign-staff"
        element={
          <ProtectedRoute>
            <AssignStaff />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/all-orders"
        element={
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/services-duration"
        element={
          <ProtectedRoute>
            <ViewServicee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sadmin/client-info/:id"
        element={
          <ProtectedRoute>
            <ClientDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default SalonAdminRoutes;
