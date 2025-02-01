import React, { useEffect, useState } from "react";
import SAAdminLayout from '../../layouts/Salonadmin';

const SADashboard = () => {
  const [loginDetails, setLoginDetails] = useState(null);

  useEffect(() => {
    // Retrieve details from local storage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    // console.log("Token from localStorage:", token);
    // console.log("User from localStorage:", user);

    if (token && user) {
      setLoginDetails({
        token,
        user: JSON.parse(user),
      });

    }
  }, []);
  return (
    <SAAdminLayout>
      <h2 className="text-2xl font-bold mb-4">Salon Admin Dashboard</h2>
      {loginDetails ? (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md">
        <div className="space-y-4">
          <p className="flex items-center">
            <strong className="w-1/3 text-gray-600">Name:</strong>
            <span className="flex-1 text-gray-900 font-medium">{loginDetails.user.name}</span>
          </p>
          <p className="flex items-center">
            <strong className="w-1/3 text-gray-600">Email:</strong>
            <span className="flex-1 text-gray-900 font-medium">{loginDetails.user.email}</span>
          </p>
          <p className="flex items-center">
            <strong className="w-1/3 text-gray-600">Role:</strong>
            <span className="flex-1 text-gray-900 font-medium capitalize">{loginDetails.user.role}</span>
          </p>
        </div>
      </div>
      
      ) : (
        <p>Loading login details...</p>
      )}
    </SAAdminLayout>
  );
};

export default SADashboard;


