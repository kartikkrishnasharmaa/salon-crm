import React, { useState } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import SAAdminLayout from "../../../layouts/Salonadmin";

const localizer = momentLocalizer(moment);

// Example events
const myEventsList = [
    {
        title: 'Sample Event 1',
        start: new Date(2025, 1, 10, 10, 0),
        end: new Date(2025, 1, 10, 12, 0),
    },
    {
        title: 'Sample Event 2',
        start: new Date(2025, 1, 11, 14, 0),
        end: new Date(2025, 1, 11, 16, 0),
    }
];

const Calender = () => {
    const [view, setView] = useState('month');  // Default to month view

    // Handle event click
    const handleEventClick = (event) => {
        alert(`Event clicked: ${event.title}`);
    };

    // Handle view change (month, week, day)
    const handleViewChange = (view) => {
        setView(view);
    };

    // Handle navigation (back, next, today)
    const handleNavigate = (date) => {
        console.log("Navigated to:", date);
    };

    return (
        <SAAdminLayout>
            <div>
                <Calendar
                    localizer={localizer}
                    events={myEventsList}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    onSelectEvent={handleEventClick}
                    onView={handleViewChange}
                    view={view}
                    views={['month', 'week', 'day']}
                    toolbar={true}
                    onNavigate={handleNavigate}  // Handle the navigation buttons (today, back, next)
                />
            </div>
        </SAAdminLayout>
    );
};

export default Calender;
