import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from '../../api/axiosConfig';
import logo from "../../assests/salon-logo.png";

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('/auth/sa-login', formData);
      console.log('Login Successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setSuccess(true);

      // Redirect to admin/dashboard after successful login
      navigate('/admin/dashboard'); // Redirect using useNavigate
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
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
                Login for an account
              </h2>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">Login Successful!</p>}
              <div className="space-y-4">
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
              <button className="w-full bg-indigo-500 text-white p-2 mt-4 rounded-md hover:bg-indigo-600 transition duration-200"
              >
                Login
              </button>
              <p className="text-center mt-4">
                Create new Account ? <a href="/signup" className="text-indigo-500">Signup Now</a>
              </p>
            </div>
          </form>
        </div>
  );
};

export default Login;
