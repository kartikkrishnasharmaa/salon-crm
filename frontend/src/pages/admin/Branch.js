import React, { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../layouts/AdminLayout";

const SalonBranchCreate = () => {
  const [salonAdmins, setSalonAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    salonAdmin: "",
    branchName: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    const fetchSalonAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/salon/view-all-salon-admins", {
          headers: { Authorization: token },
        });
        setSalonAdmins(response.data.salonAdmins || []);
      } catch (error) {
        toast.error("Failed to fetch salon admins");
      }
    };

    fetchSalonAdmins();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple Validation (Check if fields are filled)
    if (!formData.salonAdmin || !formData.branchName || !formData.address || !formData.phone) {
      toast.error("Please fill all the fields.");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/salon/create-branch", formData, {
        headers: { Authorization:token },
      });
      toast.success(response.data.message);
      setFormData({
        salonAdmin: "",
        branchName: "",
        address: "",
        phone: "",
      });
    } catch (error) {
      toast.error("Failed to create branch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Salon Branch</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Select Salon Admin</label>
            <select
              name="salonAdmin"
              value={formData.salonAdmin}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select an Admin</option>
              {salonAdmins.map((admin) => (
                <option key={admin._id} value={admin._id}>
                  {admin.ownerName} - {admin.salonName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Branch Name</label>
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Branch"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default SalonBranchCreate;
