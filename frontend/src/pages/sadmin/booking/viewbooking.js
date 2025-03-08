import React, { useEffect, useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import axios from "../../../api/axiosConfig";

import { useSelector } from "react-redux";
import moment from "moment";

const Booking = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!selectedBranch) return;
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `/booking/get-appointments?branchId=${selectedBranch}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        // Map the API response to include the populated names and formatted date
        const formattedAppointments = response.data.appointments.map((appt) => ({
          id: appt._id,
          customer: appt.customerId?.name || "Unknown",
          employee: appt.employeeId?.name || "Not Assigned",
          branch: appt.branchId?.name || "Unknown Branch",
          service: appt.service,
          date: moment(appt.date).format("dddd, MMMM Do YYYY"), // e.g., "Wednesday, March 5th 2025"
          startTime: appt.startTime,
          endTime: appt.endTime,
          status: appt.status,
        }));

        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [selectedBranch]);

  return (
    <SAAdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-center">View Booking</h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">
          Appointments for Branch:{" "}
          <span className="text-blue-500">{selectedBranch || "None Selected"}</span>
        </h3>
        {loading ? (
          <p className="text-gray-600 text-center">Loading...</p>
        ) : appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white">
                <th className="py-3 px-4 text-left">S.No</th>
                  <th className="py-3 px-4 text-left">Customer</th>
                  <th className="py-3 px-4 text-left">Employee</th>
                  <th className="py-3 px-4 text-left">Service</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Time</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt, index) => (
                  <tr key={appt.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                                        <td className="py-3 px-4 border">{index + 1}</td>
                    <td className="py-3 px-4 border">{appt.customer}</td>
                    <td className="py-3 px-4 border">{appt.employee}</td>
                    <td className="py-3 px-4 border">{appt.service}</td>
                    <td className="py-3 px-4 border">{appt.date}</td>
                    <td className="py-3 px-4 border">
                      {appt.startTime} - {appt.endTime}
                    </td>
                    <td
                      className={`py-3 px-4 border font-semibold ${
                        appt.status === "Completed" ? "text-green-600" : "text-red-500"
                      }`}
                    >
                      {appt.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center">No appointments found.</p>
        )}
      </div>
    </SAAdminLayout>
  );
};

export default Booking;
