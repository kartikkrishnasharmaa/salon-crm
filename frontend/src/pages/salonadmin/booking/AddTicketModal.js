import React from "react";
import Modal from "react-modal";
import { FaCalendarPlus, FaWindowClose } from "react-icons/fa";

const AddTicketModal = ({ isOpen, onClose, onBookingClick }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
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
          onClick={onBookingClick}
        >
          <FaCalendarPlus className="text-purple-500 text-2xl" />
          <span className="ml-4 text-lg font-medium">Add Ticket</span>
        </button>
      </div>
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
        onClick={onClose}
      >
        <FaWindowClose />
      </button>
    </Modal>
  );
};

export default AddTicketModal;