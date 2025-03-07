import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import SAAdminLayout from "../../../layouts/Salonadmin";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "../../../api/axiosConfig";

const localizer = momentLocalizer(moment);

const EmployeeCalendar = () => {
  const [employees, setEmployees] = useState([]);
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("week"); // ✅ Default view: week

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       setError("Unauthorized: No token found");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       // ✅ Fetch Employees
  //       const employeeRes = await axios.get("/employee/all-employees", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setEmployees(employeeRes.data.employees);

  //       // ✅ Fetch Appointments
  //       const appointmentRes = await axios.get("/booking/get-all-appointments", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       setEvents(appointmentRes.data);
  //     } catch (error) {
  //       setError(error.response?.data?.message || "Failed to fetch data");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // ✅ Custom Week Header (Employee Above Dates)
  // const CustomWeekHeader = ({ date }) => {
  //   const employeeIndex = moment(date).weekday(); // ✅ Employee ka index based on weekday
  //   return (
  //     <div className="flex flex-col items-center min-h-[90px]">
  //       <span className="text-blue-600 font-semibold">
  //         {employees[employeeIndex] ? employees[employeeIndex].name : "No Employee"}
  //       </span>
  //       <span className="text-gray-700 text-sm font-medium">
  //         {moment(date).format("ddd, MMM D")}
  //       </span>
  //     </div>
  //   );
  // };

  // ✅ Handle view change
  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <SAAdminLayout>
      <div style={{ position: "relative" }}>
    

        {/* {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : ( */}
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, background: "white", borderRadius: "10px" }}
            view={view}
            views={["month", "week", "day"]}
            toolbar={true}
            onView={handleViewChange}
            // components={{
            //   week: {
            //     header: CustomWeekHeader, // ✅ Employees above dates
            //   },
            // }}
          />
      
      </div>
    </SAAdminLayout>
  );
};

export default EmployeeCalendar;
