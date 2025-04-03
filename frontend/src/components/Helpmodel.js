import React from "react";
import Modal from "react-modal";
import { HiX } from "react-icons/hi";  // Import the cross icon

const AppointmentStatusModal = ({ isOpen, onClose }) => {
  // Define the statuses and their respective colors
  const statuses = [
    {
      status: "Completed",
      color: "bg-green-500", // Green for Completed
      description: "Appointment has been successfully completed.",
    },
    {
      status: "Pending",
      color: "bg-yellow-400", // Yellow for Pending
      description: "Appointment is waiting for confirmation.",
    },
    {
      status: "Cancelled",
      color: "bg-red-500", // Red for Cancelled
      description: "Appointment has been cancelled.",
    },
  ];

  return (
    <Modal
    isOpen={isOpen}
    onRequestClose={onClose}
    contentLabel="Appointment Status"
    className="fixed inset-0 flex justify-center items-center z-50 p-4"
    overlayClassName="bg-black bg-opacity-50 fixed inset-0"
  >
    <div className="w-full max-w-xl bg-white rounded-2xl p-10 shadow-lg relative">
      
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 text-2xl text-gray-600 hover:text-gray-900"
      >
        <HiX />
      </button>

      <h2 className="text-2xl font-semibold text-center mb-10">Appointment Status Overview</h2>
      
      {/* Styled Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-6 px-12 text-left font-semibold text-gray-700 border-b">Status</th>
              <th className="py-6 px-12 text-left font-semibold text-gray-700 border-b">Description</th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            {statuses.map((statusItem, index) => (
              <tr key={index} className="even:bg-gray-50 space-y-6 h-10">
                <td className={`py-7 px-12 font-medium text-white rounded-lg ${statusItem.color} text-center whitespace-nowrap`}>{statusItem.status}</td>
                <td className="py-7 px-12 text-gray-700 text-center whitespace-normal">{statusItem.description}</td>
              </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  </Modal>
  );
};

export default AppointmentStatusModal;
