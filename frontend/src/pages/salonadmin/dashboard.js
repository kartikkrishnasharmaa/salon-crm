import React, { useState } from "react";
import SAAdminLayout from "../../layouts/Salonadmin";
import BranchSelector from "../../components/BranchSelector";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const SADashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [withTax, setWithTax] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredResult, setFilteredResult] = useState(null);

  const totalServices = {
    total: 849,
    male: 400,
    female: 449,
  };

  const ticketSize = {
    total: 1061,
    male: 0,
    female: 1061,
  };

  const stockWorth = {
    total: 45841414,
    retail: 1974289,
    consumable: 2609824,
  };

  const inHandCash = {
    total: 26342,
    retail: 81974289,
    consumable: 2609824,
  };

  const handleSearch = () => {
    const result = {
      message: `Search for "${search}" from ${startDate} to ${endDate} (with tax: ${withTax})`,
    };
    setFilteredResult(result);
  };

  const walkinAppointmentData = [
    { name: "Walk-in Male", value: 300 },
    { name: "Walk-in Female", value: 350 },
    { name: "Appointment Male", value: 100 },
    { name: "Appointment Female", value: 99 },
  ];

  const staffRevenueData = [
    { name: "Staff A", value: 5000 },
    { name: "Staff B", value: 8000 },
    { name: "Staff C", value: 3000 },
    { name: "Staff D", value: 7000 },
  ];

  const salesData = [
    { date: "Apr 01", sales: 10000 },
    { date: "Apr 02", sales: 12000 },
    { date: "Apr 03", sales: 8000 },
    { date: "Apr 04", sales: 15000 },
    { date: "Apr 05", sales: 9000 },
    { date: "Apr 06", sales: 16000 },
  ];

  const revenueData = [
    { date: "Apr 01", revenue: 12000 },
    { date: "Apr 02", revenue: 15000 },
    { date: "Apr 03", revenue: 10000 },
    { date: "Apr 04", revenue: 18000 },
    { date: "Apr 05", revenue: 14000 },
    { date: "Apr 06", revenue: 20000 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

  return (
    <SAAdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-4 items-end">
        <div className="w-full">
          <label className="text-sm text-gray-600 block mb-1 text-start">
            Select Branch
          </label>
          <BranchSelector />
        </div>

        <div className="w-full">
          <label className="text-sm text-gray-600">Start Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="w-full">
          <label className="text-sm text-gray-600">End Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="w-full relative">
          <label className="text-sm text-gray-600 block mb-1 text-start">
            Tax
          </label>
          <select
            value={withTax ? "withTax" : "withoutTax"}
            onChange={(e) => setWithTax(e.target.value === "withTax")}
            className="appearance-none border border-gray-300 p-2 pr-8 rounded w-full bg-white"
          >
            <option value="withTax">w/Tax</option>
            <option value="withoutTax">w/o Tax</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        <div className="w-9">
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded flex justify-center items-center"
          >
            {/* Search icon SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {filteredResult && (
        <div className="bg-yellow-100 text-yellow-800 p-4 mt-4 rounded">
          {filteredResult.message}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        {[
          {
            title: "Total Service Guests (w/Tax)",
            total: `Total: ${totalServices.total}`,
            details: [
              {
                label: "Male",
                value: totalServices.male,
                color: "text-blue-600",
              },
              {
                label: "Female",
                value: totalServices.female,
                color: "text-pink-600",
              },
            ],
            bg: "bg-gray-100",
          },
          {
            title: "Avg Ticket Size (w/Tax)",
            total:` Total: ${ticketSize.total}`,
            details: [
              {
                label: "Female",
                value: `₹${ticketSize.female}`,
                color: "text-pink-600",
              },
              {
                label: "Male",
                value: `₹${ticketSize.male}`,
                color: "text-blue-600",
              },
            ],
            bg: "bg-blue-100",
          },
          {
            title: "Stock Worth (as on date)",
            total: `₹${stockWorth.total}`,
            details: [
              {
                label: "Retail",
                value: `₹${stockWorth.retail}`,
                color: "text-green-600",
              },
              {
                label: "Consumable",
                value: `₹${stockWorth.consumable}`,
                color: "text-purple-600",
              },
            ],
            bg: "bg-green-100",
          },
          {
            title: "In-Hand Cash (as on date)",
            total: `₹${inHandCash.total}`,
            details: [
              {
                label: "Retail",
                value: `₹${inHandCash.retail}`,
                color: "text-green-600",
              },
              {
                label: "Consumable",
                value: `₹${inHandCash.consumable}`,
                color: "text-purple-600",
              },
            ],
            bg: "bg-rose-100",
          },
        ].map((card, index) => (
          <div
            key={index}
            className={`${card.bg} p-4 rounded shadow flex flex-col justify-between h-48 
                  transition duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
          >
            <h3 className="text-sm font-semibold text-center mb-2">
              {card.title}
            </h3>

            {card.total && (
              <div className="text-xl font-bold text-center mb-2">
                {card.total}
              </div>
            )}

            <div className="flex justify-between text-sm mt-auto">
              {card.details.map((item, i) => (
                <div key={i} className={`${item.color}`}>
                  {item.label}: {item.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Sales (w/Tax)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={salesData}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(v) => `₹${v}`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#60a5fa" name="Sales (w/Tax)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Revenue (w/Tax)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={revenueData}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis tickFormatter={(v) => `₹${v}`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#34d399" name="Revenue (w/Tax)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">
            Walk-ins & Appointments
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={walkinAppointmentData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {walkinAppointmentData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Staff Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={staffRevenueData}
              margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(v) => `₹${v}`} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#f87171" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Staff-wise Service Revenue (w/Tax) */}
      <div className="bg-white p-4 rounded shadow mt-8">
        <h2 className="text-lg font-semibold mb-4">
          Staff-wise Service Revenue (w/Tax)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={staffRevenueData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis
              tickFormatter={(v) => `₹${v}`}
              interval={0}
              domain={[0, "auto"]}
              tickCount={6}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              fill="#38bdf8"
              name="Service Revenue (w/Tax)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category-wise Service Revenue (w/Tax) */}
      <div className="bg-white p-4 rounded shadow mt-8">
        <h2 className="text-lg font-semibold mb-4">
          Category-wise Service Revenue (w/Tax)
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { category: "Bleach", value: 4000 },
              { category: "Detan", value: 2500 },
              { category: "Hair Cut", value: 7000 },
              { category: "Nail", value: 1500 },
            ]}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis
              tickFormatter={(v) => `₹${v}`}
              interval={0}
              domain={[0, "auto"]}
              tickCount={6}
            />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="value"
              fill="#a78bfa"
              name="Service Revenue (w/Tax)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Collection Breakdown */}
      <div className="bg-white p-4 rounded shadow mt-8">
        <h2 className="text-lg font-semibold mb-4">Collection Breakdown</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { mode: "Cash", value: 6000 },
              { mode: "Credit Card", value: 9000 },
              { mode: "Google Pay", value: 7500 },
            ]}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mode" />
            <YAxis
              tickFormatter={(v) => `₹${v}`}
              interval={0}
              domain={[0, "auto"]}
              tickCount={6}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#34d399" name="Collection Amount" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      {/* Total Customers (Male vs Female) */}
      <div className="bg-white p-4 rounded shadow mt-8">
        <h2 className="text-lg font-semibold mb-4">Total Customers (w/Tax)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { gender: "Male", value: totalServices.male },
              { gender: "Female", value: totalServices.female },
            ]}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="gender" />
            <YAxis
              tickFormatter={(v) => `₹${v}`}
              interval={0}
              domain={[0, "auto"]}
              tickCount={6}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#f472b6" name="Total Customers" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SAAdminLayout>
  );
};

export default SADashboard;
