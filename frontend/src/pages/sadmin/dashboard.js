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
  PieChart, Pie, Cell, AreaChart, Area
} from "recharts";

const SADashboard = () => {
  
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    // Get the user data from localStorage (if available)
    const user = JSON.parse(localStorage.getItem("salonAdmin"));
    if (user) {
      setUserData(user); // Set the user data
    } else {
      // Handle case where the user is not logged in
      window.location.href = "/login"; // Redirect to login page
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
  const serviceData = [
    { name: "Haircut", value: 40 },
    { name: "Facial", value: 25 },
    { name: "Manicure", value: 15 },
    { name: "Pedicure", value: 10 },
    { name: "Massage", value: 10 },
  ];
  
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A569BD"];
  
  const customerGrowthData = [
    { month: "Jan", customers: 200 },
    { month: "Feb", customers: 250 },
    { month: "Mar", customers: 300 },
    { month: "Apr", customers: 400 },
    { month: "May", customers: 500 },
  ];

  return (
    <SAAdminLayout>
      {userData ? (
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-xl shadow-2xl border-4 border-white">
      <div className="text-white">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <p className="text-lg font-semibold w-1/4">Owner Name:</p>
            <p className="text-lg w-3/4">{userData.name}</p>
          </div>
    
          <div className="flex items-center space-x-4">
            <p className="text-lg font-semibold w-1/4">Email:</p>
            <p className="text-lg w-3/4">{userData.email}</p>
          </div>
    
          <div className="flex items-center space-x-4">
            <p className="text-lg font-semibold w-1/4">Role:</p>
            <p className="text-lg w-3/4">{userData.role}</p>
          </div>
        </div>
      </div>
    </div>
    
      ) : (
        <p>Loading...</p>
      )}
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
        <div className="bg-red-100 p-4 rounded-lg shadow-md flex items-center">
    <FaChartLine className="text-red-600 text-3xl mr-3" />
    <div>
      <p className="text-gray-600">Pending Appointments</p>
      <h3 className="text-xl font-bold">24</h3>
    </div>
  </div>

  <div className="bg-orange-100 p-4 rounded-lg shadow-md flex items-center">
    <FaUsers className="text-orange-600 text-3xl mr-3" />
    <div>
      <p className="text-gray-600">Services Offered</p>
      <h3 className="text-xl font-bold">15</h3>
    </div>
  </div>

  <div className="bg-teal-100 p-4 rounded-lg shadow-md flex items-center">
    <FaUserTie className="text-teal-600 text-3xl mr-3" />
    <div>
      <p className="text-gray-600">Active Memberships</p>
      <h3 className="text-xl font-bold">85</h3>
    </div>
  </div>

  <div className="bg-pink-100 p-4 rounded-lg shadow-md flex items-center">
    <FaMoneyBillWave className="text-pink-600 text-3xl mr-3" />
    <div>
      <p className="text-gray-600">Product Sales</p>
      <h3 className="text-xl font-bold">₹ 7,500</h3>
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
        <div className="bg-white p-4 shadow-lg rounded-lg">
    <h3 className="text-lg font-bold mb-3">Service Popularity</h3>
    
    <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={serviceData}
        cx="50%"
        cy="50%"
        outerRadius={100}
        fill="#8884d8"
        dataKey="value"
        label={(entry) => entry.name} // Labels ke liye
      >
        {serviceData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  </ResponsiveContainer>

  {/* Service Names with Colors */}
  <div className="flex flex-wrap justify-center mt-4">
    {serviceData.map((entry, index) => (
      <div key={index} className="flex items-center mx-2">
        <div
          className="w-3 h-3 rounded-full mr-2"
          style={{ backgroundColor: COLORS[index % COLORS.length] }}
        ></div>
        <p className="text-sm font-medium">{entry.name}</p>
      </div>
    ))}
  </div>
  </div>

  {/* Customer Growth Chart */}
  <div className="bg-white p-4 shadow-lg rounded-lg">
    <h3 className="text-lg font-bold mb-3">Customer Growth Trend</h3>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={customerGrowthData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="customers" stroke="#82ca9d" fill="#82ca9d" />
      </AreaChart>
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
