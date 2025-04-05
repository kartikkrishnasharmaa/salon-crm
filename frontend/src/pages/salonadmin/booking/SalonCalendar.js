import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useSelector } from "react-redux";
import SAAdminLayout from "../../../layouts/Salonadmin";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../api/axiosConfig";

// Components
import AddTicketModal from "./AddTicketModal";
import AppointmentDetailsModal from "./AppointmentDetailsModal";
import BookingFormModal from "./BookingFormModal";
import CustomEvent from "./CustomEvent";

const localizer = momentLocalizer(moment);
Modal.setAppElement("#root");

const SalonCalendar = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  const token = localStorage.getItem("token");

  const fetchAppointments = async () => {
    if (!selectedBranch || !token) return;

    try {
      const response = await axios.get(
        `/booking/get-appointments?branchId=${selectedBranch}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        const formattedAppointments = response.data.appointments.map((appointment) => {
          const id = appointment._id || appointment.id || appointment.appointmentId;
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
            id: id,
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
        });

        setEvents(formattedAppointments);
      } else {
        toast.error("Failed to fetch appointments.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to fetch appointments.");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [selectedBranch, token]);

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

  const handleEventSelect = (event) => {
    const eventId = event.id || event._id || event.appointmentId;
    if (!eventId) {
      console.error("No ID found in event object:", event);
      toast.error("Could not identify appointment ID");
      return;
    }

    setCurrentAppointmentId(eventId);
    setSelectedAppointment({...event, id: eventId});
    localStorage.setItem("lastSelectedAppointment", JSON.stringify({...event, id: eventId}));
  };

  const handleCheckIn = async () => {
    const appointmentId = currentAppointmentId || selectedAppointment?.id;
    
    if (!appointmentId) {
      toast.error("Please select an appointment first");
      return;
    }

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
        setEvents(prevEvents =>
          prevEvents.map(event =>
            event.id === appointmentId
              ? { ...event, status: "Completed" }
              : event
          )
        );
        
        if (selectedAppointment?.id === appointmentId) {
          setSelectedAppointment(prev => ({
            ...prev,
            status: "Completed",
          }));
        }
      }
    } catch (error) {
      console.error("Check-in failed:", error);
      toast.error(error.message || "Failed to check in");
    }
  };

  return (
    <SAAdminLayout>
      <div style={{ position: "relative", padding: "20px", textAlign: "center" }}>
        <div style={{
          height: "80vh",
          width: "100%",
          background: "white",
          borderRadius: "10px",
          padding: "10px",
        }}>
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
              event: (props) => <CustomEvent {...props} onSelect={handleEventSelect} />
            }}
            eventPropGetter={eventPropGetter}
          />
        </div>
      </div>

      <AddTicketModal 
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onBookingClick={() => {
          setModalIsOpen(false);
          setBookingModalOpen(true);
        }}
      />

      {selectedAppointment && (
        <AppointmentDetailsModal
          isOpen={!!selectedAppointment}
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          onCheckIn={handleCheckIn}
        />
      )}

      <BookingFormModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedBranch={selectedBranch}
        fetchAppointments={fetchAppointments}
      />

      <ToastContainer />
    </SAAdminLayout>
  );
};

export default SalonCalendar;