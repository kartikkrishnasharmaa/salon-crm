import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaTachometerAlt, FaUsers, FaShoppingCart, FaCalendarCheck, FaTools, FaChartBar, FaCog,FaMapMarkerAlt , FaChevronDown, FaChevronUp ,FaMoneyBillWave} from 'react-icons/fa';

const Adminsidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const selectedBranch = useSelector(state => state.branch.selectedBranch); // Get selected branch from Redux
  const toggleSubCategory = (category) => {
    setOpenMenu(openMenu === category ? null : category);
  };

  const menuItems = [
    { name: 'Business Details', icon: <FaTachometerAlt />, link: selectedBranch ? `/salonadmin/dashboard?branchId=${selectedBranch}` : '/salonadmin/dashboard' },
    { name: 'Location', icon: <FaMapMarkerAlt  />, link: selectedBranch ? `/salonadmin/main-branch?branchId=${selectedBranch}` : '/salonadmin/main-branch' },
    { name: 'Services', icon: <FaTools />, link: selectedBranch ? `/salonadmin/view-services?branchId=${selectedBranch}` : '/salonadmin/view-services' },
    { name: 'Products', icon: <FaShoppingCart />, link: selectedBranch ? `/salonadmin/display-product?branchId=${selectedBranch}` : '/salonadmin/display-product' },
    // { name: 'Bookings', icon: <FaCalendarCheck />, subMenu: [
    //   { name: 'Calender Booking', link: selectedBranch ? `/salonadmin/create-booking?branchId=${selectedBranch}` : '/salonadmin/create-booking' },
    //   { name: 'BTesting', link: selectedBranch ? `/salonadmin/btesting?branchId=${selectedBranch}` : '/salonadmin/btesting' },
    //   { name: 'Add Ticket', link: selectedBranch ? `/salonadmin/new-booking?branchId=${selectedBranch}` : '/salonadmin/new-booking' },
    //   { name: 'View Booking', link: selectedBranch ? `/salonadmin/view-booking?branchId=${selectedBranch}` : '/salonadmin/view-booking' }
    // ]},
    // { name: 'Services', icon: <FaTools />, subMenu: [
    //   { name: 'Create Services', link: selectedBranch ? `/salonadmin/create-service?branchId=${selectedBranch}` : '/salonadmin/create-service' },
    //   { name: 'View Services', link: selectedBranch ? `/salonadmin/view-services?branchId=${selectedBranch}` : '/salonadmin/view-services' },
    //   { name: 'Assign Services', link: selectedBranch ? `/salonadmin/assign-staff?branchId=${selectedBranch}` : '/salonadmin/assign-staff' },
    // ]},
    // { name: 'Product', icon: <FaShoppingCart />, subMenu: [
    //   { name: 'Create Catgeory', link: selectedBranch ? `/salonadmin/create-category?branchId=${selectedBranch}` : '/salonadmin/create-category' },
    //   { name: 'Create Product', link: selectedBranch ? `/salonadmin/create-product?branchId=${selectedBranch}` : '/salonadmin/create-product' },
    //   { name: 'Display All Products', link: selectedBranch ? `/salonadmin/display-product?branchId=${selectedBranch}` : '/salonadmin/display-product' },
    //   { name: 'Stock Management', link: selectedBranch ? `/salonadmin/stock-management?branchId=${selectedBranch}` : '/salonadmin/stock-management' }
    // ]},
    // { name: 'Customers', icon: <FaUsers />, subMenu: [
    //   { name: 'Create Customer', link: selectedBranch ? `/salonadmin/create-customer?branchId=${selectedBranch}` : '/salonadmin/create-customer' },
    //   { name: 'All Customers', link: selectedBranch ? `/salonadmin/view-allcustomer?branchId=${selectedBranch}` : '/salonadmin/view-allcustomer' },
    //   { name: 'Client Info', link: selectedBranch ? `/salonadmin/view-allcustomer?branchId=${selectedBranch}` : '/salonadmin/view-allcustomer' }
    // ]},
    // { name: 'Employees', icon: <FaUsers />, subMenu: [
    //   { name: 'Create Employee', link: selectedBranch ? `/salonadmin/employee?branchId=${selectedBranch}` : '/salonadmin/employee' },
    //   { name: 'All Employees', link: selectedBranch ? `/salonadmin/view-employee?branchId=${selectedBranch}` : '/salonadmin/view-employee' },
    //   { name: 'Assign Role', link: selectedBranch ? `/salonadmin/assign-role?branchId=${selectedBranch}` : '/salonadmin/assign-role' }
    // ]},
    // { name: 'Reports', icon: <FaChartBar />, subMenu: [
    //   { name: 'All Reports', link: selectedBranch ? `/salonadmin/report?branchId=${selectedBranch}` : '/salonadmin/report' },
    //   { name: 'Customer Report', link: selectedBranch ? `/salonadmin/customer-report?branchId=${selectedBranch}` : '/salonadmin/customer-report' },
    //   { name: 'Employee Report', link: selectedBranch ? `/salonadmin/employee-report?branchId=${selectedBranch}` : '/salonadmin/employee-report' },
    //   { name: 'Booking Report', link: selectedBranch ? `/salonadmin/booking-report?branchId=${selectedBranch}` : '/salonadmin/booking-report' }
    // ]},
    // { name: 'Orders', icon: <FaMoneyBillWave />, subMenu: [
    //   { name: 'All Orders', link: selectedBranch ? `/salonadmin/all-orders?branchId=${selectedBranch}` : '/salonadmin/all-orders' },
    // ]},
    // { name: 'Settings', icon: <FaCog />, subMenu: [
    //   { name: 'Assign Branch', link: '/salonadmin/assign-branch' }
    // ]}
  ];

  // const menuItems = [
  //   { name: 'Dashboard', icon: <FaTachometerAlt />, link: selectedBranch ? `/salonadmin/dashboard?branchId=${selectedBranch}` : '/salonadmin/dashboard' },
  //   { name: 'Location', icon: <FaTools />, subMenu: [
  //     { name: 'View Branch', link: '/salonadmin/view-branch' },
  //     { name: 'Assign Branch', link: '/salonadmin/assign-branch' }
  //   ]},
  //   { name: 'Bookings', icon: <FaCalendarCheck />, subMenu: [
  //     { name: 'Calender Booking', link: selectedBranch ? `/salonadmin/create-booking?branchId=${selectedBranch}` : '/salonadmin/create-booking' },
  //     { name: 'BTesting', link: selectedBranch ? `/salonadmin/btesting?branchId=${selectedBranch}` : '/salonadmin/btesting' },
  //     { name: 'Add Ticket', link: selectedBranch ? `/salonadmin/new-booking?branchId=${selectedBranch}` : '/salonadmin/new-booking' },
  //     { name: 'View Booking', link: selectedBranch ? `/salonadmin/view-booking?branchId=${selectedBranch}` : '/salonadmin/view-booking' }
  //   ]},
  //   { name: 'Services', icon: <FaTools />, subMenu: [
  //     { name: 'Create Services', link: selectedBranch ? `/salonadmin/create-service?branchId=${selectedBranch}` : '/salonadmin/create-service' },
  //     { name: 'View Services', link: selectedBranch ? `/salonadmin/view-services?branchId=${selectedBranch}` : '/salonadmin/view-services' },
  //     { name: 'Assign Services', link: selectedBranch ? `/salonadmin/assign-staff?branchId=${selectedBranch}` : '/salonadmin/assign-staff' },
  //   ]},
  //   { name: 'Product', icon: <FaShoppingCart />, subMenu: [
  //     { name: 'Create Catgeory', link: selectedBranch ? `/salonadmin/create-category?branchId=${selectedBranch}` : '/salonadmin/create-category' },
  //     { name: 'Create Product', link: selectedBranch ? `/salonadmin/create-product?branchId=${selectedBranch}` : '/salonadmin/create-product' },
  //     { name: 'Display All Products', link: selectedBranch ? `/salonadmin/display-product?branchId=${selectedBranch}` : '/salonadmin/display-product' },
  //     { name: 'Stock Management', link: selectedBranch ? `/salonadmin/stock-management?branchId=${selectedBranch}` : '/salonadmin/stock-management' }
  //   ]},
  //   { name: 'Customers', icon: <FaUsers />, subMenu: [
  //     { name: 'Create Customer', link: selectedBranch ? `/salonadmin/create-customer?branchId=${selectedBranch}` : '/salonadmin/create-customer' },
  //     { name: 'All Customers', link: selectedBranch ? `/salonadmin/view-allcustomer?branchId=${selectedBranch}` : '/salonadmin/view-allcustomer' },
  //     { name: 'Client Info', link: selectedBranch ? `/salonadmin/view-allcustomer?branchId=${selectedBranch}` : '/salonadmin/view-allcustomer' }
  //   ]},
  //   { name: 'Employees', icon: <FaUsers />, subMenu: [
  //     { name: 'Create Employee', link: selectedBranch ? `/salonadmin/employee?branchId=${selectedBranch}` : '/salonadmin/employee' },
  //     { name: 'All Employees', link: selectedBranch ? `/salonadmin/view-employee?branchId=${selectedBranch}` : '/salonadmin/view-employee' },
  //     { name: 'Assign Role', link: selectedBranch ? `/salonadmin/assign-role?branchId=${selectedBranch}` : '/salonadmin/assign-role' }
  //   ]},
  //   { name: 'Reports', icon: <FaChartBar />, subMenu: [
  //     { name: 'All Reports', link: selectedBranch ? `/salonadmin/report?branchId=${selectedBranch}` : '/salonadmin/report' },
  //     { name: 'Customer Report', link: selectedBranch ? `/salonadmin/customer-report?branchId=${selectedBranch}` : '/salonadmin/customer-report' },
  //     { name: 'Employee Report', link: selectedBranch ? `/salonadmin/employee-report?branchId=${selectedBranch}` : '/salonadmin/employee-report' },
  //     { name: 'Booking Report', link: selectedBranch ? `/salonadmin/booking-report?branchId=${selectedBranch}` : '/salonadmin/booking-report' }
  //   ]},
  //   { name: 'Orders', icon: <FaMoneyBillWave />, subMenu: [
  //     { name: 'All Orders', link: selectedBranch ? `/salonadmin/all-orders?branchId=${selectedBranch}` : '/salonadmin/all-orders' },
  //   ]},
  //   { name: 'Settings', icon: <FaCog />, subMenu: [
  //     { name: 'Assign Branch', link: '/salonadmin/assign-branch' }
  //   ]}
  // ];

  return (
    <aside className={`fixed bg-white inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out w-80 bg-gradient-to-b text-black p-4 z-30 shadow-lg md:relative overflow-y-auto max-h-screen`}>
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
