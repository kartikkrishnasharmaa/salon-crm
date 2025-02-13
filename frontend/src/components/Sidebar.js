import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isSalonAdminOpen, setSalonAdminOpen] = useState(false);
  const [isClientsOpen, setClientsOpen] = useState(false);
  const [isBookingsOpen, setBookingsOpen] = useState(false);

  const toggleSubCategory = (category) => {
    if (category === 'salonAdmin') {
      setSalonAdminOpen(!isSalonAdminOpen);
    } else if (category === 'clients') {
      setClientsOpen(!isClientsOpen);
    } else if (category === 'bookings') {
      setBookingsOpen(!isBookingsOpen);
    }
  };

  return (
    <aside
      className={`fixed bg-white inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out w-80 bg-gradient-to-b text-black p-4 z-30 shadow-lg md:relative`}
    >
      <nav>
        <ul className="space-y-4">
          {/* Dashboard Link */}
          <li>
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                }`
              }
              onClick={toggleSidebar}
            >
              <FaTachometerAlt className="text-xl" /> {/* Icon */}
              <span className="text-lg font-medium">Dashboard</span>
            </NavLink>
          </li>

          {/* Salon Admin Management */}
          <li>
            <div
              className="flex items-center justify-between py-3 px-4 cursor-pointer"
              onClick={() => toggleSubCategory('salonAdmin')}
            >
              <div className="flex items-center gap-4">
                <FaUsers className="text-xl" />
                <span className="text-lg font-medium">Salon Admin</span>
              </div>
              {isSalonAdminOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isSalonAdminOpen && (
              <ul className="pl-8 space-y-2">
                <li>
                  <NavLink
                    to="/admin/salonadmin"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="text-lg font-medium">Add Salon Admin</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/view-salonadmin"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="text-lg font-medium">View Salon Admin</span>
                  </NavLink>
                </li>
              </ul>
            )}
          </li>

          {/* Clients Management */}
          <li>
            <div
              className="flex items-center justify-between py-3 px-4 cursor-pointer"
              onClick={() => toggleSubCategory('clients')}
            >
              <div className="flex items-center gap-4">
                <FaUsers className="text-xl" />
                <span className="text-lg font-medium">Manage Branch</span>
              </div>
              {isClientsOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isClientsOpen && (
              <ul className="pl-8 space-y-2">
                <li>
                  <NavLink
                    to="/admin/create-branch"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="text-lg font-medium">Add Branch</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/view-branch"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="text-lg font-medium">View Branch</span>
                  </NavLink>
                </li>

              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
