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
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ffff00";
      case "Completed":
      case "Scheduled":
        return "#ccffcc";
      case "Cancelled":
        return "#ff6666";
      default:
        return "#ffffff";
    }
  };
  
  // Inline styles for the tooltip content and z-index fix
  const tooltipStyle = {
    fontSize: "14px",
    padding: "10px",
    color: event.status === "Cancelled" ? "#fff" : "#000",
    background: getStatusColor(event.status),
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    lineHeight: 1.6,
    maxWidth: "260px",
    zIndex: 9999,
  };
  

  return (
    <Tippy
    content={
      <div style={tooltipStyle}>
        <div><strong>👤 Customer:</strong> {event.customer?.name || "N/A"} {event.customer?.lastName || ""}</div>
        <div><strong>💇 Services:</strong> {event.services?.map((s) => `${s.name} (₹${s.price})`).join(", ") || "N/A"}</div>
        <div><strong>🧑‍🤝‍🧑 Staff:</strong> {getStaffNames(event.staff || [])}</div>
        <div><strong>📌 Status:</strong> {event.status || "Pending"}</div>
      </div>
    }
    placement="top"
    delay={[100, 0]}
    arrow={true}
    theme="light"
    interactive={true}
    appendTo={document.body}  // <<== important line
  >
      <div
        onClick={handleEventClick}
        style={{
          backgroundColor: "#fff",
          color: "#000",
          borderRadius: "4px",
          border: "none",
          opacity: event.status === "Cancelled" ? 0.7 : 1,
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          padding: "10px",
          cursor: "pointer",
        }}
      >
        {event.title}
      </div>
    </Tippy>
  );
};

export default CustomEvent;
