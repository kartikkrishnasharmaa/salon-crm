import React from 'react';
import Logo from './../assests/salon-logo.png';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="bg-white text-white flex items-center justify-between p-4 shadow-md">
      {/* Sidebar Toggle Button for Mobile */}
      <button
        className="md:hidden text-black focus:outline-none"
        onClick={toggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Page Title */}
      <img src={Logo} alt='logo' className='w-40 h-20' />

      {/* Logout Button */}
      <button
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
        onClick={() => {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
