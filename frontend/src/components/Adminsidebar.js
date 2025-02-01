import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt } from 'react-icons/fa';

const Adminsidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed bg-white inset-y-0 left-0 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out w-80 bg-gradient-to-b text-black p-4 z-30 shadow-lg md:relative`}
    >
      <nav>
        <ul className="space-y-4">
          {/* Dashboard Link */}
          <li>
            <NavLink
              to="/sadmin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${
                  isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                }`
              }
              onClick={toggleSidebar}
            >
              <FaTachometerAlt className="text-xl" /> {/* Icon */}
              <span className="text-lg font-medium">Dashboard</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Adminsidebar;
