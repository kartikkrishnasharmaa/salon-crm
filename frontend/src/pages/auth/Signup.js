import React, { useState } from "react";
import axios from "../../api/axiosConfig";
import logo from "../../assests/salon-logo.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post("/auth/signup", formData);
      console.log("Signup Successful:", response.data);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md mt-6">
        <div className="bg-white shadow-lg p-8 rounded-md shadow-cyan-600 hover:shadow-indigo-700 transition duration-200">
          <div className="text-center mb-4">
            <img src={logo} alt="Salon Logo" className="w-24 mx-auto" />
          </div>
          <h2 className="text-2xl font-semibold text-center mb-6">
            Sign up for an account
          </h2>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Signup successful!</p>}
          <div className="space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium">
                Username
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Username"
                className="border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
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
                placeholder="Enter your mail"
                className="border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                placeholder="Enter your Password"
                className="border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-2 mt-4 rounded-md hover:bg-indigo-600 transition duration-200"
          >
            Submit
          </button>
          <p className="text-center mt-4">
            Already have an account? <a href="/login" className="text-indigo-500">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
