import React, { useEffect, useState } from 'react';
import axios from "../../api/axiosConfig";
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom'; // For navigation
import AdminLayout from "../../layouts/AdminLayout";

const SalonAdminTable = () => {
  const [salonAdmins, setSalonAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchSalonAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('/salon/view-all-salon-admins', {
          headers: { Authorization: token },
        });
        setSalonAdmins(response.data.salonAdmins);
        setTotalCount(Number(response.data.totalSalonAdmins));
        console.log("All Salon Admins List:", response.data.salonAdmins, response.data.totalSalonAdmins);

        setLoading(false);
      } catch (error) {
        setError('Failed to load salon admins');
        setLoading(false);
      }
    };

    fetchSalonAdmins();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const handleView = (adminId) => {
    navigate(`/admin/view-single-admin/${adminId}`); // Navigate to the AdminDetailPage with the selected admin's ID
  };

  return (
    <AdminLayout>
      <div className="overflow-x-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Salon Admins List</h2>
        <p className="text-lg mb-4">Total Salon Admins: <strong>{totalCount}</strong></p>

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
                <td className="px-6 py-4 flex space-x-4"> {/* Flex to align icons */}
                  <FaEye className="text-blue-500 cursor-pointer" title="View" onClick={() => handleView(admin._id)} />
                  <FaEdit className="text-yellow-500 cursor-pointer" title="Edit" />
                  <FaTrash className="text-red-500 cursor-pointer" title="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default SalonAdminTable;
