import React from "react";

const Home = () => {
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
      <div className="relative max-auto">
        <div className="bg-white shadow-lg p-8 rounded-md shadow-cyan-600 hover:shadow-indigo-700 transition duration-200">
          {/* 4 Column Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl">
            <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
              <a href="/login" className="px-6 py-2 bg-blue-500 text-white rounded-lg mb-4 w-auto">SUPER ADMIN LOGIN
              </a>
              <a href="/signup" className="px-6 py-2 bg-green-500 text-white rounded-lg mb-4 w-auto">SUPER ADMIN SIGNUP
              </a>
            </div>

            <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
              <a href="/salon-admin/login" className="px-6 py-2 bg-red-500 text-white rounded-lg mb-4 w-auto">SALON ADMIN LOGIN
              </a>

            </div>

            <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
              <a href="/signup" className="px-6 py-2 bg-pink-500 text-white rounded-lg mb-4 w-auto">MANAGER ADMIN SIGNIN
              </a>
            </div>

            <div className="flex flex-col items-center bg-white p-6 shadow-lg rounded-lg">
              <a href="/client/login" className="px-6 py-2 bg-yellow-500 text-white rounded-lg mb-4 w-auto">CUSTOMER LOGIN
              </a>
              <a href="/client/signup" className="px-6 py-2 bg-yellow-500 text-white rounded-lg mb-4 w-auto">CUSTOMER SIGNUP
              </a>
              <a href="/client/dashboard" className="px-6 py-2 bg-yellow-500 text-white rounded-lg mb-4 w-auto">CUSTOMER dashboard
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;
