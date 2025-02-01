import React, { useEffect, useState } from "react";
import AdminLayout from '../../layouts/AdminLayout';
import axios from "../../api/axiosConfig";


const Dashboard = () => {
  const [loginDetails, setLoginDetails] = useState(null);
  const [totalAdmins, setTotalAdmins] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve details from local storage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      setLoginDetails({
        token,
        user: JSON.parse(user),
      });
    }

    // API call to fetch total admin count
    const fetchTotalAdmins = async () => {
      try {
        const response = await axios.get('salon/total-salon-admins-count', {
          headers: {
            Authorization: token,
          }
        });
        setTotalAdmins(response.data.totalSalonAdmins);
      } catch (err) {
        setError('Failed to fetch total admin count');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTotalAdmins();
    }
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      
      {loginDetails ? (
        <div className="space-y-4">
                 {loading ? (
            <p>Loading Admin count...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Total Salon Admins</h3>
              <div className="mt-2 text-2xl font-bold text-gray-900">{totalAdmins}</div>
            </div>
          )}
          
        </div>
      ) : (
        <p>Loading login details...</p>
      )}
    </AdminLayout>
  );
};

export default Dashboard;
