import React from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";

import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

import './../../../../src/App.css';

function Booking() {
    const data = [
        {
            Id: 1,
            Subject: 'Meeting',
            StartTime: new Date(2023, 1, 15, 10, 0),
            EndTime: new Date(2023, 1, 15, 12, 30),
        },
    ];

    return (
        <ScheduleComponent
            selectedDate={new Date()}
            eventSettings={{
                dataSource: data,
            }}
            timeScale={{ enable: true }}
            showCurrentTimeIndicator={true}  // ✅ This enables the red horizontal line
        >
            <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
    );
}

export default Booking;



