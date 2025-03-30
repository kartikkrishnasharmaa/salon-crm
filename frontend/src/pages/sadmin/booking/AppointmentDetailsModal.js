import React from "react";
import Modal from "react-modal";
import moment from "moment";
import { FaWindowClose } from "react-icons/fa";

const AppointmentDetailsModal = ({ isOpen, appointment, onClose, onCheckIn }) => {
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

  const generateBill = (services, customer) => {
    const billData = services.map((service) => ({
      service: service.name,
      price: parseFloat(service.price),
      date: moment(appointment.start).format("YYYY-MM-DD"),
      time: moment(appointment.start).format("HH:mm"),
      customer: `${customer?.name || ""} ${customer?.lastName || ""}`,
      staff: getStaffNames(appointment.staff || []),
    }));

    // Your bill generation logic here
    console.log("Generating bill for:", billData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1100 },
        content: {
          width: "90%",
          maxWidth: "90%",
          height: "90%",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          borderRadius: "10px",
          backgroundColor: "white",
          overflow: "auto",
        },
      }}
    >
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Appointment Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">Customer Information</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Name:</span> {appointment.customer?.name || "N/A"} {appointment.customer?.lastName || ""}
              </p>
              <p>
                <span className="font-medium">Mobile:</span> {appointment.customer?.mobile || "N/A"}
              </p>
              <p>
                <span className="font-medium">Gender:</span> {appointment.customer?.gender || "N/A"}
              </p>
              <p>
                <span className="font-medium">Email:</span> {appointment.customer?.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">Appointment Information</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Date:</span> {moment(appointment.start).format("DD MMMM YYYY")}
              </p>
              <p>
                <span className="font-medium">Time:</span> {moment(appointment.start).format("hh:mm A")}
              </p>
              <p>
                <span className="font-medium">Status:</span>
                <span className={`ml-2 px-2 py-1 rounded text-xs ${
                  appointment.status === "Completed"
                    ? "bg-green-100 text-green-800"
                    : appointment.status === "Cancelled"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {appointment.status || "Pending"}
                </span>
              </p>
              <p>
                <span className="font-medium">Staff:</span> {getStaffNames(appointment.staff || [])}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Services</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b text-left">Service</th>
                  <th className="py-2 px-4 border-b text-left">Duration</th>
                  <th className="py-2 px-4 border-b text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {appointment.services?.map((service, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-2 px-4 border-b">{service.name}</td>
                    <td className="py-2 px-4 border-b">{service.time || "30 mins"}</td>
                    <td className="py-2 px-4 border-b">₹{service.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-100">
                <tr>
                  <td className="py-2 px-4 font-semibold" colSpan="2">Total</td>
                  <td className="py-2 px-4 font-semibold">
                    ₹{appointment.services?.reduce((sum, service) => sum + parseFloat(service.price), 0) || 0}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {appointment.appointmentNote && (
            <div className="bg-blue-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Appointment Note</h3>
              <p>{appointment.appointmentNote}</p>
            </div>
          )}
          {appointment.clientNote && (
            <div className="bg-green-50 p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Client Note</h3>
              <p>{appointment.clientNote}</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            onClick={() => generateBill(appointment.services, appointment.customer)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-300 flex items-center gap-2"
          >
            Generate Bill
          </button>

          <button
            onClick={onCheckIn}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-300 flex items-center gap-2"
          >
            Check In
          </button>

          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-300 flex items-center gap-2"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AppointmentDetailsModal;