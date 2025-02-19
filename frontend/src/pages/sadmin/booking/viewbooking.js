import React from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { useSelector } from "react-redux";
import { dummyAppointments } from "../../../data/dummyData";

const Booking = () => {
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

  const filteredAppointments = dummyAppointments.filter(
    (appt) => appt.branch === selectedBranch
  );

  return (
    <SAAdminLayout>
      <h2 className="text-3xl font-bold mb-6">View Booking</h2>
      <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        Appointments for Branch: {selectedBranch || 'None Selected'}
      </h2>
      {filteredAppointments.length > 0 ? (
        <ul className="space-y-2">
          {filteredAppointments.map((appt) => (
            <li key={appt.id} className="border p-2 rounded-lg">
              {appt.customer} with {appt.employee} on {appt.date}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No appointments found.</p>
      )}
    </div>
    </SAAdminLayout>
  );
};

export default Booking;
