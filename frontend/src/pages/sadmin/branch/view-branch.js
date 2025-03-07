import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";

const BranchList = () => {
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
        const response = await axios.get(`/branch/get-salon/${salonAdminId}/branches`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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
    <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">Branches</h2>
    {loading ? (
      <p className="text-center text-gray-500 text-xl">Loading...</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {branches.map((branch) => (
          <div key={branch._id} className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold text-blue-600 mb-2">{branch.branchName}</h3>
            <p className="text-gray-700 text-lg"><strong>📍 Address:</strong> {branch.address}</p>
            <p className="text-gray-700 text-lg"><strong>📞 Phone:</strong> {branch.phone}</p>
            <p className="text-gray-500 text-sm mt-2"><strong>🕒 Created At:</strong> {new Date(branch.createdAt).toLocaleString()}</p>
            <p className="text-gray-500 text-sm"><strong>🔄 Updated At:</strong> {new Date(branch.updatedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    )}
  </SAAdminLayout>
  );
};

export default BranchList;
