import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "../../../api/axiosConfig";
import { FaWindowClose } from "react-icons/fa";

const BookingFormModal = ({
  isOpen,
  onClose,
  selectedBranch,
  fetchAppointments,
}) => {
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
  const [servicesList, setServicesList] = useState([]);
  const [customersList, setCustomersList] = useState([]);
  const [pastHistory, setPastHistory] = useState([]);
  const [loading, setLoading] = useState({
    services: false,
    customers: false,
    history: false,
  });
  const token = localStorage.getItem("token");

  const staffList = [
    { _id: "64f1a2b3c4d5e6f7a8b9c0d3", name: "Emily Davis" },
    { _id: "64f1a2b3c4d5e6f7a8b9c0d4", name: "John Doe" },
    { _id: "64f1a2b3c4d5e6f7a8b9c0d5", name: "Jane Smith" },
    { _id: "64f1a2b3c4d5e6f7a8b9c0d6", name: "Michael Brown" },
    { _id: "64f1a2b3c4d5e6f7a8b9c0d7", name: "Sarah Johnson" },
  ];

  useEffect(() => {
    const fetchServices = async () => {
      if (!selectedBranch || !token) return;

      setLoading((prev) => ({ ...prev, services: true }));
      try {
        const response = await axios.get(
          `/service/get-services?branchId=${selectedBranch}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data && Array.isArray(response.data.services)) {
          const formattedServices = response.data.services.map((service) => ({
            name: service.name || "Unnamed Service",
            price: `₹${service.price || 0}`,
            time: `${service.duration || 30} mins`,
            _id: service._id,
          }));

          setServicesList(formattedServices);
          setFrequentServices(formattedServices.slice(0, 3));
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to fetch services");
      } finally {
        setLoading((prev) => ({ ...prev, services: false }));
      }
    };

    const fetchCustomers = async () => {
      if (!selectedBranch || !token) return;

      setLoading((prev) => ({ ...prev, customers: true }));
      try {
        const response = await axios.get(
          `/customer/salon/customers?branchId=${selectedBranch}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const customersData = Array.isArray(response.data)
          ? response.data
          : response.data.customers || [];

        setCustomersList(customersData);
      } catch (error) {
        console.error("Error fetching customers:", error);
        toast.error("Failed to fetch customers");
      } finally {
        setLoading((prev) => ({ ...prev, customers: false }));
      }
    };

    fetchServices();
    fetchCustomers();
  }, [selectedBranch, token]);

  const handleStaffTypeChange = (type) => {
    setStaffType(type);
    setSelectedStaff([]);
  };

  const handleMobileChange = (e) => {
    const inputMobile = e.target.value;
    setMobile(inputMobile);

    if (inputMobile.length === 10) {
      const foundCustomer = customersList.find(
        (customer) => customer.phone === inputMobile
      );

      if (foundCustomer) {
        setCustomerData({
          name: foundCustomer.firstName || "",
          email: foundCustomer.email || "",
          gender: foundCustomer.gender || "",
          lastName: foundCustomer.lastName || "",
        });
        setIsNewCustomer(false);

        if (foundCustomer._id) {
          fetchCustomerHistory(foundCustomer._id);
        }
      } else {
        setCustomerData({ name: "", email: "", gender: "", lastName: "" });
        setIsNewCustomer(true);
        setPastHistory([]);
      }
    }
  };

  const fetchCustomerHistory = async (customerId) => {
    try {
      const response = await axios.get(
        `/booking/customer-history/${customerId}?branchId=${selectedBranch}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setPastHistory(
          response.data.bookings.map((booking) => ({
            name: booking.services.map((s) => s.name).join(", "),
            date: moment(booking.date).format("DD MMMM YYYY"),
            status: booking.status,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching customer history:", error);
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
      const response = await axios.post(`/booking/create-booking`, newBooking, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        toast.success("Booking created successfully!");
        fetchAppointments();
        resetBookingForm();
        onClose();
      }
    } catch (error) {
      console.error("Booking Error:", error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Failed to create booking";
      toast.error(errorMsg);
    }
  };

  const resetBookingForm = () => {
    setSelectedServices([]);
    setBookingSummary([]);
    setCustomerData({ name: "", email: "", gender: "", lastName: "" });
    setMobile("");
    setAppointmentNote("");
    setClientNote("");
    setSelectedStaff([]);
    setSelectedDate(moment().format("YYYY-MM-DD"));
    setSelectedTime(moment().format("HH:mm"));
    setCustomerType("walkin");
    setStaffType("single");
  };

  const generateBill = () => {
    if (bookingSummary.length === 0) {
      toast.error("No services selected to generate a bill.");
      return;
    }

    // Your bill generation logic here
    console.log("Generating bill for:", bookingSummary);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
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
      <form onSubmit={handleBookingSubmit} className="flex flex-wrap gap-4">
        <h2 className="text-lg font-bold mb-3 col-span-full">New Booking</h2>

        <div className="w-full p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Column 1 - Booking Info */}
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="font-semibold">Booking Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border rounded p-2 w-full"
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Select Time</label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="border rounded p-2 w-full"
                  required
                />
              </div>

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
            </div>

            {/* Column 2 - Customer Info */}
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
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

              <div className="flex flex-col">
                <label className="font-semibold">First Name</label>
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

              <div className="flex flex-col">
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
                />
              </div>
            </div>

            {/* Column 3 - Additional Info */}
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="font-semibold">Email</label>
                <input
                  type="email"
                  value={customerData.email}
                  onChange={(e) =>
                    setCustomerData({
                      ...customerData,
                      email: e.target.value,
                    })
                  }
                  className={`border rounded p-2 w-full ${
                    !isNewCustomer ? "bg-gray-100" : ""
                  }`}
                  placeholder="Customer Email"
                  readOnly={!isNewCustomer}
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Date Of Birth</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold">Anniversary Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="border rounded p-2 w-full"
                />
              </div>
            </div>

            {/* Column 4 - Staff Info */}
            <div className="flex flex-col space-y-4">
              <div className="flex flex-col">
                <label className="font-semibold">Gender</label>
                <div className="flex space-x-4 mt-2">
                  {["Male", "Female"].map((g) => (
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
                    className="border rounded p-2 w-full"
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
                    className="border rounded p-2 w-full"
                    style={{
                      maxHeight: "100px",
                      overflowY: "auto",
                      border: "1px solid #ccc",
                      padding: "8px",
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
          </div>

          {/* Notes Section - Below the 4 columns */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="font-semibold">Appointment Note</label>
              <textarea
                value={appointmentNote}
                onChange={(e) => setAppointmentNote(e.target.value)}
                className="border rounded p-2 w-full h-20"
                placeholder="Enter appointment note..."
              />
            </div>

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
              {loading.services ? (
                <p>Loading services...</p>
              ) : servicesList.length > 0 ? (
                servicesList.map((service, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <span>{service.name}</span>
                    <span>{service.price}</span>
                    <span>{service.time}</span>
                  </div>
                ))
              ) : (
                <p>No services available</p>
              )}
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
              <h3 className="text-lg font-semibold mb-2">Frequent Services</h3>
              {frequentServices.length > 0 ? (
                frequentServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 border-b cursor-pointer hover:bg-gray-100"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <span>{service.name}</span>
                    <span>{service.price}</span>
                    <span>{service.time}</span>
                  </div>
                ))
              ) : (
                <p>No frequent services</p>
              )}
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

        <div className="w-full mt-4 flex justify-center gap-4">
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Book Appointment
          </button>
          <button
            type="button"
            onClick={generateBill}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Generate Bill
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default BookingFormModal;
