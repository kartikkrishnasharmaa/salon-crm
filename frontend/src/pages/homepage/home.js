import React from "react";
import logo from "../../assests/salon-logo.png";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Logo */}
      <div className="mb-10">
        <img src={logo} alt="Logo" className="w-40 h-40" />
      </div>
      
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
          <a href="/login" className="px-6 py-2 bg-yellow-500 text-white rounded-lg mb-4 w-auto">CUSTOMER LOGIN
          </a>
          <a href="/signup" className="px-6 py-2 bg-yellow-500 text-white rounded-lg mb-4 w-auto">CUSTOMER SIGNUP
          </a>
        </div>
      </div>
    </div>
    
  );
};

export default Home;
