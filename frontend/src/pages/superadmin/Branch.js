import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import AdminLayout from "../../layouts/AdminLayout";

function CreateBranch() {
  const [salonAdmins, setSalonAdmins] = useState([]);
  const [formData, setFormData] = useState({
    salonAdminId: "",
    branchName: "",
    businessName: "",
    address: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    area: "",
    hours: {
      mon: { open: "", close: "", closed: false },
      tue: { open: "", close: "", closed: false },
      wed: { open: "", close: "", closed: false },
      thu: { open: "", close: "", closed: false },
      fri: { open: "", close: "", closed: false },
      sat: { open: "", close: "", closed: false },
      sun: { open: "", close: "", closed: false },
    }
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalonAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/salon-admin/view-all-salon-admins", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSalonAdmins(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch salon admins", error);
      }
    };
    fetchSalonAdmins();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      hours: {
        ...prev.hours,
        [day]: {
          ...prev.hours[day],
          [field]: field === 'closed' ? !prev.hours[day][field] : value
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/salon-admin/create-branch",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      // Reset form after successful submission
      setFormData({
        salonAdminId: "",
        branchName: "",
        businessName: "",
        address: "",
        phone: "",
        city: "",
        state: "",
        pincode: "",
        area: "",
        hours: {
          mon: { open: "", close: "", closed: false },
          tue: { open: "", close: "", closed: false },
          wed: { open: "", close: "", closed: false },
          thu: { open: "", close: "", closed: false },
          fri: { open: "", close: "", closed: false },
          sat: { open: "", close: "", closed: false },
          sun: { open: "", close: "", closed: false },
        }
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminLayout>
      <div className="mx-auto p-6 shadow-lg rounded-lg bg-white">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg shadow-blue-500/50 transform transition duration-300 hover:scale-105">
          Create ✂️ Salon Branch
        </h1>
        {message && <p className={`p-2 mb-4 rounded ${message.includes("success") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>{message}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Salon Admin Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salon Admin</label>
            <select
              name="salonAdminId"
              value={formData.salonAdminId}
              onChange={handleChange}
              className="w-full p-2 border rounded text-black bg-white"
              required
            >
              <option value="">Select Salon Admin</option>
              {salonAdmins.map((admin) => (
                <option key={admin._id} value={admin._id}>
                  {admin.ownerName} - {admin.email}
                </option>
              ))}
            </select>
          </div>

          {/* Branch Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Branch Name</label>
              <input
                type="text"
                name="branchName"
                placeholder="Branch Name"
                value={formData.branchName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
              <input
                type="text"
                name="businessName"
                placeholder="Business Name"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
              <input
                type="text"
                name="area"
                placeholder="Area"
                value={formData.area}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          {/* Address Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          {/* Opening Hours */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Opening Hours</label>
            {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => (
              <div key={day} className="grid grid-cols-4 gap-2 mb-2 items-center">
                <div className="font-medium capitalize">{day}:</div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.hours[day].closed}
                    onChange={() => handleHoursChange(day, 'closed', !formData.hours[day].closed)}
                    className="mr-2"
                  />
                  <label>Closed</label>
                </div>
                {!formData.hours[day].closed && (
                  <>
                    <input
                      type="time"
                      value={formData.hours[day].open}
                      onChange={(e) => handleHoursChange(day, 'open', e.target.value)}
                      className="p-1 border rounded"
                    />
                    <input
                      type="time"
                      value={formData.hours[day].close}
                      onChange={(e) => handleHoursChange(day, 'close', e.target.value)}
                      className="p-1 border rounded"
                    />
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white rounded hover:from-blue-600 hover:to-purple-700 transition-colors"
          >
            Create Branch
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default CreateBranch;