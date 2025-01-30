import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCalendarAlt } from 'react-icons/fa'; // Import Font Awesome icons

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-300 ease-in-out w-80 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-4 z-30 shadow-lg md:relative`}
    >
      <nav>
        <ul className="space-y-4">
          {/* Dashboard Link */}
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${
                  isActive ? 'bg-blue-400 text-white shadow-lg' : 'hover:bg-blue-500'
                }`
              }
              onClick={toggleSidebar}
            >
              <FaTachometerAlt className="text-xl" /> {/* Icon */}
              <span className="text-lg font-medium">Dashboard</span>
            </NavLink>
          </li>

          {/* Manage Clients Link */}
          <li>
            <NavLink
              to="/admin/salonadmin"
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${
                  isActive ? 'bg-blue-400 text-white shadow-lg' : 'hover:bg-blue-500'
                }`
              }
              onClick={toggleSidebar}
            >
              <FaUsers className="text-xl" /> {/* Icon */}
              <span className="text-lg font-medium">Salon Admin Management</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/clients"
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${
                  isActive ? 'bg-blue-400 text-white shadow-lg' : 'hover:bg-blue-500'
                }`
              }
              onClick={toggleSidebar}
            >
              <FaUsers className="text-xl" /> {/* Icon */}
              <span className="text-lg font-medium">Manage Clients</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/admin/all-users"
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${
                  isActive ? 'bg-blue-400 text-white shadow-lg' : 'hover:bg-blue-500'
                }`
              }
              onClick={toggleSidebar}
            >
              <FaUsers className="text-xl" /> {/* Icon */}
              <span className="text-lg font-medium">All Users</span>
            </NavLink>
          </li>
          {/* Manage Bookings Link */}
          <li>
            <NavLink
              to="/admin/bookings"
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${
                  isActive ? 'bg-blue-400 text-white shadow-lg' : 'hover:bg-blue-500'
                }`
              }
              onClick={toggleSidebar}
            >
              <FaCalendarAlt className="text-xl" /> {/* Icon */}
              <span className="text-lg font-medium">Manage Bookings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
