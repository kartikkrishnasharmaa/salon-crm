import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import AdminLayout from "../../layouts/AdminLayout";
import { FaEdit, FaTrash } from "react-icons/fa";

const SalonAdminBranches = () => {
  const [salonAdmins, setSalonAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedAdminId, setSelectedAdminId] = useState(null);

  useEffect(() => {
    const fetchSalonAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/salon/get-all-branches", {
          headers: { Authorization: token },
        });
        setSalonAdmins(response.data.data || []); // Corrected response path
      } catch (error) {
        console.error("Error fetching salon admins:", error);
        setError("Failed to load salon admins. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSalonAdmins();
  }, []);

  const handleDeleteClick = (adminId, branch) => {
    setSelectedAdminId(adminId);
    setSelectedBranch(branch);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedAdminId || !selectedBranch) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/salon/delete-branch/${selectedAdminId}/${selectedBranch._id}`, {
        headers: { Authorization: token },
      });

      setSalonAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === selectedAdminId
            ? { ...admin, branches: admin.branches.filter((b) => b._id !== selectedBranch._id) }
            : admin
        )
      );

      setShowModal(false);
    } catch (error) {
      console.error("Error deleting branch:", error);
      setError("Failed to delete branch. Please try again.");
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-center mb-6 
               text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600
               drop-shadow-lg shadow-blue-500/50 
               transform transition duration-300 hover:scale-105">
  ✂️ Salon Admins & Their Branches 💈
</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg font-semibold text-gray-600 animate-pulse">Loading...</p>
          </div>
        ) : salonAdmins.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-lg text-gray-500">No salon admins found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {salonAdmins.map((admin) => (
              <div
                key={admin._id}
                className="bg-white border rounded-xl shadow-lg p-5 flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6 transition-transform transform hover:scale-105 hover:shadow-2xl shadow-bg-gradient-to-r from-blue-500 to-purple-600"
              >
                <div className="w-full md:w-1/3">
                  <h2 className="text-2xl font-bold text-gray-800">{admin?.ownerName || "Unknown"}</h2>
                  <p className="text-gray-600">{admin?.email || "No Email"}</p>
                </div>

                <div className="w-full md:w-2/3 flex flex-wrap gap-4">
                  {admin.branches && admin.branches.length > 0 ? (
                    admin.branches.map((branch) => (
                      <div
                        key={branch._id}
                        className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition w-full md:w-[45%]"
                      >
                        <div>
                          <p className="text-lg font-medium text-gray-800">{branch.branchName || "No Name"}</p>
                          <p className="text-sm text-gray-500">{branch.address || "No Address"}</p>
                          <p className="text-sm text-gray-500">{branch.phone || "No Phone"}</p>
                        </div>
                        <div className="flex gap-3">
                          <button className="text-blue-500 hover:text-blue-700 transition">
                            <FaEdit size={18} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700 transition"
                            onClick={() => handleDeleteClick(admin._id, branch)}
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">No branches found</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-lg font-bold">Confirm Delete</h2>
              <p>Are you sure you want to delete this branch?</p>
              <div className="mt-4 flex justify-end">
                <button className="px-4 py-2 bg-gray-300 rounded mr-2" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SalonAdminBranches;
