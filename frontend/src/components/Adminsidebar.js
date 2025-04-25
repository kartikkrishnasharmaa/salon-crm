import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaTachometerAlt,
  FaShoppingCart,
  FaTools,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
  FaGift,
  FaUsers,
  FaWallet,
  FaUserTie,
  FaMoneyBillWave,
  FaCashRegister,
  FaPercent,
  FaReceipt,
  FaFileAlt,
  FaUserFriends,
  FaBriefcase,
  FaLayerGroup,
  FaCreditCard,
} from "react-icons/fa";

const Adminsidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const [openMenu, setOpenMenu] = useState(null);
  const selectedBranch = useSelector((state) => state.branch.selectedBranch); // Get selected branch from Redux

  const toggleSubCategory = (category) => {
    setOpenMenu(openMenu === category ? null : category);
  };
  const handleNavigation = (link, e) => {
    // Check if link is empty or just "/"
    if (!link || link === "/") {
      e.preventDefault();
      alert("This page is under construction and will be available soon!");
      return;
    }
    toggleSidebar();
  };

  const menuItems = [
    {
      name: "Business Details",
      icon: <FaTachometerAlt />,
      link: selectedBranch
        ? `/salonadmin/dashboard?branchId=${selectedBranch}`
        : "/salonadmin/dashboard",
    },
    {
      name: "Location",
      icon: <FaMapMarkerAlt />,
      link: selectedBranch
        ? `/salonadmin/all-branch?branchId=${selectedBranch}`
        : "/salonadmin/all-branch",
    },
    {
      name: "Services",
      icon: <FaTools />,
      link: selectedBranch
        ? `/salonadmin/view-services?branchId=${selectedBranch}`
        : "/salonadmin/view-services",
    },
    {
      name: "Products",
      icon: <FaShoppingCart />,
      link: selectedBranch
        ? `/salonadmin/display-product?branchId=${selectedBranch}`
        : "/salonadmin/display-product",
    },
    {
      name: "Packages",
      icon: <FaLayerGroup />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Custom Packages",
      icon: <FaLayerGroup />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Service Combo",
      icon: <FaLayerGroup />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Pre-Paid Card",
      icon: <FaCreditCard />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Gift Card",
      icon: <FaGift />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Membership",
      icon: <FaUsers />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Taxes",
      icon: <FaReceipt />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Jobs",
      icon: <FaBriefcase />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Staff",
      icon: <FaUserFriends />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Salary",
      icon: <FaMoneyBillWave />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Incentive",
      icon: <FaWallet />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Cashback",
      icon: <FaCashRegister />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Rewards",
      icon: <FaGift />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Discount",
      icon: <FaPercent />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Expenses",
      icon: <FaReceipt />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Templates",
      icon: <FaFileAlt />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Referral",
      icon: <FaUserTie />,
      link: selectedBranch ? `/` : "/",
    },
    {
      name: "Payment Mode",
      icon: <FaCreditCard />,
      link: selectedBranch ? `/` : "/",
    },
  ];
  return (
    <aside
      className={`fixed bg-white inset-y-0 left-0 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out w-80 bg-gradient-to-b text-black p-4 z-30 shadow-lg md:relative overflow-y-auto max-h-screen`}
    >
      <nav>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              {item.subMenu ? (
                <div
                  className="flex items-center justify-between py-3 px-4 cursor-pointer"
                  onClick={() => toggleSubCategory(item.name)}
                >
                  <div className="flex items-center gap-4">
                    {item.icon}
                    <span className="text-lg font-medium">{item.name}</span>
                  </div>
                  {openMenu === item.name ? <FaChevronUp /> : <FaChevronDown />}
                </div>
              ) : (
                <NavLink
                  to={item.link || "#"}
                  className={({ isActive }) =>
                    `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${
                      isActive
                        ? "bg-blue-500 text-white shadow-lg"
                        : item.link && item.link !== "/"
                        ? "hover:bg-blue-500 hover:text-white"
                        : "opacity-50 cursor-not-allowed"
                    }`
                  }
                  onClick={(e) => handleNavigation(item.link, e)}
                >
                  {item.icon}
                  <span className="text-lg font-medium">{item.name}</span>
                  {(!item.link || item.link === "/") && (
                    <span className="text-xs ml-auto bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  )}
                </NavLink>
              )}
              {openMenu === item.name && item.subMenu && (
                <ul className="pl-8 space-y-2">
                  {item.subMenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <NavLink
                        to={subItem.link || "#"}
                        className={({ isActive }) =>
                          `flex items-center gap-4 py-3 px-4 rounded-lg transition-all duration-200 ease-in-out ${
                            isActive
                              ? "bg-blue-500 text-white shadow-lg"
                              : subItem.link && subItem.link !== "/"
                              ? "hover:bg-blue-500 hover:text-white"
                              : "opacity-50 cursor-not-allowed"
                          }`
                        }
                        onClick={(e) => handleNavigation(subItem.link, e)}
                      >
                        <span className="text-lg font-medium">
                          {subItem.name}
                        </span>
                        {(!subItem.link || subItem.link === "/") && (
                          <span className="text-xs ml-auto bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            Coming Soon
                          </span>
                        )}
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
