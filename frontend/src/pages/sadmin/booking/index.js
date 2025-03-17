import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SAAdminLayout from "../../../layouts/Salonadmin";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "../../../api/axiosConfig";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const localizer = momentLocalizer(moment);
Modal.setAppElement("#root");

const EmployeeCalendar = () => {
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("week");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [selectedTime, setSelectedTime] = useState(moment().format("HH:mm"));
  const [selectedendTime, setSelectedendTime] = useState(
    moment().format("HH:mm")
  );
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [service, setService] = useState("");
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  const token = localStorage.getItem("token");

  // 🔹 Fetch Employees
  useEffect(() => {
    if (!selectedBranch || !token) return;
    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          `/employee/all/employees?branchId=${selectedBranch}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Employees:", res.data);
        setEmployees(res.data?.employees || []);
      } catch (error) {
        console.error("Error fetching employees", error);
        setEmployees([]);
      }
    };
    fetchEmployees();
  }, [selectedBranch, token]);

  // 🔹 Fetch Customers
  useEffect(() => {
    if (!selectedBranch || !token) return;
    const fetchCustomers = async () => {
      try {
        const res = await axios.get(
          `/customer/salon/customers?branchId=${selectedBranch}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Customers:", res.data);
        setCustomers(res.data?.customers || []);
      } catch (error) {
        console.error("Error fetching customers", error);
        setCustomers([]);
      }
    };
    fetchCustomers();
  }, [selectedBranch, token]);

  useEffect(() => {
    if (!selectedBranch || !token) return;
    
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `/booking/get-appointments?branchId=${selectedBranch}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        console.log("Raw Appointments Data:", res.data.appointments); // ✅ Debug
  
        const formattedAppointments = res.data.appointments.map((appointment) => {
          if (!appointment.date || !appointment.startTime || !appointment.endTime) {
            console.warn("Invalid appointment data:", appointment);
            return null;
          }
  
          // ✅ Convert Date from UTC to Local
          const appointmentDate = new Date(appointment.date);
          const [startHours, startMinutes] = appointment.startTime.split(":").map(Number);
          const [endHours, endMinutes] = appointment.endTime.split(":").map(Number);
  
          // ✅ Merge Date & Time Correctly
          const startDateTime = new Date(appointmentDate);
          startDateTime.setHours(startHours, startMinutes, 0, 0);
  
          const endDateTime = new Date(appointmentDate);
          endDateTime.setHours(endHours, endMinutes, 0, 0);
  
          return {
            id: appointment._id,
            title: `${appointment.customerId.name} - ${appointment.status}`,
            start: startDateTime,
            end: endDateTime,
          };
        }).filter(Boolean); // Remove null values
  
        console.log("Formatted Appointments:", formattedAppointments); // ✅ Check final output
        setEvents(formattedAppointments);
      } catch (error) {
        console.error("Error fetching appointments", error);
        setEvents([]);
      }
    };
    
    fetchAppointments();
  }, [selectedBranch, token]);
  
  // 🔹 Debugging Data in Console
  useEffect(() => {
    console.log("Updated Employees:", employees);
    console.log("Updated Customers:", customers);
  }, [employees, customers]);

  const handleViewChange = (newView) => setView(newView);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(moment(slotInfo.start).format("YYYY-MM-DD"));
    setSelectedTime(moment(slotInfo.start).format("HH:mm"));
    setModalIsOpen(true);
  };

  const handleBookingSubmit = async () => {
    try {
      if (!token || !selectedBranch) return;

      const payload = {
        customerId: selectedCustomer,
        employeeId: selectedEmployee,
        service,
        date: selectedDate,
        startTime: selectedTime,
        endTime: selectedendTime,
        branchId: selectedBranch,
      };

      console.log("Booking Payload:", payload);

      await axios.post("/booking/create-booking", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Appointment booked successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setModalIsOpen(false);
    } catch (error) {
      console.error(
        "Error creating appointment:",
        error.response?.data || error
      );
    }
  };

  return (
    <SAAdminLayout>
      <div
        style={{ position: "relative", padding: "20px", textAlign: "center" }}
      >
        <Link
          to="/sadmin/new-booking"
          className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center z-50"
        >
          <FaPlus size={24} />
        </Link>

        <div
          style={{
            height: "80vh",
            width: "100%",
            background: "white",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%", width: "100%" }}
            view={view}
            views={["month", "week", "day"]}
            toolbar={true}
            onView={handleViewChange}
            selectable
            onSelectSlot={handleSelectSlot}
          />
        </div>
      </div>

      {/* Booking Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1000 },
          content: {
            width: "450px",
            height: "470px",
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "white",
            zIndex: 1100,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
            overflowY: "auto",
          },
        }}
      >
        <h2 style={{ textAlign: "center" }}>Create Booking</h2>

        {/* 🔹 Date Input */}
        <label>Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        {/* 🔹 Start Time Input */}
        <label>Start Time:</label>
        <input
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        {/* 🔹 End Time Input */}
        <label>End Time:</label>
        <input
          type="time"
          value={selectedendTime}
          onChange={(e) => setSelectedendTime(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        {/* 🔹 Employee Dropdown */}
        <label>Employee:</label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.name}
            </option>
          ))}
        </select>

        {/* 🔹 Customer Dropdown */}
        <label>Customer:</label>
        <select
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <option value="">Select Customer</option>
          {customers.map((cust) => (
            <option key={cust._id} value={cust._id}>
              {cust.name}
            </option>
          ))}
        </select>

        {/* 🔹 Service Input */}
        <label>Service:</label>
        <input
          type="text"
          value={service}
          onChange={(e) => setService(e.target.value)}
          placeholder="Enter service name"
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />

        {/* 🔹 Debugging Logs */}
        {console.log("Modal Opened - Selected Values:", {
          selectedDate,
          selectedTime,
          selectedendTime,
          selectedEmployee,
          selectedCustomer,
          service,
        })}

        {/* 🔹 Submit Button */}
        <button
          onClick={handleBookingSubmit}
          style={{
            width: "100%",
            padding: "12px",
            background: "#ff7e5f",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginTop: "15px",
          }}
        >
          Book Appointment
        </button>
      </Modal>

      <ToastContainer />
    </SAAdminLayout>
  );
};

export default EmployeeCalendar;
