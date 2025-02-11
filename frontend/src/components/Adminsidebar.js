import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarAlt, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Adminsidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [isBookings, setBooking] = useState(false);
  const [isEmployeeManagement, setEmployeeManagement] = useState(false);
  const [isReportManagement, setReportManagement] = useState(false);
  const [isSettings, setSettings] = useState(false);

  const toggleSubCategory = (category) => {
    if (category === 'Booking') {
      setBooking(!isBookings);
    } else if (category === 'Employee Management') {
      setEmployeeManagement(!isEmployeeManagement);
    } else if (category === 'Report Management') {
      setReportManagement(!isReportManagement);
    } else if (category === 'Setting')
      setSettings(!isSettings);
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
              to="/sadmin/dashboard"
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
              onClick={() => toggleSubCategory('Booking')}
            >
              <div className="flex items-center gap-4">
                <FaUsers className="text-xl" />
                <span className="text-lg font-medium">Booking</span>
              </div>
              {isBookings ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isBookings && (
              <ul className="pl-8 space-y-2">
                <li>
                  <NavLink
                    to="/sadmin/view-booking"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="text-lg font-medium">View Booking</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sadmin/create-booking"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="text-lg font-medium">Create Booking</span>
                  </NavLink>
                </li>


              </ul>
            )}
          </li>


          {/* Salon Admin Management */}
          <li>
            <div
              className="flex items-center justify-between py-3 px-4 cursor-pointer"
              onClick={() => toggleSubCategory('Employee Management')}
            >
              <div className="flex items-center gap-4">
                <FaUsers className="text-xl" />
                <span className="text-lg font-medium">Employee Management</span>
              </div>
              {isEmployeeManagement ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isEmployeeManagement && (
              <ul className="pl-8 space-y-2">
                <li>
                  <NavLink
                    to="/sadmin/view-employee"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="text-lg font-medium">Employee Manaagement</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sadmin/employee"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="text-lg font-medium">Create Employee</span>
                  </NavLink>
                </li>


              </ul>
            )}
          </li>
          {/* Report Management */}
          <li>
            <div
              className="flex items-center justify-between py-3 px-4 cursor-pointer"
              onClick={() => toggleSubCategory('Report Management')}
            >
              <div className="flex items-center gap-4">
                <FaUsers className="text-xl" />
                <span className="text-lg font-medium">Report Management</span>
              </div>
              {isReportManagement ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isReportManagement && (
              <ul className="pl-8 space-y-2">
                <li>
                  <NavLink
                    to="/sadmin/report"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="text-lg font-medium">View Report </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/sadmin/create-report"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="text-lg font-medium">Create Report</span>
                  </NavLink>
                </li>


              </ul>
            )}
          </li>
          {/* Setting */}
          <li>
            <div
              className="flex items-center justify-between py-3 px-4 cursor-pointer"
              onClick={() => toggleSubCategory('Setting')}
            >
              <div className="flex items-center gap-4">
                <FaUsers className="text-xl" />
                <span className="text-lg font-medium">Setting</span>
              </div>
              {isSettings ? <FaChevronUp /> : <FaChevronDown />}
            </div>
            {isSettings && (
              <ul className="pl-8 space-y-2">
                <li>
                  <NavLink
                    to="/sadmin/settings"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="text-lg font-medium">User Setting</span>
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink
                    to="/sadmin/view-settings"
                    className={({ isActive }) =>
                      `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'
                      }`
                    }
                    onClick={toggleSidebar}
                  >
                    <span className="text-lg font-medium">Create Setting</span>
                  </NavLink>
                </li> */}


              </ul>
            )}
          </li>

        </ul>
      </nav>
    </aside>
  );
};

export default Adminsidebar;





