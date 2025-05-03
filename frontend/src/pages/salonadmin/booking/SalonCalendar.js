import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { useSelector } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../api/axiosConfig";
import AddTicketModal from "./AddTicketModal";
import AppointmentDetailsModal from "./AppointmentDetailsModal";
import BookingFormModal from "./BookingFormModal";
import CustomEvent from "./CustomEvent";
import Adminheader from "../../../components/Adminheader";

moment.locale('en', { week: { dow: 1 } });
const localizer = momentLocalizer(moment);
Modal.setAppElement("#root");

const defaultResources = [
  { resourceId: 1, title: 'Room 1', color: '#3044ef' },
  { resourceId: 2, title: 'Room 2', color: '#8135d7' },
  { resourceId: 3, title: 'Room 3', color: '#e07b16' },
  { resourceId: 4, title: 'Room 4', color: '#b511ee' },
  { resourceId: 5, title: 'Room 5', color: '#ec322a' }
];

const staffResources = [
  { resourceId: 6, title: 'Ravi', color: '#a4c2f4' },
  { resourceId: 7, title: 'Priya', color: '#b4a7d6' },
  { resourceId: 8, title: 'Neha', color: '#f9cb9c' },
  { resourceId: 9, title: 'Ankit', color: '#b6d7a8' },
  { resourceId: 10, title: 'Arjun', color: '#ea9999' },
  { resourceId: 11, title: 'Riya', color: '#d5a6bd' }
];

const CustomToolbar = ({ view, onView, viewMode, setViewMode, label }) => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '10px 15px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      marginBottom: '10px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <span style={{ 
        fontWeight: 'bold', 
        fontSize: '1.1rem',
      }}>
        {label}
      </span>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: '5px' // Add some space between buttons
      }}>
        {['month', 'week', 'day', 'agenda'].map((v) => (
          <button
            key={v}
            onClick={() => onView(v)}
            style={{ 
              padding: '6px 12px',
              background: view === v ? '#4e73df' : 'transparent', 
              color: view === v ? '#fff' : '#495057',
              fontWeight: view === v ? '600' : '500',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s'
            }}>
            {v.charAt(0).toUpperCase() + v.slice(1)}
          </button>
        ))}
        
        <button
          onClick={() => setViewMode("resources")}
          style={{ 
            padding: '6px 12px',
            background: viewMode === "resources" ? '#4e73df' : 'transparent', 
            color: viewMode === "resources" ? '#fff' : '#495057',
            fontWeight: viewMode === "resources" ? '600' : '500',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.2s'
          }}
        >
          Resources
        </button>
        <button
          onClick={() => setViewMode("staff")}
          style={{ 
            padding: '6px 12px',
            background: viewMode === "staff" ? '#4e73df' : 'transparent', 
            color: viewMode === "staff" ? '#fff' : '#495057',
            fontWeight: viewMode === "staff" ? '600' : '500',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            transition: 'all 0.2s'
          }}
        >
          Staff
        </button>
      </div>
    </div>
  );
};

const CustomResourceHeader = ({ resource }) => {
  return (
    <div style={{
      background: resource.color,
      padding: '8px 5px',
      borderRadius: '5px',
      textAlign: 'center',
      color: '#fff',
      fontWeight: 'bold',
      fontSize: '0.85rem',
      margin: '2px 0'
    }}>
      {resource.title}
    </div>
  );
};

const SalonCalendar = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("week");
  const [viewMode, setViewMode] = useState("resources");
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

              // Assign resourceId based on staff or default resource
              let resourceId = 1; // Default to first resource
              if (appointment.staff && appointment.staff.length > 0) {
                const staffMember = staffResources.find(s => s.title === appointment.staff[0]);
                resourceId = staffMember ? staffMember.resourceId : resourceId;
              }

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
                resourceId: resourceId
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
    const resource = viewMode === "staff" 
      ? staffResources.find(r => r.resourceId === event.resourceId)
      : defaultResources.find(r => r.resourceId === event.resourceId);
    
    let backgroundColor = resource?.color || '#3174ad';
    
    if (event.status === "Cancelled") {
      backgroundColor = '#ff6666';
    } else if (event.status === "Pending") {
      backgroundColor = '#Ffff00';
    } else if (event.status === "Completed" || event.status === "Scheduled") {
      backgroundColor = '#ccffcc';
    }

    return {
      style: {
        backgroundColor,
        color: '#000',
        borderRadius: '4px',
        border: 'none',
        opacity: event.status === "Cancelled" ? 0.7 : 1,
        boxShadow: '0 2px 2px rgba(0,0,0,0.1)'
      }
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

  const resourcesList = viewMode === "staff" ? staffResources : defaultResources;

  return (
    <div>
      <Adminheader title="Salon Calendar" />
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
        
        <div style={{ height: "80vh", width: "100%", background: "white", borderRadius: "10px", padding: "5px" }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: "100%", width: "100%" }}
            view={view}
            views={["month", "week", "day", "agenda"]}
            defaultView="week"
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
              resourceHeader: CustomResourceHeader
            }}
            eventPropGetter={eventPropGetter}
            defaultDate={new Date()}
            scrollToTime={new Date(1970, 1, 1, 8)}
            min={new Date(1970, 1, 1, 8, 0, 0)}
            max={new Date(1970, 1, 1, 22, 0, 0)}
            step={30} 
            timeslots={2} 
            showMultiDayTimes
            dayLayoutAlgorithm="no-overlap"
            resources={resourcesList}
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
    </div>
  );
};

export default SalonCalendar;