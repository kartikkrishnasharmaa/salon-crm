import React, { useEffect, useState } from "react";
import SAAdminLayout from "../../layouts/Salonadmin";
import {
  FaUserTie,
  FaChartLine,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const SADashboard = () => {
  const [, setLoginDetails] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const salonAdmin = localStorage.getItem("salonAdmin");

    if (token && salonAdmin) {
      setLoginDetails({
        token,
        user: JSON.parse(salonAdmin),
      });
    }
  }, []);

  // Dummy Data for Charts
  const revenueData = [
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 7000 },
    { month: "Mar", revenue: 8000 },
    { month: "Apr", revenue: 6000 },
    { month: "May", revenue: 9000 },
  ];

  const appointmentsData = [
    { date: "1 Feb", count: 10 },
    { date: "2 Feb", count: 12 },
    { date: "3 Feb", count: 15 },
    { date: "4 Feb", count: 8 },
    { date: "5 Feb", count: 18 },
  ];
  

  return (
    <SAAdminLayout>
      <h2 className="text-3xl font-bold mb-6">Salon Admin Dashboard</h2>
  
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 mt-4 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg shadow-md flex items-center">
          <FaChartLine className="text-blue-600 text-3xl mr-3" />
          <div>
            <p className="text-gray-600">Total Bookings</p>
            <h3 className="text-xl font-bold">320</h3>
          </div>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow-md flex items-center">
          <FaMoneyBillWave className="text-green-600 text-3xl mr-3" />
          <div>
            <p className="text-gray-600">Revenue</p>
            <h3 className="text-xl font-bold">₹ 15,400</h3>
          </div>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow-md flex items-center">
          <FaUserTie className="text-yellow-600 text-3xl mr-3" />
          <div>
            <p className="text-gray-600">Employees</p>
            <h3 className="text-xl font-bold">12</h3>
          </div>
        </div>
        <div className="bg-purple-100 p-4 rounded-lg shadow-md flex items-center">
          <FaUsers className="text-purple-600 text-3xl mr-3" />
          <div>
            <p className="text-gray-600">Customers</p>
            <h3 className="text-xl font-bold">1,200</h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h3 className="text-lg font-bold mb-3">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h3 className="text-lg font-bold mb-3">Appointments Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-white p-4 shadow-lg rounded-lg mt-6">
        <h3 className="text-lg font-bold mb-3">Recent Appointments</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Customer</th>
              <th className="border border-gray-300 p-2">Service</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="border border-gray-300 p-2">Kartik Sharma</td>
              <td className="border border-gray-300 p-2">Haircut</td>
              <td className="border border-gray-300 p-2">Feb 5, 2025</td>
              <td className="border border-gray-300 p-2 text-green-600">
                Completed
              </td>
            </tr>
            <tr className="text-center">
              <td className="border border-gray-300 p-2">Priyanka Rathore</td>
              <td className="border border-gray-300 p-2">Facial</td>
              <td className="border border-gray-300 p-2">Feb 6, 2025</td>
              <td className="border border-gray-300 p-2 text-yellow-600">
                Pending
              </td>
            </tr>
            <tr className="text-center">
              <td className="border border-gray-300 p-2">Krishna</td>
              <td className="border border-gray-300 p-2">Manicure</td>
              <td className="border border-gray-300 p-2">Feb 7, 2025</td>
              <td className="border border-gray-300 p-2 text-red-600">
                Cancelled
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </SAAdminLayout>
  );
};

export default SADashboard;
