import React, { useState, useEffect, useRef } from 'react';
import Logo from './../assests/salon-logo.png';
import { FaUserCircle, FaPhoneAlt } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';

const Adminheader = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);

  return (
    <header className="bg-white flex items-center justify-between p-4 shadow-md relative z-50">
      {/* Sidebar & Menu Toggle Buttons for Mobile */}
      <div className="flex items-center gap-4 md:hidden">
        <button className="text-black focus:outline-none" onClick={toggleSidebar}>
          <HiMenu size={28} />
        </button>
        <button className="text-black focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Logo Centered on Mobile, Left on Desktop */}
      <div className="flex-1 flex justify-center md:justify-start">
        <img src={Logo} alt='logo' className='w-40 h-16' />
      </div>

      {/* Desktop Menu Centered */}
      <nav className="hidden md:flex space-x-6 text-lg font-semibold mx-auto">
        <a href="/sadmin/dashboard" className="hover:text-blue-600">Dashboard</a>
        <a href="/sadmin/create-booking" className="hover:text-blue-600">Bookings</a>
        <a href="/sadmin/employee" className="hover:text-blue-600">Employees</a>
        <a href="/sadmin/report" className="hover:text-blue-600">Reports</a>
        <a href="/sadmin/settings" className="hover:text-blue-600">Settings</a>
        <div className="mr-6">
          <FaPhoneAlt className="text-green-600 text-xl animate-ping absolute" />
          <FaPhoneAlt className="text-green-600 text-xl" />
        </div>
      </nav>

      {/* User Dropdown */}
      <div className="relative mr-4" ref={dropdownRef}>
        <button onClick={() => setIsOpen(!isOpen)} className="flex ml-9 items-center space-x-2 px-4 py-2 rounded-md shadow hover:bg-blue-400">
          <FaUserCircle size={24} />
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg overflow-hidden animate-fadeIn">
            <ul className="flex flex-col">
              <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100">Profile</button></li>
              <li><button className="w-full text-left px-4 py-2 hover:bg-gray-100">Settings</button></li>
              <li>
                <button className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    window.location.href = '/salon-admin/login';
                  }}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile Menu Positioned Below Header */}
      {menuOpen && (
        <nav className="absolute top-24 left-0 w-full bg-white shadow-md flex flex-col md:hidden py-4 space-y-4 text-center z-40">
          <a href="#" className="hover:text-blue-600">Dashboard</a>
          <a href="#" className="hover:text-blue-600">Bookings</a>
          <a href="#" className="hover:text-blue-600">Employees</a>
          <a href="#" className="hover:text-blue-600">Reports</a>
          <a href="#" className="hover:text-blue-600">Settings</a>
        </nav>
      )}
    </header>
  );
};

export default Adminheader;