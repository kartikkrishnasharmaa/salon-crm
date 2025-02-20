import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Redirect for unauthorized users
import AdminLayout from "../../layouts/AdminLayout";
import axios from "../../api/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [loginDetails, setLoginDetails] = useState(null);
  const [totalAdmins, setTotalAdmins] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ Initialize useNavigate

  useEffect(() => {
    // Retrieve token & user details from localStorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      toast.error("Unauthorized! Please log in.");
      navigate("/login"); // ✅ Redirect if not logged in
      return;
    }

    const parsedUser = JSON.parse(user);
    setLoginDetails({ token, user: parsedUser });

    // Fetch total salon admins
    const fetchTotalAdmins = async () => {
      try {
        const response = await axios.get("/salon-admin/admin-counting", {
          headers: { Authorization: `Bearer ${token}` }, // ✅ Correct Authorization format
        });
        setTotalAdmins(response.data.totalSalonAdmins);
      } catch (err) {
        setError("Failed to fetch total admin count");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalAdmins();
  }, [navigate]);

  return (
    <AdminLayout>
      {/* Dashboard Heading */}
      <h1 className="text-4xl font-extrabold text-center mb-6 
                 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600
                 drop-shadow-lg shadow-blue-500/50 
                 transform transition duration-300 hover:scale-105">
        Admin Dashboard
      </h1>

      {/* Content */}
      {loginDetails ? (
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-600 animate-pulse">Loading admin count...</p>
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-xs transition duration-300 hover:shadow-2xl transform hover:scale-105">
            <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h11M9 21V3M17 16l4-4m0 0l-4-4m4 4H9"></path>
                </svg>
              </span>
              Total Salon Admins
            </h3>
            <div className="mt-3 text-3xl font-bold text-gray-900">{totalAdmins}</div>
          </div>
          
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading login details...</p>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </AdminLayout>
  );
};

export default Dashboard;
