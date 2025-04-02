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
      onRequestClose={onClose}  // Close the modal when clicked outside
      contentLabel="Appointment Status"
      className="fixed inset-0 flex justify-center items-center z-50 p-4"
      overlayClassName="bg-black bg-opacity-50 fixed inset-0"
    >
      <div className="w-full max-w-lg bg-white rounded-lg p-6 relative">
        
        {/* Close button (cross icon) at the top-left */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-2xl text-gray-600 hover:text-gray-900"
        >
          <HiX />
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">Appointment Status Overview</h2>
        
        {/* Table to display the statuses */}
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b font-semibold text-lg">Status</th>
              <th className="py-2 px-4 border-b font-semibold text-lg">Description</th>
            </tr>
          </thead>
          <tbody>
            {statuses.map((statusItem, index) => (
              <tr key={index}>
                <td className={`py-2 px-4 border-b ${statusItem.color} text-white font-medium`}>
                  {statusItem.status}
                </td>
                <td className="py-2 px-4 border-b">{statusItem.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Modal>
  );
};

export default AppointmentStatusModal;
