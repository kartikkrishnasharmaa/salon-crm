import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../api/axiosConfig";
import SAAdminLayout from "../../layouts/Salonadmin";
import moment from "moment";
import { FaArrowUp, FaUserTie, FaChartLine, FaUsers, FaMoneyBillWave } from "react-icons/fa";
import BranchSelector from "../../components/BranchSelector";
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const SADashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [errorAppointments, setErrorAppointments] = useState(null);
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  const [showScroll, setShowScroll] = useState(false);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const res = await axios.get(
        `/booking/get-appointments?branchId=${selectedBranch}`,
        { headers }
      );

      const sortedAppointments = res.data.appointments
        .sort((a, b) => {
          const dateComparison = new Date(b.date) - new Date(a.date);
          if (dateComparison !== 0) return dateComparison;
          const timeA = moment(a.time, 'HH:mm').format('HH:mm');
          const timeB = moment(b.time, 'HH:mm').format('HH:mm');
          return timeB.localeCompare(timeA);
        })
        .slice(0, 5);

      const formattedAppointments = sortedAppointments.map((appt, index) => ({
        id: appt._id,
        serialNo: index + 1,
        customer: `${appt.customer?.name || 'Unknown'} ${appt.customer?.lastName || ''}`,
        phone: appt.customer?.mobile || 'N/A',
        services: appt.services?.map(s => s.name).join(", ") || 'No services',
        date: moment(appt.date).format("DD MMM, YYYY"),
        time: moment(appt.time, 'HH:mm').format("h:mm A"),
        status: appt.status || 'Pending',
        paymentStatus: appt.paymentStatus || 'Pending',
        totalPrice: appt.totalPrice || 0
      }));

      setAppointments(formattedAppointments);
      setErrorAppointments(null);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setErrorAppointments(error.response?.data?.message || "Failed to load recent appointments");
    } finally {
      setLoadingAppointments(false);
    }
  };

  useEffect(() => {
    if (selectedBranch) {
      fetchAppointments();
    }
  }, [selectedBranch]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      <BranchSelector />
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
                label={(entry) => entry.name}
              >
                {serviceData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
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

        <div className="bg-white p-4 shadow-lg rounded-lg">
          <h3 className="text-lg font-bold mb-3">Customer Growth Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={customerGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="customers"
                stroke="#82ca9d"
                fill="#82ca9d"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-4 shadow-lg rounded-lg mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-800">
            Recent Appointments
          </h3>
          {appointments.length > 0 && (
            <span className="text-sm text-gray-500">
              Showing {appointments.length} most recent
            </span>
          )}
        </div>

        {loadingAppointments ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : errorAppointments ? (
          <div className="p-4 text-center text-red-500 bg-red-50 rounded">
            {errorAppointments}
          </div>
        ) : appointments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="p-3 text-sm font-medium text-gray-600">
                    Customer
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-600">
                    Services
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-600">
                    Date & Time
                  </th>
                  <th className="p-3 text-sm font-medium text-gray-600">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr
                    key={appointment.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-3">
                      <div className="font-medium text-gray-800">
                        {appointment.customer}
                      </div>
                      <div className="text-xs text-gray-500">
                        {appointment.phone}
                      </div>
                    </td>
                    <td className="p-3 text-sm text-gray-700 max-w-xs truncate">
                      {appointment.services}
                    </td>
                    <td className="p-3 text-sm text-gray-700">
                      <div>{appointment.date}</div>
                      <div className="text-xs text-gray-500">
                        {appointment.time}
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          appointment.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : appointment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              No recent appointments found
            </p>
          </div>
        )}
      </div>

      <div className={`fixed bottom-5 left-5 z-[9999] transition-opacity duration-300 ${showScroll ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button 
          onClick={scrollToTop}
          className="bg-blue-600 hover:bg-blue-700 text-white w-12 h-12 rounded-full shadow-xl flex items-center justify-center"
        >
          <FaArrowUp className="text-lg" />
        </button>
      </div>
    </SAAdminLayout>
  );
};

export default SADashboard;