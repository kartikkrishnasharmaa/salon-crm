import React from "react";
import Modal from "react-modal";
import { HiX } from "react-icons/hi";
import { FaMobileAlt, FaGlobe, FaUserPlus, FaGift, FaStar, FaHome } from "react-icons/fa";

const AppointmentStatusModal = ({ isOpen, onClose }) => {
  const statuses = [
    { status: "Appointment", color: "bg-yellow-400", text: "Appointment" },
    { status: "Pending", color: "bg-green-400", text: "Confirmed" },
    { status: "Checked in", color: "bg-orange-500", text: "Checked in" },
    { status: "Billed", color: "bg-blue-500", text: "Billed" },
    { status: "Partial Paid", color: "bg-blue-400", text: "Partial Paid" },
    { status: "Full Paid", color: "bg-gray-400", text: "Full Paid" }
  ];

  const iconInfo = [
    { icon: <FaMobileAlt />, label: "Mobile Booking" },
    { icon: <FaGlobe />, label: "Web Booking" },
    { icon: <FaUserPlus />, label: "Membership" },
    { icon: <FaGift />, label: "Package" },
    { icon: <FaStar />, label: "New Customer" },
    { icon: <FaHome />, label: "Room No." }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Appointment Status"
      className="fixed inset-0 flex justify-center items-center z-90 p-4"
      overlayClassName="bg-black bg-opacity-50 fixed inset-0"
    >
      <div className="w-lg bg-white rounded-2xl shadow-lg relative">
        {/* Header */}
        <div className="bg-cyan-500 p-4 rounded-t-2xl">
          <h2 className="text-xl font-semibold text-center text-white">Ticket Status</h2>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-white hover:text-gray-200"
        >
          <HiX />
        </button>

        {/* Modal Content */}
        <div className="p-6">
          {/* Status Grid */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {statuses.map((statusItem, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded-sm ${statusItem.color}`}></div>
                <span className="text-sm">{statusItem.text}</span>
              </div>
            ))}
          </div>

          {/* Icons Heading */}
          <h3 className="text-md font-semibold mb-4">Icons</h3>

          {/* Icons Grid */}
          <div className="grid grid-cols-3 gap-4">
            {iconInfo.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="text-lg text-cyan-600">{item.icon}</div>
                <span className="text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AppointmentStatusModal;
