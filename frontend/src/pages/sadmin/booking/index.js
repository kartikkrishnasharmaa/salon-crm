import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useSelector } from "react-redux";
import SAAdminLayout from "../../../layouts/Salonadmin";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // Import CSS
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "../../../api/axiosConfig";
import Modal from "react-modal";
import {
  FaShoppingCart,
  FaUser,
  FaCalendarPlus,
  FaWindowClose,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import generateBill from "./billing";
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

const dummyCustomers = [
  {
    phone: "9876543210",
    name: "Amit Sharma",
    email: "amit@example.com",
    gender: "Male",
    lastName: "Sharma",
  },
  {
    phone: "9123456789",
    name: "Riya Gupta",
    email: "riya@example.com",
    gender: "Female",
    lastName: "Gupta",
  },
];

const TestingCalendarr = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("week");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    moment().format("YYYY-MM-DD")
  );
  const [selectedTime, setSelectedTime] = useState(moment().format("HH:mm"));
  const [mobile, setMobile] = useState("");
  const [customerType, setCustomerType] = useState("walkin");
  const [staffType, setStaffType] = useState("single");
  const [selectedServices, setSelectedServices] = useState([]);
  const [frequentServices, setFrequentServices] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [appointmentNote, setAppointmentNote] = useState("");
  const [clientNote, setClientNote] = useState("");
  const [bookingSummary, setBookingSummary] = useState([]);
  const [customerData, setCustomerData] = useState({
    name: "",
    email: "",
    gender: "",
    lastName: "",
  });
  const [isNewCustomer, setIsNewCustomer] = useState(false);

  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  const token = localStorage.getItem("token");

  const staffList = [
    { _id: "64f1a2b3c4d5e6f7a8b9c0d3", name: "Emily Davis" },
    { _id: "64f1a2b3c4d5e6f7a8b9c0d4", name: "John Doe" },
  ];

  const handleStaffTypeChange = (type) => {
    setStaffType(type);
    setSelectedStaff([]); // Reset selected staff when staff type changes
  };
  const handleGenerateBill = () => {
    if (bookingSummary.length === 0) {
      toast.error("No services selected to generate a bill.");
      return;
    }

    // Call the generateBill function
    generateBill(bookingSummary, customerData);
  };

  const handleMobileChange = (e) => {
    const inputMobile = e.target.value;
    setMobile(inputMobile);

    if (inputMobile.length === 10) {
      const foundCustomer = dummyCustomers.find(
        (customer) => customer.phone === inputMobile
      );
      if (foundCustomer) {
        setCustomerData({
          name: foundCustomer.name,
          email: foundCustomer.email,
          gender: foundCustomer.gender,
          lastName: foundCustomer.lastName,
        });
        setIsNewCustomer(false);
      } else {
        setCustomerData({ name: "", email: "", gender: "", lastName: "" });
        setIsNewCustomer(true);
      }
    }
  };

  const handleStaffSelect = (staffId) => {
    setSelectedStaff((prev) =>
      prev.includes(staffId)
        ? prev.filter((id) => id !== staffId)
        : [...prev, staffId]
    );
  };

  const updateBookingSummary = (services) => {
    const summary = services.map((service) => ({
      service: service.name,
      price: parseFloat(service.price.replace(/[^0-9.-]+/g, "")),
      date: selectedDate,
      time: selectedTime,
      customer: `${customerData.name} ${customerData.lastName}`,
      staff: selectedStaff
        .map(
          (staffId) => staffList.find((staff) => staff._id === staffId)?.name
        )
        .filter(Boolean)
        .join(", "),
    }));
    setBookingSummary(summary);
  };

  const handleServiceSelect = (service) => {
    if (!selectedServices.some((s) => s.name === service.name)) {
      const updatedServices = [...selectedServices, service];
      setSelectedServices(updatedServices);
      updateBookingSummary(updatedServices);
    }
  };

  const removeService = (serviceName) => {
    const updatedServices = selectedServices.filter(
      (s) => s.name !== serviceName
    );
    setSelectedServices(updatedServices);
    updateBookingSummary(updatedServices);
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedBranch ||
      !mobile ||
      !customerData.name ||
      !selectedServices.length ||
      !selectedStaff.length
    ) {
      toast.error(
        "Please fill all required fields and select at least one service and staff member."
      );
      return;
    }

    const newBooking = {
      customer: {
        name: customerData.name,
        email: customerData.email,
        mobile: mobile,
        gender: customerData.gender,
        lastName: customerData.lastName,
      },
      services: selectedServices.map((service) => ({
        name: service.name,
        price: parseFloat(service.price.replace(/[^0-9.-]+/g, "")),
        time: service.time,
      })),
      staff: selectedStaff,
      date: selectedDate,
      time: selectedTime,
      customerType: customerType,
      staffType: staffType,
      appointmentNote: appointmentNote,
      clientNote: clientNote,
      branchId: selectedBranch,
    };

    try {
      const response = await axios.post(
        `/booking/create-booking?branchId=${selectedBranch}`,
        newBooking,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Booking created successfully!");

        // Reset all form fields
        setSelectedServices([]);
        setBookingSummary([]);
        setCustomerData({ name: "", email: "", gender: "", lastName: "" });
        setMobile("");
        setAppointmentNote("");
        setClientNote("");
        setSelectedStaff([]);
        setSelectedDate(moment().format("YYYY-MM-DD")); // Reset to current date
        setSelectedTime(moment().format("HH:mm")); // Reset to current time
        setCustomerType("walkin"); // Reset to default customer type
        setStaffType("single"); // Reset to default staff type

        // Close the modal
        setBookingModalOpen(false);
      } else {
        toast.success("Booking created successfully");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      toast.error("Booking failed!");
    }
  };
  useEffect(() => {
    if (!selectedBranch || !token) return;
  
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `/booking/get-appointments?branchId=${selectedBranch}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        if (response.data.success) {
          // Format appointments for the calendar
          const formattedAppointments = response.data.appointments
            .map((appointment) => {
              // Validate required fields
              if (
                !appointment.customer ||
                !appointment.services ||
                !appointment.staff ||
                !appointment.date ||
                !appointment.time
              ) {
                console.warn("Invalid appointment data:", appointment);
                return null; // Skip this appointment
              }
  
              const startDateTime = new Date(appointment.date);
  
              // Validate and parse the time field
              if (!appointment.time || typeof appointment.time !== "string") {
                console.warn("Invalid time field in appointment:", appointment);
                return null; // Skip this appointment
              }
  
              const [hours, minutes] = appointment.time.split(":").map(Number);
              startDateTime.setHours(hours, minutes, 0, 0);
  
              // Calculate end time based on service durations
              const totalDuration = appointment.services.reduce(
                (total, service) => {
                  const duration = parseInt(service.time); // Assuming time is in minutes
                  return total + duration;
                },
                0
              );
              const endDateTime = new Date(startDateTime);
              endDateTime.setMinutes(endDateTime.getMinutes() + totalDuration);
  
              return {
                id: appointment._id,
                title: `${appointment.customer.name} - ${appointment.services
                  .map((service) => service.name)
                  .join(", ")}`,
                start: startDateTime,
                end: endDateTime,
                customer: appointment.customer,
                services: appointment.services,
                staff: appointment.staff,
                appointmentNote: appointment.appointmentNote || "No note",
                clientNote: appointment.clientNote || "No note",
                status: appointment.status || "Pending", // Include the status field

              };
            })
            .filter(Boolean); // Remove null values from the array
  
          // Update the events state
          setEvents(formattedAppointments);
        } else {
          toast.error("Failed to fetch appointments.");
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to fetch appointments.");
      }
    };
  
    fetchAppointments();
  }, [selectedBranch, token]);


  useEffect(() => {
    const shuffled = [...servicesList].sort(() => 0.5 - Math.random());
    setFrequentServices(shuffled.slice(0, 3));
  }, []);
  // Custom event prop getter to add tooltip data
 // Function to get staff names from staff IDs
 const getStaffNames = (staffIds) => {
  return staffIds
    .map((staffId) => {
      const staff = staffList.find((staff) => staff._id === staffId);
      return staff ? staff.name : staffId; // Return name if found, otherwise return ID
    })
    .join(", ");
};
  const CustomEvent = ({ event }) => {
    return (
      <Tippy
      content={`
         Customer: ${event.customer.name} ${event.customer.lastName}
         Services: ${event.services
          .map((service) => `${service.name} (₹${service.price})`)
          .join(", ")}
          Staff: ${getStaffNames(event.staff)}
                    Status: ${event.status}

      `}
      placement="top"
      delay={[100, 0]} // Delay in [show, hide] milliseconds
      arrow={true} // Show arrow
      theme="light" // Use light theme
      interactive={true} // Allow interaction with tooltip content
      appendTo={document.body} // Append tooltip to body to avoid z-index issues
      style={{ zIndex: 99999 }} // Set high z-index inline
    >
      <div style={{ padding: "5px", cursor: "pointer" }}>
        <strong>{event.title}</strong>
      </div>
    </Tippy>
    );
  };

  const eventPropGetter = (event) => {
    let style = {
      backgroundColor: "#fff", // Default background color
      color: "#000", // Default text color
      borderRadius: "4px",
      border: "none",
    };
  
    if (event.status === "Pending") {
      style.backgroundColor = "#Ffff00"; // Light yellow for pending appointments
    } else if (event.status === "Completed") {
      style.backgroundColor = "#ccffcc"; // Light green for completed appointments
    } else if (event.status === "Cancelled") {
      style.backgroundColor = "#ff6666"; // Darker red for cancelled appointments
      style.color = "#fff"; // White text for better contrast
    }
  
    return {
      style,
    };
  };

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
            defaultView="month"
            toolbar={true}
            onView={setView}
            selectable
            onSelectSlot={() => setModalIsOpen(true)}
            components={{
              event: CustomEvent,
            }}
            eventPropGetter={eventPropGetter} // Apply dynamic styles

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
          {[
            {
              icon: <FaCalendarPlus className="text-purple-500 text-2xl" />,
              text: "Add Ticket",
            },
            {
              icon: <FaUser className="text-red-500 text-2xl" />,
              text: "Block Time",
            },
            {
              icon: <FaShoppingCart className="text-blue-500 text-2xl" />,
              text: "Insta Sale",
            },
          ].map((item, index) => (
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
            maxWidth: "90%",
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
          <div className="w-full p-6">
            <div className="grid grid-cols-1 overflow-y-auto h-auto md:grid-cols-4 gap-6">
              {/* Select Date */}
              <div className="flex flex-col">
                <label className="font-semibold">Select Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border rounded p-2 w-full md:w-44"
                  required
                />
              </div>

              {/* Select Time */}
              <div className="flex flex-col">
                <label className="font-semibold">Select Time</label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="border rounded p-2 w-full md:w-44"
                  required
                />
              </div>

              {/* Mobile Number */}
              <div className="flex flex-col mb-3">
                <label className="font-semibold">Mobile Number</label>
                <input
                  type="text"
                  value={mobile}
                  onChange={handleMobileChange}
                  className="border rounded p-2 w-full"
                  placeholder="Enter Mobile Number"
                  maxLength="10"
                  required
                />
              </div>

              {/* Name */}
              <div className="flex flex-col mb-3">
                <label className="font-semibold">Name</label>
                <input
                  type="text"
                  value={customerData.name}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, name: e.target.value })
                  }
                  className={`border rounded p-2 w-full ${
                    !isNewCustomer ? "bg-gray-100" : ""
                  }`}
                  placeholder="Customer Name"
                  readOnly={!isNewCustomer}
                  required
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col mb-3">
                <label className="font-semibold">Last Name</label>
                <input
                  type="text"
                  value={customerData.lastName}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      lastName: e.target.value,
                    })
                  }
                  className={`border rounded p-2 w-full ${
                    !isNewCustomer ? "bg-gray-100" : ""
                  }`}
                  placeholder="Last Name"
                  readOnly={!isNewCustomer}
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col mb-3">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  value={customerData.email}
                  onChange={(e) =>
                    setCustomerData({ ...customerData, email: e.target.value })
                  }
                  className={`border rounded p-2 w-full ${
                    !isNewCustomer ? "bg-gray-100" : ""
                  }`}
                  placeholder="Customer Email"
                  readOnly={!isNewCustomer}
                  required
                />
              </div>

              {/* Gender */}
              <div className="flex flex-col mb-3">
                <label className="font-semibold">Gender</label>
                <div className="flex space-x-4 mt-2">
                  {["Male", "Female", "Other"].map((g) => (
                    <label key={g} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={customerData.gender === g}
                        onChange={(e) =>
                          setCustomerData({
                            ...customerData,
                            gender: e.target.value,
                          })
                        }
                        disabled={!isNewCustomer}
                        className="form-radio"
                        required
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Customer Type */}
              <div className="flex flex-col">
                <label className="font-semibold">Customer Type</label>
                <div className="flex space-x-4 mt-2">
                  {["walkin", "appointment"].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="customerType"
                        value={type}
                        checked={customerType === type}
                        onChange={() => setCustomerType(type)}
                        className="form-radio"
                        required
                      />
                      <span className="capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Staff Type */}
              <div className="flex flex-col">
                <label className="font-semibold">Staff Type</label>
                <div className="flex space-x-4 mt-2">
                  {["single", "multiple"].map((type) => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="staffType"
                        value={type}
                        checked={staffType === type}
                        onChange={() => handleStaffTypeChange(type)}
                        className="form-radio"
                        required
                      />
                      <span className="capitalize">
                        {type === "single" ? "Single Staff" : "Multiple Staff"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Single Staff Selection */}
              {staffType === "single" && (
                <div className="flex flex-col mt-2">
                  <label className="font-semibold">Select Staff</label>
                  <select
                    className="border rounded p-2 w-full md:w-44"
                    value={selectedStaff[0] || ""}
                    onChange={(e) => setSelectedStaff([e.target.value])}
                    required
                  >
                    <option value="">Select Staff</option>
                    {staffList.map((staff) => (
                      <option key={staff._id} value={staff._id}>
                        {staff.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Multiple Staff Selection */}
              {staffType === "multiple" && (
                <div className="flex flex-col mt-2">
                  <label className="font-semibold">Select Multiple Staff</label>
                  <div
                    className="border rounded p-2 w-full md:w-44"
                    style={{
                      maxHeight: "100px",
                      overflowY: "auto",
                      border: "1px solid #ccc",
                      padding: "8px",
                      width: "200px",
                    }}
                  >
                    {staffList.map((staff) => (
                      <label
                        key={staff._id}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          value={staff._id}
                          checked={selectedStaff.includes(staff._id)}
                          onChange={(e) => handleStaffSelect(e.target.value)}
                        />
                        <span>{staff.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Notes Section */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Appointment Note */}
              <div className="flex flex-col">
                <label className="font-semibold">Appointment Note</label>
                <textarea
                  value={appointmentNote}
                  onChange={(e) => setAppointmentNote(e.target.value)}
                  className="border rounded p-2 w-full h-20"
                  placeholder="Enter appointment note..."
                />
              </div>

              {/* Client Note */}
              <div className="flex flex-col">
                <label className="font-semibold">Client Note</label>
                <textarea
                  value={clientNote}
                  onChange={(e) => setClientNote(e.target.value)}
                  className="border rounded p-2 w-full h-20"
                  placeholder="Enter client note..."
                />
              </div>
            </div>
          </div>

          {/* Service List, Past History, and Frequent Services */}
          <div className="w-full p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {/* Service List */}
              <div className="border p-3 rounded-md overflow-auto shadow-md">
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
              <div className="border p-3 rounded-md overflow-auto shadow-md">
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
              <div className="border p-3 rounded-md overflow-auto shadow-md">
                <h3 className="text-lg font-semibold mb-2">
                  Frequent Services
                </h3>
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
          </div>

          {/* Booking Summary */}
          {bookingSummary.length > 0 ? (
            <div className="w-full bg-gray-100 p-4 rounded-md shadow-md mb-4">
              <h3 className="text-lg font-bold mb-2">Booking Summary</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border border-gray-300 p-2">Service</th>
                    <th className="border border-gray-300 p-2">Staff</th>
                    <th className="border border-gray-300 p-2">Price</th>
                    <th className="border border-gray-300 p-2">Date</th>
                    <th className="border border-gray-300 p-2">Time</th>
                    <th className="border border-gray-300 p-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookingSummary.map((booking, index) => (
                    <tr key={index} className="text-center">
                      <td className="border border-gray-300 p-2">
                        {booking.service}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {booking.staff}
                      </td>
                      <td className="border border-gray-300 p-2">
                        ₹{booking.price}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {booking.date}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {booking.time}
                      </td>
                      <td className="border border-gray-300 p-2">
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded"
                          onClick={() => removeService(booking.service)}
                        >
                          ✖
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Total Bill Amount */}
              <div className="mt-4 text-right">
                <span className="font-semibold">Total Bill: </span>
                <span className="font-bold">
                  ₹
                  {bookingSummary.reduce(
                    (total, booking) => total + booking.price,
                    0
                  )}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full bg-gray-100 p-4 rounded-md shadow-md mb-4">
              <h3 className="text-lg font-bold mb-2">Booking Summary</h3>
              <p className="text-center">No services selected.</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="w-full mt-4 flex justify-center gap-4">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Book Appointment
            </button>
            <button
              type="button"
              onClick={handleGenerateBill}
              className="bg-blue-500 text-white py-2 px-4 rounded"
            >
              Generate Bill
            </button>
            <button
              type="button"
              onClick={() => setBookingModalOpen(false)}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      <ToastContainer />
    </SAAdminLayout>
  );
};

export default TestingCalendarr;
