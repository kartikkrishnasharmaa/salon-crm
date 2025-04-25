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
import AddTicketModal from "./AddTicketModal";
import AppointmentDetailsModal from "./AppointmentDetailsModal";
import BookingFormModal from "./BookingFormModal";
import CustomEvent from "./CustomEvent";

moment.locale('en', { week: { dow: 1 } });
const localizer = momentLocalizer(moment);
Modal.setAppElement("#root");

const defaultResources = [
  { resourceId: 1, title: 'Hair Station 1', color: '#a4c2f4' },
  { resourceId: 2, title: 'Hair Station 2', color: '#b4a7d6' },
  { resourceId: 3, title: 'Nail Station', color: '#f9cb9c' },
  { resourceId: 4, title: 'Massage Room', color: '#b6d7a8' },
  { resourceId: 5, title: 'Waxing Room', color: '#ea9999' }
];

const staffResources = [
  { section: "Hair Section", staff: ["Ravi", "Priya"], color: "#a4c2f4" },
  { section: "Nail Section", staff: ["Neha", "Ankit"], color: "#f9cb9c" },
  { section: "Massage Section", staff: ["Arjun", "Riya"], color: "#b6d7a8" }
];

const flattenStaffResources = () => {
  return staffResources.flatMap((group, groupIndex) =>
    group.staff.map((member, memberIndex) => ({
      resourceId: `${groupIndex}-${memberIndex}`,
      title: `${group.section}: ${member}`,
      color: group.color
    }))
  );
};

