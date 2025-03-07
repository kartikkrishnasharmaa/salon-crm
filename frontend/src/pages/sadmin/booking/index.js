import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useSelector } from "react-redux";
import SAAdminLayout from "../../../layouts/Salonadmin";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "../../../api/axiosConfig";
import Modal from "react-modal";

const localizer = momentLocalizer(moment);
Modal.setAppElement("#root");

const EmployeeCalendar = () => {
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("week");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [selectedTime, setSelectedTime] = useState(moment().format("HH:mm"));
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [service, setService] = useState("");
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token || !selectedBranch) return; // Ensuring valid token and branch selection
  
      try {
        // ✅ Fetch employees
        const employeeRes = await axios.get(`/employee/all/employees?branchId=${selectedBranch}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEmployees(employeeRes.data?.employees || []);
  
        // ✅ Fetch customers correctly
        const customerRes = await axios.get(`/customer/salon/customers?branchId=${selectedBranch}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCustomers(customerRes.data?.customers || []);
  
        // ✅ Fetch appointments
        // const appointmentRes = await axios.get("/booking/get-all-appointments", {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        // setEvents(
        //   appointmentRes.data.map((appointment) => ({
        //     title: appointment.service,
        //     start: new Date(appointment.date),
        //     end: new Date(appointment.date),
        //   }))
        // );
      } catch (error) {
        console.error("Error fetching data", error);
        setEmployees([]);
        setCustomers([]);
        // setEvents([]);
      }
    };
  
    fetchData();
  }, [selectedBranch]); // Trigger effect when branch changes
  
  const handleViewChange = (newView) => setView(newView);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(moment(slotInfo.start).format("YYYY-MM-DD"));
    setSelectedTime(moment(slotInfo.start).format("HH:mm"));
    setModalIsOpen(true);
  };

  const handleBookingSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await axios.post(
        "/booking/create-appointment",
        {
          employeeId: selectedEmployee,
          customerId: selectedCustomer,
          service,
          date: `${selectedDate}T${selectedTime}`,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error creating appointment", error);
    }
  };

  return (
    <SAAdminLayout>
      <div style={{ position: "relative", padding: "20px", textAlign: "center" }}>
        <div style={{ height: "80vh", width: "100%", background: "white", borderRadius: "10px", padding: "10px" }}>
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
            maxHeight: "80vh",
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
        {/* Small "X" Close Button */}
        <button
          onClick={() => setModalIsOpen(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "18px",
            cursor: "pointer",
            color: "#555",
          }}
        >
          ✖
        </button>

        <h2 style={{ marginBottom: "15px", textAlign: "center" }}>Create Booking</h2>

        {/* Form Inputs with Flexbox */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "100%" }}>
          {[
            { label: "Date", type: "date", value: selectedDate, onChange: setSelectedDate },
            { label: "Time", type: "time", value: selectedTime, onChange: setSelectedTime },
            { label: "Service", type: "text", value: service, onChange: setService, placeholder: "Enter Service" },
          ].map(({ label, type, value, onChange, placeholder }, index) => (
            <div key={index} style={rowStyle}>
              <label style={labelStyle}>{label}:</label>
              <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
            </div>
          ))}

          {[{ label: "Employee", value: selectedEmployee, onChange: setSelectedEmployee, data: employees },
            { label: "Customer", value: selectedCustomer, onChange: setSelectedCustomer, data: customers }]
            .map(({ label, value, onChange, data }, index) => (
              <div key={index} style={rowStyle}>
                <label style={labelStyle}>{label}:</label>
                <select value={value} onChange={(e) => onChange(e.target.value)} style={inputStyle}>
                  <option value="">Select {label}</option>
                  {data.map((item) => (
                    <option key={item._id} value={item._id}>{item.name}</option>
                  ))}
                </select>
              </div>
            ))}
        </div>

        {/* Booking Submit Button */}
        <button onClick={handleBookingSubmit} style={buttonStyle}>
          Book Appointment
        </button>
      </Modal>
    </SAAdminLayout>
  );
};

// Styles
const rowStyle = { display: "flex", alignItems: "center", gap: "10px" };
const labelStyle = { width: "100px", fontWeight: "bold" };
const inputStyle = { flex: 1, padding: "8px", borderRadius: "5px", border: "1px solid #ccc" };
const buttonStyle = { width: "100%", padding: "12px", background: "#ff7e5f", color: "white", border: "none", borderRadius: "5px", marginTop: "15px" };

export default EmployeeCalendar;
