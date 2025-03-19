import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SAAdminLayout from "../../../layouts/Salonadmin";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "../../../api/axiosConfig";
import Modal from "react-modal";
import {
  FaShoppingCart,
  FaUser,
  FaCalendarPlus,
  FaWindowClose,
} from "react-icons/fa"; // Import icons

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const localizer = momentLocalizer(moment);
Modal.setAppElement("#root");

const servicesList = [
  { name: "Haircut", price: "₹500", time: "30 mins" },
  { name: "Facial", price: "₹800", time: "45 mins" },
  { name: "Spa", price: "₹1200", time: "60 mins" },
  { name: "Massage", price: "₹1500", time: "90 mins" },
];
const pastHistory = [
  { name: "Haircut", date: "10 March 2025" },
  { name: "Facial", date: "15 March 2025" },
];
const EmployeeCalendar = () => {
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("week");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [customerType, setCustomerType] = useState("walkin");
  const [staffType, setStaffType] = useState("single");
  const [bookingData, setBookingData] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [frequentServices, setFrequentServices] = useState([]);
  const [bookingSummary, setBookingSummary] = useState(null);

  useEffect(() => {
    // Frequent services randomly select honge
    const shuffled = [...servicesList].sort(() => 0.5 - Math.random());
    setFrequentServices(shuffled.slice(0, 3)); // Sirf 3 services dikhani hain
  }, []);

  const handleServiceSelect = (service) => {
    if (!selectedServices.some((s) => s.name === service.name)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeService = (serviceName) => {
    setSelectedServices(selectedServices.filter((s) => s.name !== serviceName));
  };

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

        const formattedAppointments = res.data.appointments
          .map((appointment) => {
            if (
              !appointment.date ||
              !appointment.startTime ||
              !appointment.endTime
            ) {
              console.warn("Invalid appointment data:", appointment);
              return null;
            }

            // ✅ Convert Date from UTC to Local
            const appointmentDate = new Date(appointment.date);
            const [startHours, startMinutes] = appointment.startTime
              .split(":")
              .map(Number);
            const [endHours, endMinutes] = appointment.endTime
              .split(":")
              .map(Number);

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
          })
          .filter(Boolean); // Remove null values

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
  useEffect(() => {}, [employees, customers]);

  const handleViewChange = (newView) => setView(newView);

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(moment(slotInfo.start).format("YYYY-MM-DD"));
    setSelectedTime(moment(slotInfo.start).format("HH:mm"));
    setModalIsOpen(true);
  };
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const newBooking = {
      branchId: selectedBranch,
      date: selectedDate,
      startTime: selectedTime,
      employeeId: selectedEmployee,
      customerId: selectedCustomer,
      service,
    };

    // try {
    //   await axios.post("/booking/create", newBooking, {
    //     headers: { Authorization: `Bearer ${token}` },
    //   });
    //   toast.success("Booking Created Successfully!");
    //   setBookingModalOpen(false);
    // } catch (error) {
    //   console.error("Booking Error:", error);
    //   toast.error("Booking Failed!");
    // }
    const summaryData = {
      customer:
        customers.find((c) => c._id === selectedCustomer)?.name || "Unknown",
      service: service.name,
      price: service.price,
      date: selectedDate,
      time: selectedTime,
    };
    setBookingSummary(summaryData); // 🔥 Summary set karein
  };
  const navigate = useNavigate();

  const listItems = [
    {
      icon: <FaCalendarPlus className="text-purple-500 text-2xl" />,
      text: "Add Ticket",
      link: selectedBranch
        ? `/sadmin/new-booking?branchId=${selectedBranch}`
        : "/sadmin/new-booking",
    },

    {
      icon: <FaUser className="text-red-500 text-2xl" />,
      text: "Block Time",
      link: selectedBranch
        ? `/sadmin/new-booking?branchId=${selectedBranch}`
        : "/sadmin/new-booking",
    },
    {
      icon: <FaShoppingCart className="text-blue-500 text-2xl" />,
      text: "Insta Sale",
      link: selectedBranch
        ? `/sadmin/new-booking?branchId=${selectedBranch}`
        : "/sadmin/new-booking",
    },
  ];
  return (
    <SAAdminLayout>
      <div
        style={{ position: "relative", padding: "20px", textAlign: "center" }}
      >
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
            onView={setView}
            selectable
            onSelectSlot={() => setModalIsOpen(true)}
          />
        </div>
      </div>

      {/* 🔹 Ticket Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1000 },
          content: {
            width: "300px",
            height: "300px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "white",
          },
        }}
      >
        <div className="space-y-3">
          {listItems.map((item, index) => (
            <button
              key={index}
              className="flex items-center space-x-6 p-3 w-max rounded-lg hover:bg-gray-200"
              onClick={() => {
                setModalIsOpen(false);
                setBookingModalOpen(true);
              }}
            >
              {item.icon}

              <span className="ml-4 text-lg font-medium">{item.text}</span>
            </button>
          ))}
        </div>
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={() => setModalIsOpen(false)}
        >
          <FaWindowClose />
        </button>
      </Modal>

      {/* 🔹 Booking Form Modal */}
      <Modal
        isOpen={bookingModalOpen}
        onRequestClose={() => setBookingModalOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1100 },
          content: {
            width: "90%",
            maxWidth: "1200px",
            height: "90%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "white",
            overflow: "auto",
          },
        }}
      >
        <h2 className="text-lg font-bold mb-3">New Booking</h2>

        <form onSubmit={handleBookingSubmit} className="flex flex-wrap gap-4">
          {/* Date & Time */}
          <div className="flex flex-col">
            <label>Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border rounded p-2 w-44"
            />
          </div>
          <div className="flex flex-col">
            <label>Select Time</label>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="border rounded p-2 w-44"
            />
          </div>

          {/* Personal Details */}
          <div className="flex flex-col">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="border rounded p-2 w-44"
              placeholder="First Name"
            />
          </div>
          <div className="flex flex-col">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="border rounded p-2 w-44"
              placeholder="Last Name"
            />
          </div>

          {/* Contact Details */}
          <div className="flex flex-col">
            <label>Mobile Number</label>
            <input
              type="text"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="border rounded p-2 w-44"
              placeholder="Mobile Number"
            />
          </div>
          <div className="flex flex-col">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border rounded p-2 w-44"
              placeholder="Email"
            />
          </div>

          {/* Gender Selection */}
          <div className="flex flex-col">
            <label>Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border rounded p-2 w-44"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Customer Type */}
          <div className="flex flex-col">
            <label>Customer Type</label>
            <select
              value={customerType}
              onChange={(e) => setCustomerType(e.target.value)}
              className="border rounded p-2 w-44"
            >
              <option value="walkin">Walk-in</option>
              <option value="appointment">Appointment</option>
            </select>
          </div>

          {/* Staff Type */}
          <div className="flex flex-col">
            <label>Staff Type</label>
            <select
              value={staffType}
              onChange={(e) => setStaffType(e.target.value)}
              className="border rounded p-2 w-44"
            >
              <option value="single">Single Staff</option>
              <option value="multiple">Multiple Staff</option>
            </select>
          </div>

          {/* 3 Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {/* Service List */}
            <div className="border p-3 rounded-md overflow-auto">
              <h3 className="text-lg font-semibold mb-2">Select Services</h3>
              {servicesList.map((service, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => handleServiceSelect(service)}
                >
                  <span>{service.name}</span>
                  <span>{service.price}</span>
                  <span>{service.time}</span>
                </div>
              ))}
            </div>

            {/* Past History */}
            <div className="border p-3 rounded-md overflow-auto">
              <h3 className="text-lg font-semibold mb-2">
                Client Past History
              </h3>
              {pastHistory.length > 0 ? (
                pastHistory.map((history, index) => (
                  <div key={index} className="p-2 border-b">
                    <span>
                      {history.name} - {history.date}
                    </span>
                  </div>
                ))
              ) : (
                <p>No past services found.</p>
              )}
            </div>

            {/* Frequent Services */}
            <div className="border p-3 rounded-md overflow-auto">
              <h3 className="text-lg font-semibold mb-2">Frequent Services</h3>
              {frequentServices.map((service, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100"
                  onClick={() => handleServiceSelect(service)}
                >
                  <span>{service.name}</span>
                  <span>{service.price}</span>
                  <span>{service.time}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Booking Summary - Full Width */}
          {bookingSummary && (
            <div className="w-full bg-gray-100 p-4 rounded-md shadow-md mb-4">
              <h3 className="text-lg font-bold mb-2">Booking Summary</h3>

              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 p-2">Service</th>
                    <th className="border border-gray-300 p-2">Customer</th>
                    <th className="border border-gray-300 p-2">Price</th>
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(bookingSummary) ? (
                    bookingSummary.map((booking, index) => (
                      <tr key={index} className="text-center">
                        <td className="border border-gray-300 p-2">
                          {booking.service}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {booking.customer}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {booking.price}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {booking.date}
                        </td>
                        <td className="border border-gray-300 p-2">
                          {booking.time}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center p-2">
                        No booking data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {/* Submit Button */}
          <div className="w-full mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded w-full"
            >
              Submit Booking
            </button>
          </div>
        </form>

        {/* Scrollable Table for Horizontal View */}
        {bookingData.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
            <table className="border-collapse border border-gray-400 min-w-[1200px]">
              <thead>
                <tr className="bg-gray-200 text-sm">
                  <th className="border p-2">Date</th>
                  <th className="border p-2">Time</th>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Mobile</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Gender</th>
                  <th className="border p-2">Customer Type</th>
                  <th className="border p-2">Staff Type</th>
                  <th className="border p-2">Service</th>
                </tr>
              </thead>
              <tbody>
                {bookingData.map((booking, index) => (
                  <tr key={index} className="text-center text-sm">
                    <td className="border p-2">{booking.date}</td>
                    <td className="border p-2">{booking.time}</td>
                    <td className="border p-2">
                      {booking.firstName} {booking.lastName}
                    </td>
                    <td className="border p-2">{booking.mobile}</td>
                    <td className="border p-2">{booking.email}</td>
                    <td className="border p-2">{booking.gender}</td>
                    <td className="border p-2">{booking.customerType}</td>
                    <td className="border p-2">{booking.staffType}</td>
                    <td className="border p-2">{booking.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
      <ToastContainer />
    </SAAdminLayout>
  );
};

export default EmployeeCalendar;
