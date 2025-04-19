import React from "react";
import Modal from "react-modal";
import {
  FaCalendarPlus,
  FaWindowClose,
  FaClock,
  FaBolt,
  FaGift,
  FaMoneyCheckAlt,
  FaUserCheck,
  FaFingerprint,
  FaUndo,
  FaBoxOpen,
  FaPeopleCarry,
  FaMoneyBillWave,
} from "react-icons/fa";

const AddTicketModal = ({ isOpen, onClose, onBookingClick }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1000 },
        content: {
          width: "470px",
          height: "670px",
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
          className="flex items-center space-x-4 p-3 w-full rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200"
          onClick={onBookingClick}
        >
          <FaCalendarPlus className="text-pink-500 text-2xl" />
          <span className="text-lg font-medium text-gray-800">Add Ticket</span>
        </button>

        <button className="flex items-center space-x-4 p-3 w-full rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200">
          <FaClock className="text-yellow-500 text-2xl" />
          <span className="text-lg font-medium text-gray-800">Block Time</span>
        </button>

        <button className="flex items-center space-x-4 p-3 w-full rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200">
          <FaBolt className="text-red-500 text-2xl" />
          <span className="text-lg font-medium text-gray-800">Insta Sale</span>
        </button>

        <button className="flex items-center space-x-4 p-3 w-full rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200">
          <FaGift className="text-green-500 text-2xl" />
          <span className="text-lg font-medium text-gray-800">
            Giftcard Details
          </span>
        </button>

        <button className="flex items-center space-x-4 p-3 w-full rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200">
          <FaMoneyCheckAlt className="text-blue-500 text-2xl" />
          <span className="text-lg font-medium text-gray-800">
            Close Payment
          </span>
        </button>

        <button className="flex items-center space-x-4 p-3 w-full rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200">
          <FaUserCheck className="text-indigo-500 text-2xl" />
          <span className="text-lg font-medium text-gray-800">
            Manual Attendance
          </span>
        </button>

        <button className="flex items-center space-x-4 p-3 w-full rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200">
          <FaFingerprint className="text-rose-500 text-2xl" />
          <span className="text-lg font-medium text-gray-800">
            Biometric Attendance
          </span>
        </button>

        <button className="flex items-center space-x-4 p-3 w-full rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200">
          <FaUndo className="text-cyan-500 text-2xl" />
          <span className="text-lg font-medium text-gray-800">Return Item</span>
        </button>

        <button className="flex items-center space-x-4 p-3 w-full rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200">
          <FaBoxOpen className="text-amber-500 text-2xl" />
          <span className="text-lg font-medium text-gray-800">
            Product Issue for Salon
          </span>
        </button>

        <button className="flex items-center space-x-4 p-3 w-full rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200">
          <FaPeopleCarry className="text-lime-500 text-2xl" />
          <span className="text-lg font-medium text-gray-800">
            Product Issue to Staff
          </span>
        </button>

        <button className="flex items-center space-x-4 p-3 w-full rounded-lg bg-white shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200">
          <FaMoneyBillWave className="text-teal-500 text-2xl" />
          <span className="text-lg font-medium text-gray-800">Expenses</span>
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
