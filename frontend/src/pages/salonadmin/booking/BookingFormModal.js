// form model
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import moment from "moment";
import { toast } from "react-toastify";
import axios from "../../../api/axiosConfig";
import { FaWindowClose } from "react-icons/fa";
import ServiceSection from "./ServiceSection";
import StaffSelection from "./StaffSelection";
import CustomerInfo from "./CustomerInfo";
import BookingSummary from "./BookingSummary";

const BookingFormModal = ({
  isOpen,
  onClose,
  selectedBranch,
  fetchAppointments,
}) => {
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYY-MM-DD"));
  const [selectedTime, setSelectedTime] = useState(moment().format("HH:mm"));
  const [mobile, setMobile] = useState("");
  const [customerType, setCustomerType] = useState("walkin");
  const [staffType, setStaffType] = useState("single");
  const [selectedServices, setSelectedServices] = useState([]);
  const [setFrequentServices] = useState([]);
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
  const summary = services.map((service) => {
    // Safely handle potentially undefined service
    if (!service) return null;
    
    // Safely extract price
    const priceValue = service.nonMemberPrice ?? 0;
    const cleanedPrice = String(priceValue).replace(/[^0-9.-]+/g, "");
    
    return {
      service: service.serviceName || "",
      price: parseFloat(cleanedPrice) || 0,
      date: selectedDate,
      time: selectedTime,
      customer: `${customerData.name} ${customerData.lastName}`,
      staff: selectedStaff
        .map(staffId => staffList.find(staff => staff._id === staffId)?.name)
        .filter(Boolean)
        .join(", "),
    };
  }).filter(Boolean); // Remove any null entries
  
  setBookingSummary(summary);
};


  const handleServiceSelect = (service) => {
    if (!selectedServices.some((s) => s.serviceName === service.serviceName)) {
      const updatedServices = [...selectedServices, service];
      setSelectedServices(updatedServices);
      updateBookingSummary(updatedServices);
    }
  };


  const removeService = (serviceName) => {
    const updatedServices = selectedServices.filter(
      (s) => s.serviceName !== serviceName
    );
    setSelectedServices(updatedServices);
    updateBookingSummary(updatedServices);
  };


  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Add validation for gender
    if (!customerData.gender) {
      toast.error("Please select customer gender");
      return;
    }

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
        gender: customerData.gender, // Make sure this is included
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
    setCustomerData({
      name: "",
      email: "",
      gender: "", // Make sure this is included
      lastName: ""
    });
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

            <CustomerInfo
              mobile={mobile}
              handleMobileChange={handleMobileChange}
              customerData={customerData}
              setCustomerData={setCustomerData}
              isNewCustomer={isNewCustomer}
              customersList={customersList}
            />

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
                  className={`border rounded p-2 w-full ${!isNewCustomer ? "bg-gray-100" : ""
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

            <StaffSelection
              staffType={staffType}
              handleStaffTypeChange={handleStaffTypeChange}
              selectedStaff={selectedStaff}
              handleStaffSelect={handleStaffSelect}
              staffList={staffList}
            />
          </div>

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

        <ServiceSection onServiceSelect={handleServiceSelect} />
        <BookingSummary
          bookingSummary={bookingSummary}
          removeService={removeService}
        />

        <div className="w-full mt-4 flex flex-wrap justify-center gap-4">
          <button
            type="button"
            className="bg-purple-500 text-white py-2 px-4 rounded"
          >
            Send Msg
          </button>
          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 px-4 rounded"
          >
            Ticket
          </button>
          <button
            type="button"
            className="bg-teal-500 text-white py-2 px-4 rounded"
          >
            Check In
          </button>
          <button
            type="button"
            className="bg-orange-500 text-white py-2 px-4 rounded"
          >
            No Show
          </button>
          <button
            type="button"
            className="bg-gray-700 text-white py-2 px-4 rounded"
          >
            Merge
          </button>
          <button
            type="button"
            className="bg-indigo-500 text-white py-2 px-4 rounded"
          >
            History
          </button>
          <button
            type="button"
            className="bg-pink-500 text-white py-2 px-4 rounded"
          >
            Insta Bill
          </button>
          <button
            type="button"
            onClick={generateBill}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Bill
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