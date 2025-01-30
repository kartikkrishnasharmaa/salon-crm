import React, { useState } from "react";
import axios from "../../api/axiosConfig";
import AdminLayout from '../../layouts/AdminLayout';

const Salonadmin = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
      });
    
      const [loading, setLoading] = useState(false);
      const [message, setMessage] = useState("");
    
      // Handle input changes
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
    
        try {
          const token = localStorage.getItem("token"); // SuperAdmin Token
          console.log("Super Admin ka Token hai:", token);
          const res = await axios.post(
            "salon/create-salon-admin",
            formData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
    
          setMessage(res.data.message);
          setFormData({ name: "", email: "", password: "" });
        } catch (error) {
          setMessage(error.response?.data?.message || "Something went wrong");
        }
    
        setLoading(false);
      };
  return (
    <AdminLayout>
        <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Create Salon Admin</h2>

        {message && (
          <p className={`text-center text-sm mb-3 ${message.includes("success") ? "text-green-600" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Salon Admin"}
          </button>
        </form>
      </div>
    </div>
    </AdminLayout>
  );
};

export default Salonadmin;
