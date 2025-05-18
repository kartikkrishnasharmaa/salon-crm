import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Logo from "./../assests/salon-logo.png";
import {FaQuestionCircle  } from "react-icons/fa";  
import { HiMenu, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import AppointmentStatusModal from "./Helpmodel"; // Import the existing modal

const Adminheader = ({ toggleSidebar }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [status, setStatus] = useState("Pending"); // Default status is Pending
  const dropdownRef = useRef(null);

  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  // Function to dynamically generate menu link with branchId
  const getBranchLink = (baseLink) => {
    return selectedBranch ? `${baseLink}?branchId=${selectedBranch}` : baseLink;
  };
  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isOpen]);

  // Handle phone icon click to open the modal
  const handlePhoneIconClick = () => {

    setStatus("Pending");
    setModalOpen(true); 
  };

  return (
    <header className="bg-white flex items-center justify-between p-4 shadow-md relative z-50">
      <div className="flex items-center gap-4 md:hidden">
        <button
          className="text-black focus:outline-none"
          onClick={toggleSidebar}
        >
          <HiMenu size={28} />
        </button>
        <button
          className="text-black focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      <div className="flex-1 flex justify-center md:justify-start">
        <img src={Logo} alt="logo" className="w-40 h-16" />
      </div>

      <nav className="hidden md:flex space-x-6 text-lg font-semibold mx-auto">
        <Link
          to={getBranchLink("/salonadmin/dashboard")}
          className="hover:text-blue-600"
        >
          Dashboard
        </Link>
        <Link
          to={getBranchLink("/salonadmin/btesting")}
          className="hover:text-blue-600"
        >
          Calender
        </Link>
        <Link
          to={getBranchLink("/salonadmin/view-allcustomer")}
          className="hover:text-blue-600"
        >
          Client
        </Link>
        <Link
          to={getBranchLink("/salonadmin/report")}
          className="hover:text-blue-600"
        >
          Reports
        </Link>
        <Link
          to={getBranchLink("/salonadmin/dashboard")}
          className="hover:text-blue-600"
        >
          Retention
        </Link>
        <Link
          to={getBranchLink("/salonadmin/dashboard")}
          className="hover:text-blue-600"
        >
          Inventary
        </Link>
        <Link
          to={getBranchLink("/salonadmin/dashboard")}
          className="hover:text-blue-600"
        >
          Sales
        </Link>
  
        <div ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="flex"
        >
          Account
        </div>
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg overflow-hidden animate-fadeIn">
            <Link to="/salonadmin/profile">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                Profile
              </button>
            </Link>
            <button
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/salon-admin/login";
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
        {/* Other links */}
        <div className="mr-6 relative">
          <FaQuestionCircle 
            className="text-green-600 text-xl animate-ping absolute"
            size={30}
            onClick={handlePhoneIconClick}
          />
          <FaQuestionCircle 
            className="text-green-600 text-xl cursor-pointer"
            size={30}
            onClick={handlePhoneIconClick} // Handle click on the phone icon
          />
        </div>
      </nav>

      {/* User Dropdown */}
     

      {/* Mobile Menu Positioned Below Header */}
      {menuOpen && (
        <nav className="absolute top-24 left-0 w-full bg-white shadow-md flex flex-col md:hidden py-4 space-y-4 text-center z-40">
          <Link to={"/salonadmin/dashboard"} className="hover:text-blue-600">
            Dashboard
          </Link>
          <Link to={"/salonadmin/create-booking"} className="hover:text-blue-600">
            Bookings
          </Link>
          <Link to={"/salonadmin/employee"} className="hover:text-blue-600">
            Employees
          </Link>
          <Link to={"/salonadmin/report"} className="hover:text-blue-600">
            Reports
          </Link>
          <Link to={"/salonadmin/settings"} className="hover:text-blue-600">
            Settings
          </Link>
        </nav>
      )}

      {/* Appointment Status Modal */}
      <AppointmentStatusModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        status={status} // Pass the status to the modal
      />
    </header>
  );
};

export default Adminheader;
