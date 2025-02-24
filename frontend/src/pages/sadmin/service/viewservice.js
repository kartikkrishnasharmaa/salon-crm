import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import SAAdminLayout from "../../../layouts/Salonadmin";
const SAviewservice = () => {

    return (
        <SAAdminLayout>
            <h1 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg shadow-blue-500/50 transform transition duration-300 hover:scale-105">
          All Services
        </h1>
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Service Name</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Plan</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
             
                <tr className="hover:bg-gray-100 border-b transition-all">
                  <td className="px-6 py-4">Hair Cutting</td>
                  <td className="px-6 py-4">Hair</td>
                  <td className="px-6 py-4">Basic</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <FaEye className="text-blue-500 cursor-pointer" title="View"/>
                    <FaEdit className="text-yellow-500 cursor-pointer" title="Edit" />
                    <FaTrash className="text-red-500 cursor-pointer" title="Delete" />
                  </td>
                </tr>
                 
                <tr className="hover:bg-gray-100 border-b transition-all">
                  <td className="px-6 py-4">Hair Color</td>
                  <td className="px-6 py-4">Hair</td>
                  <td className="px-6 py-4">Premium</td>
                  <td className="px-6 py-4 flex space-x-4">
                    <FaEye className="text-blue-500 cursor-pointer" title="View"/>
                    <FaEdit className="text-yellow-500 cursor-pointer" title="Edit" />
                    <FaTrash className="text-red-500 cursor-pointer" title="Delete" />
                  </td>
                </tr>
            </tbody>
          </table>
           </SAAdminLayout>
    );
};

export default SAviewservice;