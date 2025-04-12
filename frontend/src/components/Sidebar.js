import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaChevronDown, FaChevronUp, FaUserShield } from 'react-icons/fa';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleSubCategory = (category) => {
    setOpenMenu(openMenu === category ? null : category);
  };

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, link: '/superadmin/dashboard' },
    { name: 'Salon Admin', icon: <FaUserShield />, subMenu: [
      { name: 'Add Salon Admin', link: '/superadmin/salonadmin' },
      { name: 'View Salon Admin', link: '/superadmin/view-salonadmin' }
    ]},
    { name: 'Manage Branch', icon: <FaUsers />, subMenu: [
      { name: 'Create Branch', link: '/superadmin/create-branch' },
      { name: 'View Branch', link: '/superadmin/view-branch' }
    ]}
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out w-80 bg-white text-black p-4 z-30 shadow-lg md:relative`}>
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

export default Sidebar;
