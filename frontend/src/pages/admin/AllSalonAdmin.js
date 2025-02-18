import React, { useEffect, useState } from 'react';
import axios from "../../api/axiosConfig";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdminLayout from "../../layouts/AdminLayout";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const SalonAdminTable = ({ superAdminToken }) => {
  const [salonAdmins, setSalonAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedAdminId, setSelectedAdminId] = useState(null); // Store the ID of the admin to delete
  const navigate = useNavigate(); // For navigation
    const fetchSalonAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }
    
        const response = await axios.get('/salon-admin/view-all-salon-admins', {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000, // Set a timeout (5 seconds) for the request
        });
        setSalonAdmins(response.data); // Directly assign the response data to the state
        setTotalCount(response.data.length); // Set total count based on the array length
        setLoading(false);
      } catch (error) {
        setError(`Error: ${error.message || 'Failed to fetch salon admins'}`);
        setLoading(false);
      }
    };
    // Only fetch salon admins on mount or after deleting an admin
    useEffect(() => {
      fetchSalonAdmins();
    }, []);

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/salon-admin/delete-salon-admin/${selectedAdminId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove the deleted salon admin from the state
      setSalonAdmins(salonAdmins.filter((admin) => admin._id !== selectedAdminId));
      setTotalCount(totalCount - 1); // Update the total count
      setIsModalOpen(false); // Close the modal
      toast.success("Salon Admin deleted successfully"); // Show success toast

      // Check if the list is empty after deletion, if so, show message
      if (salonAdmins.length === 1) {
        setSalonAdmins([]);
        setTotalCount(0);
      }
    } catch (error) {
      toast.error("Error deleting Salon Admin"); // Show error toast
    }
  };

  const handleView = (adminId) => {
    navigate(`/admin/view-single-admin/${adminId}`); // Navigate to the AdminDetailPage with the selected admin's ID
  };

  const openDeleteModal = (adminId) => {
    setSelectedAdminId(adminId); // Store the admin ID to delete
    setIsModalOpen(true); // Open the modal
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false); // Close the modal without deleting
  };

  const handleLoginAsSalonAdmin = async (salonAdminId) => {
    try {
      const token = localStorage.getItem("token"); // Get Super Admin's token

      if (!token) {
        alert("No token found! Please log in first.");
        return;
      }

      const response = await axios.post(
        `/salon/login-as-salon-admin/${salonAdminId}`,
        {}, // Empty body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send Super Admin's token
          },
        }
      );

      console.log("Login successful:", response.data);

      // ✅ Store new Salon Admin Token
      localStorage.setItem("token", response.data.token);

      // ✅ Store Salon Admin Details (instead of previous user)
      localStorage.setItem("salonAdmin", JSON.stringify(response.data.user));

      // ✅ Redirect to Salon Admin Dashboard
      setTimeout(() => {
        navigate("/sadmin/dashboard");
      }, 1000);
  
    } catch (error) {
      console.error("Error logging in as Salon Admin:", error.response?.data || error);
      alert(`Error: ${error.response?.data?.message || "Something went wrong!"}`);
    }
  };

  // If data is still loading, show loading message
  if (loading) return <p>Loading...</p>;

  // If there's an error fetching data, show error message
  if (error) return <p>{error}</p>;

  return (
    <AdminLayout>
      <div className="overflow-x-auto">
        <h1 className="text-2xl font-extrabold mb-6 
                 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600
                 drop-shadow-lg shadow-blue-500/50 
                 transform transition duration-300 hover:scale-105">
          Total Salon Admins: <strong>{totalCount}</strong>
        </h1>
        {salonAdmins.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-gray-100 p-8 rounded-lg shadow-lg space-y-6">
            <p className="text-xl font-semibold text-gray-700">
              No salon admins available. Please add a salon admin to get started.
            </p>
            <a href="/admin/salonadmin"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              Add Salon Admin
            </a>
          </div>
        ) : (
          <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Owner Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Salon Name</th>
                <th className="px-6 py-3 text-left">Salon Type</th>
                <th className="px-6 py-3 text-left">Login As Admin</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {salonAdmins.map((admin) => (
                <tr key={admin._id} className="hover:bg-gray-100 border-b transition-all">
                  <td className="px-6 py-4">{admin.ownerName}</td>
                  <td className="px-6 py-4">{admin.email}</td>
                  <td className="px-6 py-4">{admin.phone}</td>
                  <td className="px-6 py-4">{admin.salonName}</td>
                  <td className="px-6 py-4">{admin.salonType}</td>
                  <td>
                    <button class="w-auto ml-6 p-2 bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white rounded" onClick={() => handleLoginAsSalonAdmin(admin._id)} disabled={loading}>
                      {loading ? "Logging in..." : "Dashboard"}
                    </button>
                  </td>
                  <td className="px-6 py-4 flex space-x-4"> {/* Flex to align icons */}
                    <FaEye className="text-blue-500 cursor-pointer" title="View" onClick={() => handleView(admin._id)} />
                    <FaEdit className="text-yellow-500 cursor-pointer" title="Edit" />
                    <FaTrash
                      className="text-red-500 cursor-pointer"
                      title="Delete"
                      onClick={() => openDeleteModal(admin._id)} // Open the delete confirmation modal
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete this Salon Admin?</h2>
            <div className="flex justify-between">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
                onClick={closeDeleteModal}
              >
                No
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={handleDelete} // Confirm delete
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Toast notifications container */}
      <ToastContainer />
    </AdminLayout>
  );
};

export default SalonAdminTable;
