import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import SAAdminLayout from "../../../layouts/Salonadmin";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Calender = () => {
    const [view, setView] = useState("month");
    const [events, setEvents] = useState([
        {
            title: "Sample Event 1",
            start: new Date(2025, 1, 10, 10, 0),
            end: new Date(2025, 1, 10, 12, 0),
        },
        {
            title: "Sample Event 2",
            start: new Date(2025, 1, 11, 14, 0),
            end: new Date(2025, 1, 11, 16, 0),
        },
    ]);

    const [contextMenu, setContextMenu] = useState(null);

    // Handle right-click on an empty slot
    const handleRightClick = (e, slotInfo) => {
        e.preventDefault(); // Prevent default context menu
        setContextMenu({
            position: { x: e.clientX, y: e.clientY },
            date: slotInfo.start,
        });
    };

    // Confirm Booking
    const handleBooking = () => {
        setEvents([...events, {
            title: "New Booking",
            start: contextMenu.date,
            end: new Date(contextMenu.date.getTime() + 60 * 60 * 1000), // 1-hour slot
        }]);
        setContextMenu(null);
    };

    // Handle event click
    const handleEventClick = (event) => {
        // alert(Event clicked: ${ event.title });
    };

    // Handle view change (month, week, day)
    const handleViewChange = (view) => {
        setView(view);
        setContextMenu(null); // Hide context menu on view change
    };

    // Handle navigation (back, next, today)
    const handleNavigate = () => {
        setContextMenu(null); // Hide context menu when navigating
    };

    return (
        <SAAdminLayout>
            <div style={{ position: "relative" }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500, background: "white", borderRadius: "10px" }}
                    onSelectEvent={handleEventClick}
                    onView={handleViewChange}
                    view={view}
                    views={["month", "week", "day"]}
                    toolbar={true}
                    onNavigate={handleNavigate}
                    selectable
                    onSelectSlot={(slotInfo) => handleRightClick}
                />

                {/* Custom Right Click Booking Menu */}
                {contextMenu && (
                    <div
                        style={{
                            position: "absolute",
                            top: contextMenu.position.y,
                            left: contextMenu.position.x,
                            background: "#fff",
                            boxShadow: "0px 0px 5px gray",
                            padding: "10px",
                            borderRadius: "5px",
                            zIndex: 1000,
                        }}
                    >
                        <p>Book appointment on {contextMenu.date.toLocaleString()}?</p>
                        <button
                            onClick={handleBooking}
                            style={{
                                marginRight: "10px",
                                background: "green",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                            }}
                        >
                            Confirm Booking
                        </button>
                        <button
                            onClick={() => setContextMenu(null)}
                            style={{
                                background: "red",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>
        </SAAdminLayout>
    );
};

export default Calender;