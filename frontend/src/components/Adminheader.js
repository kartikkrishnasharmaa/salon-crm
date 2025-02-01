import React ,{ useState, useEffect, useRef } from 'react';
import Logo from './../assests/salon-logo.png';
import { FaUserCircle } from 'react-icons/fa';

const Adminheader = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown
  const user = JSON.parse(localStorage.getItem("user") || "{}"); // Parse JSON safely

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

    // Cleanup event listener on unmount
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);

  return (
    <header className="bg-white flex items-center justify-between p-4 shadow-md">
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

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-2 py-2 mt-4 shadow rounded-md shadow-cyan-600 hover:shadow-indigo-700 hover:bg-blue-400"
        >
          <FaUserCircle size={24} />
          <span>{user.name}</span>
          
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg overflow-hidden animate-fadeIn">
            <ul className="flex flex-col">
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => alert('Profile clicked')}
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  onClick={() => alert('Settings clicked')}
                >
                  Settings
                </button>
              </li>
              <li>
                <button
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  onClick={() => {
                    localStorage.removeItem('token');
                    window.location.href = '/salon-admin/login';
                  }}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Adminheader;
