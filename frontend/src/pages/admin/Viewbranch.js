import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import AdminLayout from "../../layouts/AdminLayout";
import { FaEdit, FaTrash } from "react-icons/fa";

const SalonAdminBranches = () => {
  const [salonAdmins, setSalonAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('/branch/get-branches', {
          headers: { Authorization: token },
        });
        setSalonAdmins(response.data.branches);
      } catch (error) {
        console.error("Error fetching branches:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  const handleDeleteClick = (branch, salonAdminId) => {
    console.log("Branch selected for deletion:", branch);
    setSelectedBranch({ ...branch, salonAdminId }); 
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      console.log("Selected Branch:", selectedBranch); // Check if the selectedBranch has the correct values
  
      // Make sure both salonAdminId and branchId are valid before calling the API
      if (!selectedBranch || !selectedBranch.salonAdminId || !selectedBranch._id) {
        console.error("Error: Missing salonAdminId or branchId in selectedBranch");
        return; // Exit if required data is missing
      }
  
      const token = localStorage.getItem("token");
  
      // Send DELETE request to remove the branch
      const response = await axios.delete(
        `/delete-branch/${selectedBranch.salonAdminId}/${selectedBranch._id}`, {
          headers: { Authorization: token },
        }
      );
  
      if (response.status === 200) {
        // Handle successful deletion
        setSalonAdmins((prevAdmins) =>
          prevAdmins.map((admin) => {
            // Filter out the deleted branch from the admin's branches
            if (admin._id === selectedBranch.salonAdminId) {
              return {
                ...admin,
                branches: admin.branches.filter((branch) => branch._id !== selectedBranch._id),
              };
            }
            return admin;
          })
        );
        console.log("Branch deleted successfully");
        setShowModal(false); // Close modal after deletion
      }
    } catch (error) {
      console.error("Error deleting branch:", error);
      // Handle error, show error message if necessary
    }
  };
  

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
      <button
        onClick={() => handleDeleteClick(branch, admin._id)}  // Pass salonAdminId
        className="text-red-500 hover:text-red-700 mx-2"
      >
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

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg z-60">
              <p className="text-lg font-semibold mb-4">Do you want to delete this?</p>
              <div className="flex justify-end">
                <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded mr-2">Yes</button>
                <button onClick={() => setShowModal(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">No</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default SalonAdminBranches;
