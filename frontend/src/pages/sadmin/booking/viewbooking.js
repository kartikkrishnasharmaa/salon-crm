import React, { useEffect, useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import axios from "../../../api/axiosConfig";
import { useSelector } from "react-redux";
import moment from "moment";

const Booking = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ 
    total: 0, 
    completedCount: 0,
    completedAmount: 0,
    pendingCount: 0,
    cancelledCount: 0
  });
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

        const formattedAppointments = response.data.appointments.map((appt, index) => ({
          id: appt._id,
          serialNo: index + 1,
          customer: `${appt.customer?.name || 'Unknown'} ${appt.customer?.lastName || ''}`,
          phone: appt.customer?.mobile || 'N/A',
          services: appt.services.map(s => s.name).join(", "),
          staff: appt.staff.join(", "),
          date: moment(appt.date).format("DD/MM/YYYY"),
          time: appt.time,
          status: appt.status,
          paymentStatus: appt.paymentStatus,
          totalPrice: appt.totalPrice
        }));

        // Calculate summary
        const total = formattedAppointments.length;
        const completedAppointments = formattedAppointments.filter(appt => appt.status === "Completed");
        const pendingAppointments = formattedAppointments.filter(appt => appt.status === "Pending");
        const cancelledAppointments = formattedAppointments.filter(appt => appt.status === "Cancelled");
        
        const completedCount = completedAppointments.length;
        const completedAmount = completedAppointments.reduce((sum, appt) => sum + appt.totalPrice, 0);
        const pendingCount = pendingAppointments.length;
        const cancelledCount = cancelledAppointments.length;
        
        setAppointments(formattedAppointments);
        setSummary({ total, completedCount, completedAmount, pendingCount, cancelledCount });
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
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Appointment Management</h2>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600">Total Appointments</h4>
            <p className="text-2xl font-bold text-blue-600">{summary.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600">Completed</h4>
            <p className="text-2xl font-bold text-green-600">{summary.completedCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600">Pending</h4>
            <p className="text-2xl font-bold text-yellow-600">{summary.pendingCount}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
            <h4 className="text-sm font-medium text-gray-600">Revenue</h4>
            <p className="text-2xl font-bold text-purple-600">₹{summary.completedAmount}</p>
          </div>
        </div>

        {/* Appointment Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading appointments...</p>
            </div>
          ) : appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {appointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.serialNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{appointment.customer}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{appointment.phone}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{appointment.services}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{appointment.date}</div>
                        <div className="text-sm text-gray-500">{appointment.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">₹{appointment.totalPrice}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : appointment.status === 'Pending' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          appointment.paymentStatus === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {appointment.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating a new appointment.</p>
            </div>
          )}
        </div>
      </div>
    </SAAdminLayout>
  );
};

export default Booking;