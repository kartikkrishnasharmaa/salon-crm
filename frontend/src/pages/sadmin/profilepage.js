import React, { useEffect, useState } from "react";
import SAAdminLayout from "../../layouts/Salonadmin";

const ProfilePage = () => {
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
    return (
        <SAAdminLayout>
              {userData ? (
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Salon Admin Profile</h2>
                <div className="flex flex-col items-center">
                    <img
                        src="https://tse4.mm.bing.net/th?id=OIP.WpnGIPj1DKAGo-CP64znTwHaHa&pid=Api&P=0&h=220"
                        alt="Admin Profile"
                        className="w-32 h-32 rounded-full mb-4 border-4 border-gray-300"
                    />
                    <h3 className="text-xl font-semibold">{userData.name}</h3>
                    <p className="text-gray-600">{userData.role}</p>
                </div>
                <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
                    <p className="text-gray-700"><strong>Email:</strong> {userData.email}</p>
                    <p className="text-gray-700"><strong>Phone:</strong> +123 456 7890</p>
                </div>
                <div className="mt-6 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Edit Profile</button>
                </div>
            </div>
              ) : (
                <p>Loading...</p>
              )}
        </SAAdminLayout>
    );
};

export default ProfilePage