const CustomToolbar = ({ view, onView, viewMode, setViewMode, label }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
      <div>
        <select value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
          <option value="staff">Staff</option>
          <option value="resources">Resources</option>
          <option value="default">Default View</option>
        </select>
      </div>
      <div>{label}</div>
      <div>
        {['month', 'week', 'day', 'agenda'].map((v) => (
          <button
            key={v}
            onClick={() => onView(v)}
            style={{ marginLeft: 5, background: view === v ? '#4e73df' : '#eee', color: view === v ? '#fff' : '#000' }}>
            {v.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};

const CustomResourceHeader = ({ resource }) => {
  return (
    <div style={{
      background: resource.color,
      padding: 5,
      borderRadius: 5,
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold'
    }}>
      {resource.title}
    </div>
  );
};

const SalonCalendar = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month");
  const [viewMode, setViewMode] = useState("default");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentAppointmentId, setCurrentAppointmentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  const token = localStorage.getItem("token");

  const parseDuration = (durationStr) => {
    if (!durationStr) return 30;
    if (typeof durationStr === 'number') return durationStr;
    const match = durationStr.toString().match(/\d+/);
    return match ? parseInt(match[0]) : 30;
  };

  const parseTime = (timeStr, defaultTime = "12:00") => {
    if (!timeStr) return defaultTime;
    if (typeof timeStr !== 'string') return defaultTime;
    if (!timeStr.includes(':')) return defaultTime;
    return timeStr;
  };

  const fetchAppointments = async () => {
    if (!selectedBranch || !token) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `/booking/get-appointments?branchId=${selectedBranch}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        const formattedAppointments = response.data.appointments
          .filter(appointment => appointment.date)
          .map((appointment) => {
            try {
              const id = appointment._id || appointment.id || appointment.appointmentId || 
                        `${appointment.date}-${Math.random().toString(36).substr(2, 9)}`;
              
              const dateObj = new Date(appointment.date);
              if (isNaN(dateObj.getTime())) return null;

              const timeStr = parseTime(appointment.time);
              const [hours, minutes] = timeStr.split(':').map(Number);

              const startDateTime = new Date(dateObj);
              startDateTime.setHours(hours || 12, minutes || 0, 0, 0);

              const totalDuration = (appointment.services || []).reduce(
                (total, service) => parseDuration(service?.time) + total, 0
              );
              
              const endDateTime = new Date(startDateTime);
              endDateTime.setMinutes(endDateTime.getMinutes() + totalDuration);

              const customerName = appointment.customer?.name || 'Unknown Customer';
              const servicesList = (appointment.services || [])
                .map(s => s?.name || 'Unknown Service')
                .join(', ') || 'No Services';

              return {
                id,
                title: `${customerName} - ${servicesList}`,
                start: startDateTime,
                end: endDateTime,
                customer: appointment.customer || {},
                services: appointment.services || [],
                staff: appointment.staff || [],
                appointmentNote: appointment.appointmentNote || "No note",
                clientNote: appointment.clientNote || "No note",
                status: appointment.status || "Pending",
                allDay: false,
                paymentStatus: appointment.paymentStatus || "Pending",
                totalPrice: appointment.totalPrice || 0,
                resourceId: appointment.resourceId || 1 // Default to first resource if not specified
              };
            } catch (error) {
              console.error('Error formatting appointment:', error, appointment);
              return null;
            }
          })
          .filter(appointment => appointment !== null);

        setEvents(formattedAppointments);
      } else {
        toast.error(response.data.message || "Failed to fetch appointments.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      toast.error(error.response?.data?.message || "Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAppointments(); }, [selectedBranch, token]);

  const eventPropGetter = (event) => {
    if (viewMode === "default") {
      let style = {
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: "4px",
        border: "none",
        opacity: event.status === "Cancelled" ? 0.7 : 1,
        boxShadow: "0 2px 2px rgba(0,0,0,0.1)",
      };

      if (event?.status === "Pending") style.backgroundColor = "#Ffff00";
      else if (event?.status === "Completed" || event?.status === "Scheduled") style.backgroundColor = "#ccffcc";
      else if (event?.status === "Cancelled") { style.backgroundColor = "#ff6666"; style.color = "#fff"; }

      return { style };
    } else {
      const room = resourcesList.find(r => r.resourceId === event.resourceId);
      return {
        style: {
          backgroundColor: room?.color || '#3174ad',
          color: '#fff',
          borderRadius: '4px',
          border: 'none',
          opacity: event.status === "Cancelled" ? 0.7 : 1,
        }
      };
    }
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
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        toast.success("Checked in successfully!");
        setEvents(prevEvents => prevEvents.map(event => 
          event.id === appointmentId ? { ...event, status: "Completed" } : event
        ));
        if (selectedAppointment?.id === appointmentId) {
          setSelectedAppointment(prev => ({ ...prev, status: "Completed" }));
        }
      }
    } catch (error) {
      console.error("Check-in failed:", error);
      toast.error(error.response?.data?.message || "Failed to check in");
    }
  };

  const resourcesList = viewMode === "resources" ? defaultResources : 
                       viewMode === "staff" ? flattenStaffResources() : [];

  return (
    <SAAdminLayout>
      <div style={{ position: "relative", padding: "20px", textAlign: "center" }}>
        {loading && (
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255,255,255,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}>
            <div>Loading appointments...</div>
          </div>
        )}
        
        <div style={{ height: "80vh", width: "100%", background: "white", borderRadius: "10px", padding: "10px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%", width: "100%" }}
            view={view}
            views={["month", "week", "day", "agenda"]}
            defaultView="month"
            onView={setView}
            selectable
            onSelectSlot={() => setModalIsOpen(true)}
            components={{
              event: (props) => <CustomEvent {...props} onSelect={handleEventSelect} />,
              toolbar: (props) => (
                <CustomToolbar 
                  {...props} 
                  viewMode={viewMode} 
                  setViewMode={setViewMode} 
                />
              ),
              resourceHeader: viewMode !== "default" ? CustomResourceHeader : undefined
            }}
            eventPropGetter={eventPropGetter}
            defaultDate={new Date()}
            scrollToTime={new Date(1970, 1, 1, 8)}
            min={new Date(1970, 1, 1, 8, 0, 0)}
            max={new Date(1970, 1, 1, 22, 0, 0)}
            step={15}
            timeslots={4}
            showMultiDayTimes
            dayLayoutAlgorithm="no-overlap"
            resources={viewMode !== "default" ? resourcesList : undefined}
            resourceIdAccessor="resourceId"
            resourceTitleAccessor="title"
          />
        </div>
      </div>

      <AddTicketModal 
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onBookingClick={() => { setModalIsOpen(false); setBookingModalOpen(true); }}
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

      <ToastContainer position="top-right" autoClose={3000} />
    </SAAdminLayout>
  );
};

export default SalonCalendar;