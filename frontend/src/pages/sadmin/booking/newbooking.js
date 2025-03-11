import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../api/axiosConfig";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
const SalonBookingPage = () => {
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [service, setService] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (selectedBranch) {
      axios
        .get(`/customer/salon/customers?branchId=${selectedBranch}`)
        .then((res) => setCustomers(res.data.customers))
        .catch((error) => console.error("Error fetching customers:", error));
      
      axios 
        .get(`/employee/salon/employees?branchId=${selectedBranch}`)
        .then((res) => setEmployees(res.data.employees))
        .catch((error) => console.error("Error fetching employees:", error));
    }
  }, [selectedBranch]);

  const handleBookingSubmit = () => {
    if (!selectedCustomer || !selectedEmployee || !service || !date || !startTime || !endTime) {
      toast.error("All fields are required!");
      return;
    }

    axios
      .post("/booking/create", {
        customer: selectedCustomer,
        employee: selectedEmployee,
        service,
        price,
        date,
        startTime,
        endTime,
      })
      .then(() => toast.success("Booking successful!"))
      .catch((error) => toast.error("Booking failed!"));
  };

  return (
    <SAAdminLayout>
      <div className="p-6 bg-gray-100 max-h-screen">
        <div>
        <Link
      to="/sadmin/create-customer" // Change this to your target route
      className="top-8 right-8 bg-blue-600 text-white rounded-full px-6 py-3 shadow-xl hover:bg-blue-700 transition-all duration-300 inline-flex items-center gap-2 justify-center z-50 transform hover:scale-105 w-fit"
    >
      <FaPlus size={20} />
      <span className="font-semibold">Create Customer</span>
    </Link>
        </div>
     
      <div className="max-w-7xl mt-6 mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Add Ticket</h2>

        {/* Date & Room No */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Date:</label>
            <input type="date" className="w-full p-2 border rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium">Room No:</label>
            <input type="text" className="w-full p-2 border rounded-lg" />
          </div>
        </div>

        {/* Contact Details */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Phone</label>
          <input type="text" className="w-full p-2 border rounded-lg" />
          <label className="block text-sm font-medium mt-2">Email</label>
          <input type="email" className="w-full p-2 border rounded-lg" />
        </div>

        {/* Gender & Multi Staff */}
        <div className="mt-4 flex gap-6">
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <div className="flex gap-2">
              <label className="flex items-center">
                <input type="radio" name="gender" className="mr-1" /> Male
              </label>
              <label className="flex items-center">
                <input type="radio" name="gender" className="mr-1" /> Female
              </label>
            </div>
          </div>
        </div>

        {/* Customer Source */}
        <div className="mt-4">
          <label className="block text-sm font-medium">Customer Source</label>
          <select className="w-full p-2 border rounded-lg">
            <option>Select Customer Source</option>
            <option>FB Page</option>
            <option>Referred by Someone</option>
            <option>Instagram</option>
            <option>Newspaper Ad</option>
            <option>Walk-in</option>
            <option>Hotel Guest</option>
          </select>
        </div>

      
      </div>
    </div>
      {/* <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-gray-700 text-center">Salon Booking</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-600">Customer</label>
            <select className="w-full p-2 border rounded" value={selectedCustomer} onChange={(e) => setSelectedCustomer(e.target.value)}>
              <option value="">Select Customer</option>
              {customers.map((c) => (
                <option key={c._id} value={c._id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-600">Employee</label>
            <select className="w-full p-2 border rounded" value={selectedEmployee} onChange={(e) => setSelectedEmployee(e.target.value)}>
              <option value="">Select Employee</option>
              {employees.map((e) => (
                <option key={e._id} value={e._id}>{e.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-600">Service</label>
            <input type="text" className="w-full p-2 border rounded" value={service} onChange={(e) => setService(e.target.value)} />
          </div>

          <div>
            <label className="block text-gray-600">Price</label>
            <input type="number" className="w-full p-2 border rounded" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>

          <div>
            <label className="block text-gray-600">Date</label>
            <input type="date" className="w-full p-2 border rounded" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>

          <div>
            <label className="block text-gray-600">Start Time</label>
            <input type="time" className="w-full p-2 border rounded" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
          </div>

          <div>
            <label className="block text-gray-600">End Time</label>
            <input type="time" className="w-full p-2 border rounded" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>

          <button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600" onClick={handleBookingSubmit}>Book Appointment</button>
        </div>
      </div> */}
      <ToastContainer />
    </SAAdminLayout>
  );
};

export default SalonBookingPage;
