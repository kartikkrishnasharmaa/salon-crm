import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Logo from "./../assests/salon-logo.png";
import { FaUserCircle, FaPhoneAlt } from "react-icons/fa";
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
    // Logic to decide the status, here it is hardcoded to 'Pending' but you can modify it.
    setStatus("Pending"); // You can dynamically change the status based on the appointment status
    setModalOpen(true); // Open modal
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
          to={getBranchLink("/salonadmin/create-booking")}
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
        <Link
          to={getBranchLink("/salonadmin/profile")}
          className="hover:text-blue-600"
        >
          Account
        </Link>
        <Link
          to={getBranchLink("/salonadmin/dashboard")}
          className="hover:text-blue-600"
        >
          Info
        </Link>
        {/* Other links */}
        <div className="mr-6 relative">
          <FaPhoneAlt
            className="text-green-600 text-xl animate-ping absolute"
            onClick={handlePhoneIconClick}
          />
          <FaPhoneAlt
            className="text-green-600 text-xl cursor-pointer"
            onClick={handlePhoneIconClick} // Handle click on the phone icon
          />
        </div>
      </nav>

      {/* User Dropdown */}
      <div className="relative mr-4" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex ml-9 items-center space-x-2 px-4 py-2 rounded-md shadow hover:bg-blue-400"
        >
          <FaUserCircle size={24} />
        </button>
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

// import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux"; // Redux hook
// import Logo from "./../assests/salon-logo.png";
// import { FaUserCircle, FaPhoneAlt } from "react-icons/fa";
// import { HiMenu, HiX } from "react-icons/hi";
// import { Link } from "react-router-dom"; // Import Link from react-router-dom
// import AppointmentStatusModal from "./Helpmodel"; // Import HelpModel component

// const Adminheader = ({ toggleSidebar }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const selectedBranch = useSelector(state => state.branch.selectedBranch); // Redux se branch ID le rhe hai

//   const handleOutsideClick = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isOpen) {
//       document.addEventListener("click", handleOutsideClick);
//     } else {
//       document.removeEventListener("click", handleOutsideClick);
//     }
//     return () => document.removeEventListener("click", handleOutsideClick);
//   }, [isOpen]);

//   // Function to dynamically generate menu link with branchId
//   const getBranchLink = (baseLink) => {
//     return selectedBranch ? `${baseLink}?branchId=${selectedBranch}` : baseLink;
//   };

//   return (
//     <header className="bg-white flex items-center justify-between p-4 shadow-md relative z-50">
//       {/* Sidebar & Menu Toggle Buttons for Mobile */}
//       <div className="flex items-center gap-4 md:hidden">
//         <button className="text-black focus:outline-none" onClick={toggleSidebar}>
//           <HiMenu size={28} />
//         </button>
//         <button className="text-black focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
//           {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
//         </button>
//       </div>

//       {/* Logo Centered on Mobile, Left on Desktop */}
//       <div className="flex-1 flex justify-center md:justify-start">
//         <img src={Logo} alt="logo" className="w-40 h-16" />
//       </div>

//       {/* Desktop Menu Centered */}
//       <nav className="hidden md:flex space-x-6 text-lg font-semibold mx-auto">
//         <Link to={getBranchLink("/salonadmin/dashboard")} className="hover:text-blue-600">
//           Dashboard
//         </Link>
//         <Link to={getBranchLink("/salonadmin/create-booking")} className="hover:text-blue-600">
//           Calender
//         </Link>
//         <Link to={getBranchLink("/salonadmin/view-allcustomer")} className="hover:text-blue-600">
//           Client
//         </Link>
//         <Link to={getBranchLink("/salonadmin/report")} className="hover:text-blue-600">
//           Reports
//         </Link>
//         <Link to={getBranchLink("/salonadmin/dashboard")} className="hover:text-blue-600">
//           Retention
//         </Link>
//         <Link to={getBranchLink("/salonadmin/dashboard")} className="hover:text-blue-600">
//           Inventary
//         </Link>
//         <Link to={getBranchLink("/salonadmin/dashboard")} className="hover:text-blue-600">
//           Sales
//         </Link>
//         <Link to={getBranchLink("/salonadmin/profile")} className="hover:text-blue-600">
//           Account
//         </Link>
//         <Link to={getBranchLink("/salonadmin/dashboard")} className="hover:text-blue-600">
//           Info
//         </Link>
//         <div className="mr-6 relative">
//           <FaPhoneAlt className="text-green-600 text-xl animate-ping absolute" />
//           <FaPhoneAlt
//             className="text-green-600 text-xl cursor-pointer"
//             onClick={handlePhoneIconClick}  // Handle click on the phone icon
//           />
//         </div>
//       </nav>
//       <AppointmentStatusModal
//         isOpen={modalOpen}
//         onClose={() => setModalOpen(false)}
//         status={status}  // Pass the status to the modal
//       />

//       {/* User Dropdown */}
//       <div className="relative mr-4" ref={dropdownRef}>
//         <button
//           onClick={() => setIsOpen(!isOpen)}
//           className="flex ml-9 items-center space-x-2 px-4 py-2 rounded-md shadow hover:bg-blue-400"
//         >
//           <FaUserCircle size={24} />
//         </button>
//         {isOpen && (
//           <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg overflow-hidden animate-fadeIn">
//             <Link to="/salonadmin/profile">
//               <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
//                 Profile
//               </button>
//             </Link>
//             <button
//               className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 localStorage.removeItem("user");
//                 window.location.href = "/salon-admin/login";
//               }}
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Mobile Menu Positioned Below Header */}
//       {menuOpen && (
//         <nav className="absolute top-24 left-0 w-full bg-white shadow-md flex flex-col md:hidden py-4 space-y-4 text-center z-40">
//           <Link to={getBranchLink("/salonadmin/dashboard")} className="hover:text-blue-600">
//             Dashboard
//           </Link>
//           <Link to={getBranchLink("/salonadmin/create-booking")} className="hover:text-blue-600">
//             Bookings
//           </Link>
//           <Link to={getBranchLink("/salonadmin/employee")} className="hover:text-blue-600">
//             Employees
//           </Link>
//           <Link to={getBranchLink("/salonadmin/report")} className="hover:text-blue-600">
//             Reports
//           </Link>
//           <Link to={getBranchLink("/salonadmin/settings")} className="hover:text-blue-600">
//             Settings
//           </Link>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Adminheader;
