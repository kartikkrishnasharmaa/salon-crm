import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaTachometerAlt, FaUsers, FaShoppingCart, FaCalendarCheck, FaTools, FaChartBar, FaCog, FaChevronDown, FaChevronUp ,FaMoneyBillWave} from 'react-icons/fa';

const Adminsidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const selectedBranch = useSelector(state => state.branch.selectedBranch); // Get selected branch from Redux
  const toggleSubCategory = (category) => {
    setOpenMenu(openMenu === category ? null : category);
  };

  const menuItems = [
    { name: 'Business Details', icon: <FaTachometerAlt />, link: selectedBranch ? `/sadmin/dashboard?branchId=${selectedBranch}` : '/sadmin/dashboard' },
    { name: 'Location', icon: <FaTools />, link: selectedBranch ? `/sadmin/view-branch?branchId=${selectedBranch}` : '/sadmin/view-branch' },
    { name: 'Services', icon: <FaTools />, link: selectedBranch ? `/sadmin/view-services?branchId=${selectedBranch}` : '/sadmin/view-services' },
    { name: 'Products', icon: <FaTools />, link: selectedBranch ? `/sadmin/display-product?branchId=${selectedBranch}` : '/sadmin/display-product' },
    // { name: 'Bookings', icon: <FaCalendarCheck />, subMenu: [
    //   { name: 'Calender Booking', link: selectedBranch ? `/sadmin/create-booking?branchId=${selectedBranch}` : '/sadmin/create-booking' },
    //   { name: 'BTesting', link: selectedBranch ? `/sadmin/btesting?branchId=${selectedBranch}` : '/sadmin/btesting' },
    //   { name: 'Add Ticket', link: selectedBranch ? `/sadmin/new-booking?branchId=${selectedBranch}` : '/sadmin/new-booking' },
    //   { name: 'View Booking', link: selectedBranch ? `/sadmin/view-booking?branchId=${selectedBranch}` : '/sadmin/view-booking' }
    // ]},
    // { name: 'Services', icon: <FaTools />, subMenu: [
    //   { name: 'Create Services', link: selectedBranch ? `/sadmin/create-service?branchId=${selectedBranch}` : '/sadmin/create-service' },
    //   { name: 'View Services', link: selectedBranch ? `/sadmin/view-services?branchId=${selectedBranch}` : '/sadmin/view-services' },
    //   { name: 'Assign Services', link: selectedBranch ? `/sadmin/assign-staff?branchId=${selectedBranch}` : '/sadmin/assign-staff' },
    // ]},
    // { name: 'Product', icon: <FaShoppingCart />, subMenu: [
    //   { name: 'Create Catgeory', link: selectedBranch ? `/sadmin/create-category?branchId=${selectedBranch}` : '/sadmin/create-category' },
    //   { name: 'Create Product', link: selectedBranch ? `/sadmin/create-product?branchId=${selectedBranch}` : '/sadmin/create-product' },
    //   { name: 'Display All Products', link: selectedBranch ? `/sadmin/display-product?branchId=${selectedBranch}` : '/sadmin/display-product' },
    //   { name: 'Stock Management', link: selectedBranch ? `/sadmin/stock-management?branchId=${selectedBranch}` : '/sadmin/stock-management' }
    // ]},
    // { name: 'Customers', icon: <FaUsers />, subMenu: [
    //   { name: 'Create Customer', link: selectedBranch ? `/sadmin/create-customer?branchId=${selectedBranch}` : '/sadmin/create-customer' },
    //   { name: 'All Customers', link: selectedBranch ? `/sadmin/view-allcustomer?branchId=${selectedBranch}` : '/sadmin/view-allcustomer' },
    //   { name: 'Client Info', link: selectedBranch ? `/sadmin/view-allcustomer?branchId=${selectedBranch}` : '/sadmin/view-allcustomer' }
    // ]},
    // { name: 'Employees', icon: <FaUsers />, subMenu: [
    //   { name: 'Create Employee', link: selectedBranch ? `/sadmin/employee?branchId=${selectedBranch}` : '/sadmin/employee' },
    //   { name: 'All Employees', link: selectedBranch ? `/sadmin/view-employee?branchId=${selectedBranch}` : '/sadmin/view-employee' },
    //   { name: 'Assign Role', link: selectedBranch ? `/sadmin/assign-role?branchId=${selectedBranch}` : '/sadmin/assign-role' }
    // ]},
    // { name: 'Reports', icon: <FaChartBar />, subMenu: [
    //   { name: 'All Reports', link: selectedBranch ? `/sadmin/report?branchId=${selectedBranch}` : '/sadmin/report' },
    //   { name: 'Customer Report', link: selectedBranch ? `/sadmin/customer-report?branchId=${selectedBranch}` : '/sadmin/customer-report' },
    //   { name: 'Employee Report', link: selectedBranch ? `/sadmin/employee-report?branchId=${selectedBranch}` : '/sadmin/employee-report' },
    //   { name: 'Booking Report', link: selectedBranch ? `/sadmin/booking-report?branchId=${selectedBranch}` : '/sadmin/booking-report' }
    // ]},
    // { name: 'Orders', icon: <FaMoneyBillWave />, subMenu: [
    //   { name: 'All Orders', link: selectedBranch ? `/sadmin/all-orders?branchId=${selectedBranch}` : '/sadmin/all-orders' },
    // ]},
    // { name: 'Settings', icon: <FaCog />, subMenu: [
    //   { name: 'Assign Branch', link: '/sadmin/assign-branch' }
    // ]}
  ];

  // const menuItems = [
  //   { name: 'Dashboard', icon: <FaTachometerAlt />, link: selectedBranch ? `/sadmin/dashboard?branchId=${selectedBranch}` : '/sadmin/dashboard' },
  //   { name: 'Location', icon: <FaTools />, subMenu: [
  //     { name: 'View Branch', link: '/sadmin/view-branch' },
  //     { name: 'Assign Branch', link: '/sadmin/assign-branch' }
  //   ]},
  //   { name: 'Bookings', icon: <FaCalendarCheck />, subMenu: [
  //     { name: 'Calender Booking', link: selectedBranch ? `/sadmin/create-booking?branchId=${selectedBranch}` : '/sadmin/create-booking' },
  //     { name: 'BTesting', link: selectedBranch ? `/sadmin/btesting?branchId=${selectedBranch}` : '/sadmin/btesting' },
  //     { name: 'Add Ticket', link: selectedBranch ? `/sadmin/new-booking?branchId=${selectedBranch}` : '/sadmin/new-booking' },
  //     { name: 'View Booking', link: selectedBranch ? `/sadmin/view-booking?branchId=${selectedBranch}` : '/sadmin/view-booking' }
  //   ]},
  //   { name: 'Services', icon: <FaTools />, subMenu: [
  //     { name: 'Create Services', link: selectedBranch ? `/sadmin/create-service?branchId=${selectedBranch}` : '/sadmin/create-service' },
  //     { name: 'View Services', link: selectedBranch ? `/sadmin/view-services?branchId=${selectedBranch}` : '/sadmin/view-services' },
  //     { name: 'Assign Services', link: selectedBranch ? `/sadmin/assign-staff?branchId=${selectedBranch}` : '/sadmin/assign-staff' },
  //   ]},
  //   { name: 'Product', icon: <FaShoppingCart />, subMenu: [
  //     { name: 'Create Catgeory', link: selectedBranch ? `/sadmin/create-category?branchId=${selectedBranch}` : '/sadmin/create-category' },
  //     { name: 'Create Product', link: selectedBranch ? `/sadmin/create-product?branchId=${selectedBranch}` : '/sadmin/create-product' },
  //     { name: 'Display All Products', link: selectedBranch ? `/sadmin/display-product?branchId=${selectedBranch}` : '/sadmin/display-product' },
  //     { name: 'Stock Management', link: selectedBranch ? `/sadmin/stock-management?branchId=${selectedBranch}` : '/sadmin/stock-management' }
  //   ]},
  //   { name: 'Customers', icon: <FaUsers />, subMenu: [
  //     { name: 'Create Customer', link: selectedBranch ? `/sadmin/create-customer?branchId=${selectedBranch}` : '/sadmin/create-customer' },
  //     { name: 'All Customers', link: selectedBranch ? `/sadmin/view-allcustomer?branchId=${selectedBranch}` : '/sadmin/view-allcustomer' },
  //     { name: 'Client Info', link: selectedBranch ? `/sadmin/view-allcustomer?branchId=${selectedBranch}` : '/sadmin/view-allcustomer' }
  //   ]},
  //   { name: 'Employees', icon: <FaUsers />, subMenu: [
  //     { name: 'Create Employee', link: selectedBranch ? `/sadmin/employee?branchId=${selectedBranch}` : '/sadmin/employee' },
  //     { name: 'All Employees', link: selectedBranch ? `/sadmin/view-employee?branchId=${selectedBranch}` : '/sadmin/view-employee' },
  //     { name: 'Assign Role', link: selectedBranch ? `/sadmin/assign-role?branchId=${selectedBranch}` : '/sadmin/assign-role' }
  //   ]},
  //   { name: 'Reports', icon: <FaChartBar />, subMenu: [
  //     { name: 'All Reports', link: selectedBranch ? `/sadmin/report?branchId=${selectedBranch}` : '/sadmin/report' },
  //     { name: 'Customer Report', link: selectedBranch ? `/sadmin/customer-report?branchId=${selectedBranch}` : '/sadmin/customer-report' },
  //     { name: 'Employee Report', link: selectedBranch ? `/sadmin/employee-report?branchId=${selectedBranch}` : '/sadmin/employee-report' },
  //     { name: 'Booking Report', link: selectedBranch ? `/sadmin/booking-report?branchId=${selectedBranch}` : '/sadmin/booking-report' }
  //   ]},
  //   { name: 'Orders', icon: <FaMoneyBillWave />, subMenu: [
  //     { name: 'All Orders', link: selectedBranch ? `/sadmin/all-orders?branchId=${selectedBranch}` : '/sadmin/all-orders' },
  //   ]},
  //   { name: 'Settings', icon: <FaCog />, subMenu: [
  //     { name: 'Assign Branch', link: '/sadmin/assign-branch' }
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
