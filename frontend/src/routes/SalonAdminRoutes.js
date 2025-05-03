import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Salondashboard from "../pages/salonadmin/dashboard";
import Calender from "../pages/salonadmin/booking/index";
import SAViewBooking from "../pages/salonadmin/booking/viewbooking";
import Employee from "../pages/salonadmin/employee/index";
import SAreport from "../pages/salonadmin/report/index";
import Customerreport from "../pages/salonadmin/report/customer-report";
import EmployeeReport from "../pages/salonadmin/report/employee-report";
import BookingReport from "../pages/salonadmin/report/booking-report";
import SASetting from "../pages/salonadmin/settings/index";
import SAViewEmployee from "../pages/salonadmin/employee/viewEmployee";
import ProfilePage from "../pages/salonadmin/profilepage";
import Createcustomer from "../pages/salonadmin/customer/create-customer";
import SAallCustomer from "../pages/salonadmin/customer/all-customer";
import CreateService from "../pages/salonadmin/service/createservice";
import ViewService from "../pages/salonadmin/service/viewservice";
import CreateProduct from "../pages/salonadmin/product/createproduct";
import AllProduct from "../pages/salonadmin/product/allproduct";
import Assignrole from "../pages/salonadmin/employee/assignrole";
import ViewServicee from "../pages/salonadmin/service/viewservice";
import ViewBranch from "../pages/salonadmin/branch/view-branch";
import MainbranchPage from "../pages/salonadmin/branch/main";
import SalonNewBooking from "../pages/salonadmin/booking/newbooking";
import Allorders from "../pages/salonadmin/orders/allorders";
import CreateCategory from "../pages/salonadmin/product/createcategory";
import CreateServiceCategory from "../pages/salonadmin/service/createcategory";
import SalonCalendardummy from "../pages/salonadmin/booking/SalonCalendar";
import ClientDetails from "../pages/salonadmin/customer/client-info";
import Branchlist from "../pages/salonadmin/branch/branchlist";

const SalonAdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="/salonadmin/dashboard"
        element={
          <ProtectedRoute>
            <Salondashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/btesting"
        element={
          <ProtectedRoute>
            <SalonCalendardummy />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/create-booking"
        element={
          <ProtectedRoute>
            <Calender />
          </ProtectedRoute>
        }
      />

      <Route
        path="/salonadmin/view-booking"
        element={
          <ProtectedRoute>
            <SAViewBooking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/new-booking"
        element={
          <ProtectedRoute>
            <SalonNewBooking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/create-service"
        element={
          <ProtectedRoute>
            <CreateService />
          </ProtectedRoute>
        }
      />
         <Route
        path="/salonadmin/create-service-category"
        element={
          <ProtectedRoute>
            <CreateServiceCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/view-services"
        element={
          <ProtectedRoute>
            <ViewService />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/create-customer"
        element={
          <ProtectedRoute>
            <Createcustomer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/view-allcustomer"
        element={
          <ProtectedRoute>
            <SAallCustomer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/employee"
        element={
          <ProtectedRoute>
            <Employee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/view-employee"
        element={
          <ProtectedRoute>
            <SAViewEmployee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/report"
        element={
          <ProtectedRoute>
            <SAreport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/customer-report"
        element={
          <ProtectedRoute>
            <Customerreport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/employee-report"
        element={
          <ProtectedRoute>
            <EmployeeReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/booking-report"
        element={
          <ProtectedRoute>
            <BookingReport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/assign-branch"
        element={
          <ProtectedRoute>
            <SASetting />
          </ProtectedRoute>
        }/>

<Route
        path="/salonadmin/main-branch/:branchId"
        element={
          <ProtectedRoute>
            <MainbranchPage />
          </ProtectedRoute>
        }
      />
 <Route
        path="/salonadmin/all-branch"
        element={
          <ProtectedRoute>
            <Branchlist />
          </ProtectedRoute>
        }
      />

      <Route
        path="/salonadmin/view-branch"
        element={
          <ProtectedRoute>
            <ViewBranch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/create-product"
        element={
          <ProtectedRoute>
            <CreateProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/create-product-category"
        element={
          <ProtectedRoute>
            <CreateCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/display-product"
        element={
          <ProtectedRoute>
            <AllProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/assign-role"
        element={
          <ProtectedRoute>
            <Assignrole />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/salonadmin/all-orders"
        element={
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/services-duration"
        element={
          <ProtectedRoute>
            <ViewServicee />
          </ProtectedRoute>
        }
      />
      <Route
        path="/salonadmin/client-info/:id"
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
