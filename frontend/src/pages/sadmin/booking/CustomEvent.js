import React from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const CustomEvent = ({ event, onSelect }) => {
  const handleEventClick = () => {
    onSelect(event);
  };

  const getStaffNames = (staffIds) => {
    const staffList = [
      { _id: "64f1a2b3c4d5e6f7a8b9c0d3", name: "Emily Davis" },
      { _id: "64f1a2b3c4d5e6f7a8b9c0d4", name: "John Doe" },
    ];
    
    return staffIds
      .map((staffId) => {
        const staff = staffList.find((staff) => staff._id === staffId);
        return staff ? staff.name : staffId;
      })
      .join(", ");
  };

  return (
    <Tippy
      content={`
        Customer: ${event.customer?.name || "N/A"} ${event.customer?.lastName || ""}
        Services: ${event.services?.map((service) => `${service.name} (₹${service.price})`).join(", ") || "N/A"}
        Staff: ${getStaffNames(event.staff || [])}
        Status: ${event.status || "Pending"}
      `}
      placement="top"
      delay={[100, 0]}
      arrow={true}
      theme="light"
      interactive={true}
    >
      <div
        style={{
          padding: "5px",
          cursor: "pointer",
        }}
        onClick={handleEventClick}
      >
        <strong>{event.title || "Appointment"}</strong>
      </div>
    </Tippy>
  );
};

export default CustomEvent;