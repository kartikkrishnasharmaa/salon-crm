import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaSearch, FaEdit } from "react-icons/fa";

const dummyData = [
    { id: 1, name: "Priya Sharma", number: "9876543210", email: "priya.sharma@example.com", gender: "Female", address: "Delhi, India" },
    { id: 2, name: "Rohit Kumar", number: "8765432109", email: "rohit.kumar@example.com", gender: "Male", address: "Mumbai, India" },
    { id: 3, name: "Anjali Verma", number: "7654321098", email: "anjali.verma@example.com", gender: "Female", address: "Bangalore, India" },
    { id: 4, name: "Amit Singh", number: "6543210987", email: "amit.singh@example.com", gender: "Male", address: "Kolkata, India" },
];

function AllProducts() {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (value) {
            const results = dummyData.filter(
                (item) => item.name.toLowerCase().includes(value.toLowerCase()) || item.number.includes(value)
            );
            setFilteredData(results.length > 0 ? results : []);
        } else {
            setFilteredData([]);
        }
    };

    const handleSelect = (client) => {
        navigate(`/salonadmin/client-info/${client.id}`, { state: { client } }); // ✅ Correctly pass client data
    };

    return (
        <SAAdminLayout>
            <div className="flex justify-center items-center bg-gray-100 p-4">
                <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl space-y-6">
                    <h1 className="text-2xl font-bold text-center text-gray-800">Search Client</h1>
                    
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by Name or Number"
                            value={search}
                            onChange={handleSearch}
                            className="w-full p-3 border rounded-md"
                        />
                        <FaSearch className="absolute right-3 top-4 text-gray-400" />
                    </div>

                    {search && (
                        <div className="border rounded-md bg-white shadow-md max-h-60 overflow-y-auto mt-2">
                            {filteredData.length > 0 ? (
                                filteredData.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-3 hover:bg-gray-100 flex justify-between items-center cursor-pointer"
                                        onClick={() => handleSelect(item)}
                                    >
                                        <span>{item.name} - {item.number}</span>
                                        <FaEdit className="text-blue-500 cursor-pointer" />
                                    </div>
                                ))
                            ) : (
                                <p className="text-center text-red-500 p-3">No Data Found</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </SAAdminLayout>
    );
}

export default AllProducts;

// import React, { useEffect, useState } from "react";
// import { useSelector } from 'react-redux';
// import SAAdminLayout from "../../../layouts/Salonadmin";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "../../../api/axiosConfig";

// const CustomerTable = () => {
//   const selectedBranch = useSelector(state => state.branch.selectedBranch);
//   const [customers, setCustomers] = useState([]);
  
//   useEffect(() => {
//       if (selectedBranch) {
//           console.log("Fetching Customers for Branch ID:", selectedBranch);
          
//           axios.get(`/customer/salon/customers?branchId=${selectedBranch}`, { 
//               headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//           })
//           .then(res => setCustomers(res.data))
//           .catch(error => console.error("Error fetching customers:", error));
//       }
//   }, [selectedBranch]);
//   return (
//     <SAAdminLayout>
//       <div className="overflow-x-auto">
//       <h1 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg shadow-blue-500/50">
//   Total Customers: <strong>{customers.customers ? customers.customers.length : 0}</strong>
// </h1>

//         {customers.customers && customers.customers.length > 0 ? (
//     <table className="w-full border-collapse border border-gray-200 mt-4">
//         <thead>
//             <tr className="bg-gray-100">
//             <th className="py-3 px-4 text-left">S.No</th>
//                 <th className="border border-gray-300 p-2">Name</th>
//                 <th className="border border-gray-300 p-2">Phone</th>
//                 <th className="border border-gray-300 p-2">Email</th>
//                 <th className="border border-gray-300 p-2">Created At</th>
//             </tr>
//         </thead>
//         <tbody>
//             {customers.customers.map((c,index) => (
//                 <tr key={c._id} className="text-center">
//                       <td className="py-3 px-4 border">{index + 1}</td>
//                     <td className="border border-gray-300 p-2">{c.name}</td>
//                     <td className="border border-gray-300 p-2">{c.phone}</td>
//                     <td className="border border-gray-300 p-2">{c.email}</td>
//                     <td className="border border-gray-300 p-2">
//                         {new Date(c.createdAt).toLocaleString()}
//                     </td>
//                 </tr>
//             ))}
//         </tbody>
//     </table>
// ) : (
//     <p>No customers found for this branch.</p>
// )}
      
//       </div>
//       <ToastContainer />
//     </SAAdminLayout>
//   );
// };

// export default CustomerTable;
