import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useSelector } from "react-redux";
import SAAdminLayout from "../../../layouts/Salonadmin";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "../../../api/axiosConfig";
import Modal from "react-modal";
import { FaCalendarPlus, FaWindowClose } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import generateBill from "./billing";

const localizer = momentLocalizer(moment);
Modal.setAppElement("#root");

const TestingCalendarr = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [blockTimeModalOpen, setBlockTimeModalOpen] = useState(false);
  const [instaSaleModalOpen, setInstaSaleModalOpen] = useState(false);
  const [activeModalType, setActiveModalType] = useState(null);
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
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  // Add this state variable at the top of your component
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  // 1. Add these state variables at the top
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [isProcessingCheckIn, setIsProcessingCheckIn] = useState(false);
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  const token = localStorage.getItem("token");

  // Fetch services
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
        } else {
          console.error("Unexpected services response format:", response.data);
          toast.error("Failed to load services - invalid data format");
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        toast.error("Failed to fetch services");
      } finally {
        setLoading((prev) => ({ ...prev, services: false }));
      }
    };

    fetchServices();
  }, [selectedBranch, token]);

  // Fetch customers
  useEffect(() => {
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

    fetchCustomers();
  }, [selectedBranch, token]);

  // Staff list
  const staffList = [
    { _id: "64f1a2b3c4d5e6f7a8b9c0d3", name: "Emily Davis" },
    { _id: "64f1a2b3c4d5e6f7a8b9c0d4", name: "John Doe" },
  ];
  const handleEventClick = (event) => {
    if (!event?.id) {
      console.error("Clicked event has no ID:", event);
      return;
    }

    console.log("Event clicked - ID:", event.id, "Full event:", event);

    // Store both the ID and full appointment data
    setCurrentAppointmentId(event.id);
    setSelectedAppointment(event);
    setBookingModalOpen(true);
  };
  const handleModalButtonClick = (type) => {
    setModalIsOpen(false);
    setActiveModalType(type);
    setSelectedAppointment(null); // Clear any previous selection

    switch (type) {
      case "ticket":
        setBookingModalOpen(true);
        break;
      case "blockTime":
        setBlockTimeModalOpen(true);
        break;
      case "instaSale":
        setInstaSaleModalOpen(true);
        break;
      default:
        setBookingModalOpen(true);
    }
  };

  const handleStaffTypeChange = (type) => {
    setStaffType(type);
    setSelectedStaff([]);
  };

  const handleGenerateBill = () => {
    if (bookingSummary.length === 0) {
      toast.error("No services selected to generate a bill.");
      return;
    }

    generateBill(bookingSummary, customerData);
  };

  const handleMobileChange = (e) => {
    const inputMobile = e.target.value;
    setMobile(inputMobile);

    if (inputMobile.length === 10) {
      if (Array.isArray(customersList)) {
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
      } else {
        console.error("customersList is not an array:", customersList);
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

    // Validate form data
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

        // Format the new appointment for the calendar
        const newAppointment = {
          id: response.data.appointment._id,
          title: `${
            response.data.appointment.customer.name
          } - ${response.data.appointment.services
            .map((s) => s.name)
            .join(", ")}`,
          start: new Date(response.data.appointment.date),
          end: calculateEndTime(
            response.data.appointment.date,
            response.data.appointment.time,
            response.data.appointment.services
          ),
          customer: response.data.appointment.customer,
          services: response.data.appointment.services,
          staff: response.data.appointment.staff,
          status: response.data.appointment.status,
        };

        // Update the calendar events
        setEvents((prevEvents) => [...prevEvents, newAppointment]);

        // Reset form
        resetBookingForm();

        // Close modal
        setBookingModalOpen(false);
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

  // Helper function to reset form
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

  // Helper function to calculate end time
  const calculateEndTime = (date, time, services) => {
    const startDateTime = new Date(date);
    const [hours, minutes] = time.split(":").map(Number);
    startDateTime.setHours(hours, minutes, 0, 0);

    const totalDuration = services.reduce((total, service) => {
      const duration = parseInt(service.time) || 30; // default to 30 mins
      return total + duration;
    }, 0);

    const endDateTime = new Date(startDateTime);
    endDateTime.setMinutes(endDateTime.getMinutes() + totalDuration);
    return endDateTime;
  };
  // const handleBookingSubmit = async (e) => {
  //   e.preventDefault();

  //   if (
  //     !selectedBranch ||
  //     !mobile ||
  //     !customerData.name ||
  //     !selectedServices.length ||
  //     !selectedStaff.length
  //   ) {
  //     toast.error(
  //       "Please fill all required fields and select at least one service and staff member."
  //     );
  //     return;
  //   }

  //   const newBooking = {
  //     customer: {
  //       name: customerData.name,
  //       email: customerData.email,
  //       mobile: mobile,
  //       gender: customerData.gender,
  //       lastName: customerData.lastName,
  //     },
  //     services: selectedServices.map((service) => ({
  //       name: service.name,
  //       price: parseFloat(service.price.replace(/[^0-9.-]+/g, "")),
  //       time: service.time,
  //     })),
  //     staff: selectedStaff,
  //     date: selectedDate,
  //     time: selectedTime,
  //     customerType: customerType,
  //     staffType: staffType,
  //     appointmentNote: appointmentNote,
  //     clientNote: clientNote,
  //     branchId: selectedBranch,
  //   };

  //   try {
  //     const response = await axios.post(
  //       `/booking/create-booking?branchId=${selectedBranch}`,
  //       newBooking,
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     if (response.data.success) {
  //       toast.success("Booking created successfully!");

  //       // Reset form
  //       setSelectedServices([]);
  //       setBookingSummary([]);
  //       setCustomerData({ name: "", email: "", gender: "", lastName: "" });
  //       setMobile("");
  //       setAppointmentNote("");
  //       setClientNote("");
  //       setSelectedStaff([]);
  //       setSelectedDate(moment().format("YYYY-MM-DD"));
  //       setSelectedTime(moment().format("HH:mm"));
  //       setCustomerType("walkin");
  //       setStaffType("single");

  //       setBookingModalOpen(false);
  //     }
  //   } catch (error) {
  //     console.error("Booking Error:", error);
  //     toast.error("Booking failed!");
  //   }
  // };
  // Enhanced handleCheckIn function
  // 3. Enhanced check-in function
  const handleCheckIn = async () => {
    console.log("Current state before check-in:", {
      currentAppointmentId,
      selectedAppointment,
    });

    // Try all possible ways to get the ID
    const appointmentId =
      currentAppointmentId ||
      selectedAppointment?.id ||
      JSON.parse(localStorage.getItem("lastSelectedAppointment"))?.id;

    if (!appointmentId) {
      toast.error("Please select an appointment first");
      console.error("No appointment ID found. Current state:", {
        currentAppointmentId,
        selectedAppointment,
        localStorage: localStorage.getItem("lastSelectedAppointment"),
      });
      return;
    }

    setIsProcessingCheckIn(true);

    try {
      const response = await axios.patch(
        `/booking/checkin/${appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Checked in successfully!");

        // Update events list
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === appointmentId
              ? { ...event, status: "Completed" }
              : event
          )
        );

        // Update selected appointment
        if (selectedAppointment?.id === appointmentId) {
          setSelectedAppointment((prev) => ({
            ...prev,
            status: "Completed",
          }));
        }
      } else {
        throw new Error(response.data.message || "Check-in failed");
      }
    } catch (error) {
      console.error("Check-in failed:", error);
      toast.error(error.message || "Failed to check in");
    } finally {
      setIsProcessingCheckIn(false);
    }
  };

  // const handleCheckIn = async (appointmentId) => {
  //   try {
  //     if (!appointmentId) {
  //       toast.error("No appointment selected");
  //       return;
  //     }

  //     const response = await axios.patch(
  //       `/booking/checkin/${appointmentId}`,
  //       {}, // Empty body
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json'
  //         }
  //       }
  //     );

  //     console.log("Response:", response.data); // Debug log

  //     if (response.data.success) {
  //       toast.success(response.data.message);

  //       // Update local state
  //       setEvents(prevEvents =>
  //         prevEvents.map(event =>
  //           event.id === appointmentId
  //             ? { ...event, status: "Completed" }
  //             : event
  //         )
  //       );

  //       setSelectedAppointment(prev =>
  //         prev?.id === appointmentId
  //           ? { ...prev, status: "Completed" }
  //           : prev
  //       );
  //     } else {
  //       toast.error(response.data.message || "Check-in failed");
  //     }
  //   } catch (error) {
  //     console.error("Check-in Error:", error);
  //     const errorMsg = error.response?.data?.message ||
  //                     error.message ||
  //                     "Failed to check in appointment";
  //     toast.error(errorMsg);

  //     // Debugging logs
  //     if (error.response) {
  //       console.log("Error response data:", error.response.data);
  //       console.log("Error status:", error.response.status);
  //       console.log("Error headers:", error.response.headers);
  //     }
  //   }
  // };

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
          const formattedAppointments = response.data.appointments
            .map((appointment) => {
              if (
                !appointment.customer ||
                !appointment.services ||
                !appointment.staff ||
                !appointment.date ||
                !appointment.time
              ) {
                console.warn("Invalid appointment data:", appointment);
                return null;
              }

              const startDateTime = new Date(appointment.date);
              const [hours, minutes] = appointment.time.split(":").map(Number);
              startDateTime.setHours(hours, minutes, 0, 0);

              const totalDuration = appointment.services.reduce(
                (total, service) => {
                  const duration = parseInt(service.time);
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
                status: appointment.status || "Pending",
              };
            })
            .filter(Boolean);

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

  const getStaffNames = (staffIds) => {
    return staffIds
      .map((staffId) => {
        const staff = staffList.find((staff) => staff._id === staffId);
        return staff ? staff.name : staffId;
      })
      .join(", ");
  };

  // const CustomEvent = ({ event }) => {
  //   if (!event) return null;

  //   return (
  //     <Tippy
  //       content={`
  //         Customer: ${event.customer?.name || 'N/A'} ${event.customer?.lastName || ''}
  //         Services: ${event.services?.map((service) => `${service.name} (₹${service.price})`).join(", ") || 'N/A'}
  //         Staff: ${getStaffNames(event.staff || [])}
  //         Status: ${event.status || 'Pending'}
  //       `}
  //       placement="top"
  //       delay={[100, 0]}
  //       arrow={true}
  //       theme="light"
  //       interactive={true}
  //       appendTo={document.body}
  //       style={{ zIndex: 99999 }}
  //     >
  //       <div
  //         style={{ padding: "5px", cursor: "pointer" }}
  //         onClick={() => {
  //           setSelectedAppointment(event);
  //           setBookingModalOpen(true);
  //         }}
  //       >
  //         <strong>{event.title || 'Appointment'}</strong>
  //       </div>
  //     </Tippy>
  //   );
  // };
  const CustomEvent = ({ event }) => {
    const handleEventClick = () => {
      if (!event?.id) {
        console.error("Event has no ID:", event);
        return;
      }

      console.log("Selecting appointment:", event.id);

      // Store both the full event and its ID
      setSelectedAppointment(event);
      setCurrentAppointmentId(event.id);
      setBookingModalOpen(true);

      // For debugging
      localStorage.setItem("lastSelectedAppointment", JSON.stringify(event));
    };

    return (
      <Tippy
        content={`
        Customer: ${event.customer?.name || "N/A"} ${
          event.customer?.lastName || ""
        }
        Services: ${
          event.services
            ?.map((service) => `${service.name} (₹${service.price})`)
            .join(", ") || "N/A"
        }
        Staff: ${getStaffNames(event.staff || [])}
        Status: ${event.status || "Pending"}
      `}
        placement="top"
        delay={[100, 0]}
        arrow={true}
        theme="light"
        interactive={true}
        appendTo={document.body}
        style={{ zIndex: 99999 }}
      >
        <div
          style={{
            padding: "5px",
            cursor: "pointer",
            backgroundColor:
              currentAppointmentId === event.id ? "#e3f2fd" : "inherit",
          }}
          onClick={handleEventClick}
        >
          <strong>{event.title || "Appointment"}</strong>
        </div>
      </Tippy>
    );
  };
  const eventPropGetter = (event) => {
    let style = {
      backgroundColor: "#fff",
      color: "#000",
      borderRadius: "4px",
      border: "none",
    };

    if (event?.status === "Pending") {
      style.backgroundColor = "#Ffff00";
    } else if (event?.status === "Completed") {
      style.backgroundColor = "#ccffcc";
    } else if (event?.status === "Cancelled") {
      style.backgroundColor = "#ff6666";
      style.color = "#fff";
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
            eventPropGetter={eventPropGetter}
          />
        </div>
      </div>

      {/* Ticket Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1000 },
          content: {
            width: "300px",
            height: "150px",
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
          <button
            className="flex items-center space-x-6 p-3 w-max rounded-lg hover:bg-gray-200"
            onClick={() => handleModalButtonClick("ticket")}
          >
            <FaCalendarPlus className="text-purple-500 text-2xl" />
            <span className="ml-4 text-lg font-medium">Add Ticket</span>
          </button>
        </div>
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          onClick={() => setModalIsOpen(false)}
        >
          <FaWindowClose />
        </button>
      </Modal>

      {/* Booking Form Modal */}
      <Modal
        isOpen={bookingModalOpen}
        onRequestClose={() => {
          setBookingModalOpen(false);
          setSelectedAppointment(null);
        }}
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
        {selectedAppointment ? (
          <div className="p-6 w-full">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Appointment Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Customer Information */}
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3 border-b pb-2">
                  Customer Information
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Name:</span>{" "}
                    {selectedAppointment.customer?.name || "N/A"}{" "}
                    {selectedAppointment.customer?.lastName || ""}
                  </p>
                  <p>
                    <span className="font-medium">Mobile:</span>{" "}
                    {selectedAppointment.customer?.mobile || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Gender:</span>{" "}
                    {selectedAppointment.customer?.gender || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{" "}
                    {selectedAppointment.customer?.email || "N/A"}
                  </p>
                </div>
              </div>

              {/* Appointment Information */}
              <div className="bg-gray-50 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-3 border-b pb-2">
                  Appointment Information
                </h3>
                <div className="space-y-2">
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {moment(selectedAppointment.start).format("DD MMMM YYYY")}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{" "}
                    {moment(selectedAppointment.start).format("hh:mm A")}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>
                    <span
                      className={`ml-2 px-2 py-1 rounded text-xs ${
                        selectedAppointment.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : selectedAppointment.status === "Cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {selectedAppointment.status || "Pending"}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Staff:</span>{" "}
                    {getStaffNames(selectedAppointment.staff || [])}
                  </p>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-3">Services</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Service</th>
                      <th className="py-2 px-4 border-b text-left">Duration</th>
                      <th className="py-2 px-4 border-b text-left">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedAppointment.services?.map((service, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="py-2 px-4 border-b">{service.name}</td>
                        <td className="py-2 px-4 border-b">
                          {service.time || "30 mins"}
                        </td>
                        <td className="py-2 px-4 border-b">₹{service.price}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-100">
                    <tr>
                      <td className="py-2 px-4 font-semibold" colSpan="2">
                        Total
                      </td>
                      <td className="py-2 px-4 font-semibold">
                        ₹
                        {selectedAppointment.services?.reduce(
                          (sum, service) => sum + parseFloat(service.price),
                          0
                        ) || 0}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Notes Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {selectedAppointment.appointmentNote && (
                <div className="bg-blue-50 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">
                    Appointment Note
                  </h3>
                  <p>{selectedAppointment.appointmentNote}</p>
                </div>
              )}
              {selectedAppointment.clientNote && (
                <div className="bg-green-50 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Client Note</h3>
                  <p>{selectedAppointment.clientNote}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  generateBill(
                    selectedAppointment.services?.map((service) => ({
                      service: service.name,
                      price: parseFloat(service.price),
                      date: moment(selectedAppointment.start).format(
                        "YYYY-MM-DD"
                      ),
                      time: moment(selectedAppointment.start).format("HH:mm"),
                      customer: `${selectedAppointment.customer?.name || ""} ${
                        selectedAppointment.customer?.lastName || ""
                      }`,
                      staff: getStaffNames(selectedAppointment.staff || []),
                    })) || [],
                    selectedAppointment.customer || {}
                  );
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-300 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M8 7a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Generate Bill
              </button>

              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <button
                  onClick={handleCheckIn}
                  disabled={!currentAppointmentId || isProcessingCheckIn}
                  className={`${
                    !currentAppointmentId
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  } text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-300 flex items-center gap-2`}
                >
                  {isProcessingCheckIn ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2"
                        viewBox="0 0 24 24"
                      >
                        {/* Loading spinner */}
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Check In
                    </>
                  )}
                </button>
              </div>
              <button
                onClick={() => {
                  setBookingModalOpen(false);
                  setSelectedAppointment(null);
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-300 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="flex flex-wrap gap-4">
            <h2 className="text-lg font-bold mb-3">New Booking</h2>

            <div className="w-full p-6">
              <div className="grid grid-cols-1 overflow-y-auto h-auto md:grid-cols-4 gap-6">
                {/* Select Date */}
                <div className="flex flex-col">
                  <label className="font-semibold">Booking Date</label>
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
                <div className="flex flex-col">
                  <label className="font-semibold">Date Of Birth</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border rounded p-2 w-full md:w-44"
                    required
                  />
                </div>{" "}
                <div className="flex flex-col">
                  <label className="font-semibold">Anniversary Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border rounded p-2 w-full md:w-44"
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
                          {type === "single"
                            ? "Single Staff"
                            : "Multiple Staff"}
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
                    <label className="font-semibold">
                      Select Multiple Staff
                    </label>
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
                  <h3 className="text-lg font-semibold mb-2">
                    Select Services
                  </h3>
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
                  <h3 className="text-lg font-semibold mb-2">
                    Frequent Services
                  </h3>
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
        )}
      </Modal>
      <ToastContainer />
    </SAAdminLayout>
  );
};

export default TestingCalendarr;
