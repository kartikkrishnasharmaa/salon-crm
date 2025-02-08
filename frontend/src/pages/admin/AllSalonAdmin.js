import React, { useEffect, useState } from 'react';
import axios from "../../api/axiosConfig";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom'; // For navigation
import AdminLayout from "../../layouts/AdminLayout";
import { ToastContainer, toast } from 'react-toastify'; // For toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Importing toast styles

const SalonAdminTable = ({superAdminToken}) => {
  const [salonAdmins, setSalonAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedAdminId, setSelectedAdminId] = useState(null); // Store the ID of the admin to delete
  const navigate = useNavigate(); // For navigation

  // Fetch salon admins data
  const fetchSalonAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('/salon/view-all-salon-admins', {
        headers: { Authorization: token },
      });

      // If no salon admins, set state to empty and update total count
      if (response.data.salonAdmins && response.data.salonAdmins.length === 0) {
        setSalonAdmins([]);
        setTotalCount(0);
      } else {
        setSalonAdmins(response.data.salonAdmins);
        setTotalCount(Number(response.data.totalSalonAdmins));
      }

      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      // Handle error gracefully when no admins are found (avoid crash)
      if (error.response && error.response.status === 404) {
        setSalonAdmins([]);
        setTotalCount(0);
        setLoading(false);
      } else {
        setError('Failed to load salon admins');
        setLoading(false);
      }
    }
  };

  // Only fetch salon admins on mount or after deleting an admin
  useEffect(() => {
    fetchSalonAdmins();
  }, []); // Run only once on component mount

  // Handle delete confirmation
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/salon/delete-salon-admin/${selectedAdminId}`, {
        headers: { Authorization: token },
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
      navigate("/sadmin/dashboard");
  
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
        <p className="text-2xl font-semibold text-gray-800 mb-4">Total Salon Admins: <strong>{totalCount}</strong></p>

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
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 text-left">Owner Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Phone</th>
                <th className="px-6 py-3 text-left">Salon Name</th>
                <th className="px-6 py-3 text-left">Salon Type</th>
                <th className="px-6 py-3 text-left">Established Year</th>
                <th className="px-6 py-3 text-left">Actions</th> {/* Add column for actions */}
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
                  <td className="px-6 py-4">{admin.establishedYear}</td>
                  <td>
                <button onClick={() => handleLoginAsSalonAdmin(admin._id)} disabled={loading}>
                  {loading ? "Logging in..." : "Login as Admin"}
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
