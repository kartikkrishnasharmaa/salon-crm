import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import AdminLayout from "../../layouts/AdminLayout";
import { FaEdit, FaTrash } from "react-icons/fa";

const SalonAdminBranches = () => {
  const [salonAdmins, setSalonAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
      const token = localStorage.getItem("token");
        const response = await axios.get('/branch/get-branches',{
            headers: { Authorization: token },});
        setSalonAdmins(response.data.branches);
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  return (
    <AdminLayout>
     <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Salon Admins & Their Branches</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
        <div className="space-y-6">
          {salonAdmins.map((admin) => (
            <div key={admin._id} className="bg-white shadow-lg rounded-lg p-6 border">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Owner Name - {admin.ownerName}</h2>
              {admin.branches && admin.branches.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">Branch Name</th>
                      <th className="border border-gray-300 p-2">Address</th>
                      <th className="border border-gray-300 p-2">Phone</th>
                      <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admin.branches.map((branch) => (
                      <tr key={branch._id} className="text-center border border-gray-300">
                        <td className="border border-gray-300 p-2">{branch.branchName}</td>
                        <td className="border border-gray-300 p-2">{branch.address}</td>
                        <td className="border border-gray-300 p-2">{branch.phone}</td>
                        <td className="border border-gray-300 p-2">
                          <button className="text-blue-500 hover:text-blue-700 mx-2">
                            <FaEdit />
                          </button>
                          <button className="text-red-500 hover:text-red-700 mx-2">
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="text-gray-500 text-center">No Branch Found</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    </AdminLayout>
  );
};

export default SalonAdminBranches;
