import React, { useEffect, useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import SAAdminLayout from "../../../layouts/Salonadmin";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const CustomerTable = ({ superAdminToken }) => {
  const [totalCount, setTotalCount] = useState(1);

  return (
    <SAAdminLayout>
      <div className="overflow-x-auto">
        <h1 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg shadow-blue-500/50 transform transition duration-300 hover:scale-105">
          Total Customers: <strong>{totalCount}</strong>
        </h1>

          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Customer Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
             
                <tr className="hover:bg-gray-100 border-b transition-all">
                  <td className="px-6 py-4">kartik</td>
                  <td className="px-6 py-4">kartik@gmail.com</td>
                  <td className="px-6 py-4">99997979797</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <FaEye className="text-blue-500 cursor-pointer" title="View"/>
                    <FaEdit className="text-yellow-500 cursor-pointer" title="Edit" />
                    <FaTrash className="text-red-500 cursor-pointer" title="Delete" />
                  </td>
                </tr>
            </tbody>
          </table>
      </div>
      <ToastContainer />
    </SAAdminLayout>
  );
};

export default CustomerTable;
