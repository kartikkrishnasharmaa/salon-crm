import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCalendarCheck, FaTools, FaChartBar, FaCog, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Adminsidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleSubCategory = (category) => {
    setOpenMenu(openMenu === category ? null : category);
  };

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, link: '/sadmin/dashboard' },
    { name: 'Bookings', icon: <FaCalendarCheck />, subMenu: [
      { name: 'Create Booking', link: '/sadmin/create-booking' },
      { name: 'View Booking', link: '/sadmin/view-booking' }
    ]},
    { name: 'Services', icon: <FaTools />, subMenu: [
      { name: 'Create Services', link: '/sadmin/create-service' },
      { name: 'View Services', link: '/sadmin/view-services' }
    ]},
    { name: 'Customers', icon: <FaUsers />, subMenu: [
      { name: 'Create Customer', link: '/sadmin/create-customer' },
      { name: 'All Customers', link: '/sadmin/view-allcustomer' }
    ]},
    { name: 'Employees', icon: <FaUsers />, subMenu: [
      { name: 'Create Employee', link: '/sadmin/employee' },
      { name: 'All Employees', link: '/sadmin/view-employee' }
    ]},
    { name: 'Reports', icon: <FaChartBar />, subMenu: [
      { name: 'View Reports', link: '/sadmin/report' },
      { name: 'Create Report', link: '/sadmin/create-report' }
    ]},
    { name: 'Settings', icon: <FaCog />, subMenu: [
      { name: 'User Settings', link: '/sadmin/settings' }
    ]}
  ];

  return (
    <aside className={`fixed bg-white inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out w-80 bg-gradient-to-b text-black p-4 z-30 shadow-lg md:relative`}>
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.subMenu ? (
                <div className="flex items-center justify-between py-3 px-4 cursor-pointer" onClick={() => toggleSubCategory(item.name)}>
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <span className="text-lg font-medium">{item.name}</span>
                  </div>
                  {openMenu === item.name ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              ) : (
                <NavLink to={item.link} className={({ isActive }) => `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'}`} onClick={toggleSidebar}>
                  {item.icon}
                  <span className="text-lg font-medium">{item.name}</span>
                </NavLink>
              )}
              {openMenu === item.name && item.subMenu && (
                <ul className="pl-8 space-y-2">
                  {item.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink to={subItem.link} className={({ isActive }) => `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${isActive ? 'bg-blue-500 text-white shadow-lg' : 'hover:bg-blue-500 hover:text-white'}`} onClick={toggleSidebar}>
                        <span className="text-lg font-medium">{subItem.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Adminsidebar;
