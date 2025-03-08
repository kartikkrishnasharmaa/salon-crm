import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import SAAdminLayout from "../../../layouts/Salonadmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../api/axiosConfig";

const CustomerTable = () => {
  const selectedBranch = useSelector(state => state.branch.selectedBranch);
  const [customers, setCustomers] = useState([]);
  
  useEffect(() => {
      if (selectedBranch) {
          console.log("Fetching Customers for Branch ID:", selectedBranch);
          
          axios.get(`/customer/salon/customers?branchId=${selectedBranch}`, { 
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
          .then(res => setCustomers(res.data))
          .catch(error => console.error("Error fetching customers:", error));
      }
  }, [selectedBranch]);
  return (
    <SAAdminLayout>
      <div className="overflow-x-auto">
      <h1 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg shadow-blue-500/50">
  Total Customers: <strong>{customers.customers ? customers.customers.length : 0}</strong>
</h1>

        {customers.customers && customers.customers.length > 0 ? (
    <table className="w-full border-collapse border border-gray-200 mt-4">
        <thead>
            <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left">S.No</th>
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Phone</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Created At</th>
            </tr>
        </thead>
        <tbody>
            {customers.customers.map((c,index) => (
                <tr key={c._id} className="text-center">
                      <td className="py-3 px-4 border">{index + 1}</td>
                    <td className="border border-gray-300 p-2">{c.name}</td>
                    <td className="border border-gray-300 p-2">{c.phone}</td>
                    <td className="border border-gray-300 p-2">{c.email}</td>
                    <td className="border border-gray-300 p-2">
                        {new Date(c.createdAt).toLocaleString()}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
) : (
    <p>No customers found for this branch.</p>
)}
      
      </div>
      <ToastContainer />
    </SAAdminLayout>
  );
};

export default CustomerTable;
