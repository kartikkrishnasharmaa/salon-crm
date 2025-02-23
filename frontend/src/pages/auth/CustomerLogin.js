import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosConfig";
import logo from "../../assests/salon-logo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Navigation ke liye useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/auth/sa-login", formData);
      const { token, user } = response.data;

      if (token) {
        // ✅ Login successful, localStorage me save karega
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success("Login Successful!");

        setTimeout(() => {
          navigate("/admin/dashboard"); // ✅ Dashboard pe redirect karega
        }, 2000);
      } else {
        toast.error("Invalid response from server");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid credentials";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/salonbackground.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay for Opacity */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <form onSubmit={handleSubmit} className="relative w-full max-w-md px-4">
        <div className="bg-white shadow-lg p-8 rounded-md shadow-cyan-600 hover:shadow-indigo-700 transition duration-200">
          <div className="text-center mb-4">
            <img src={logo} alt="Salon Logo" className="w-24 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-6">Client Login</h2>

          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-cyan-600 text-white p-2 mt-6 text-xl rounded-md hover:bg-indigo-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default CustomerLogin;
