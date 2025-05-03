import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaPencilAlt } from "react-icons/fa";
import axios from "../../../api/axiosConfig";

function Branchlist() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const salonAdminData = JSON.parse(localStorage.getItem("salonAdmin"));
  const salonAdminId = salonAdminData?._id;

  useEffect(() => {
    if (!salonAdminId || !token) {
      console.error("🚨 SalonAdminId or Token missing! API calls will not proceed.");
      setLoading(false);
      return;
    }

    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          `/branch/get-salon/${salonAdminId}/branches`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBranches(response.data.branches);
      } catch (error) {
        console.error("❌ Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [token, salonAdminId]);

  return (
    <SAAdminLayout>
      <div className="flex justify-center items-start bg-gray-50 p-4 min-h-screen">
        <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-6xl space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Branch Management</h1>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Loading branches...</p>
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-500 to-indigo-600">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Branch Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      City
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Manager Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {branches.map((branch) => (
                    <tr key={branch._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-blue-600">
                        {branch.branchName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {branch.address}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {branch.city}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {branch.state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {branch.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(branch.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          to={`/salonadmin/main-branch/${branch._id}`}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                        >
                          <FaPencilAlt className="h-3 w-3 mr-1" />
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && branches.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg
                  className="mx-auto h-12 w-12"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900">No branches found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by adding a new branch location.
              </p>
              <div className="mt-6">
                <Link
                  to="/add-branch"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add New Branch
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </SAAdminLayout>
  );
}

export default Branchlist;