import React from 'react';
import SAAdminLayout from "../../layouts/Salonadmin";

const ProfilePage = () => {
    return (
        <SAAdminLayout>
            <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-center">Admin Profile</h2>
                <div className="flex flex-col items-center">
                    <img
                        src="https://tse4.mm.bing.net/th?id=OIP.WpnGIPj1DKAGo-CP64znTwHaHa&pid=Api&P=0&h=220"
                        alt="Admin Profile"
                        className="w-32 h-32 rounded-full mb-4 border-4 border-gray-300"
                    />
                    <h3 className="text-xl font-semibold">John Doe</h3>
                    <p className="text-gray-600">Salon Administrator</p>
                </div>
                <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">Contact Information</h4>
                    <p className="text-gray-700"><strong>Email:</strong> admin@example.com</p>
                    <p className="text-gray-700"><strong>Phone:</strong> +123 456 7890</p>
                </div>
                <div className="mt-6 text-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Edit Profile</button>
                </div>
            </div>
        </SAAdminLayout>
    );
};

export default ProfilePage