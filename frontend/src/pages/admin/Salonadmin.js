import React, { useState } from "react";
import axios from "../../api/axiosConfig";
import AdminLayout from "../../layouts/AdminLayout";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const Salonadmin = () => {
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    password: "",
    phone: "",
    address: {
      mapaddress: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    salonName: "",
    salonType: "Unisex",
    businessEmail: "",
    businessPhone: "",
    businessWebsite: "",
    establishedYear: "",
    servicesOffered: [],
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ **General Input Change Handler**
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ **Nested Input Change Handler (Address, Opening Hours)**
  const handleNestedChange = (e, parentKey) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [parentKey]: { ...formData[parentKey], [name]: value },
    });
  };

  // ✅ **Checkbox Handling for Services Offered**
  const handleServiceChange = (e) => {
    const { value, checked } = e.target;
    setFormData({
      ...formData,
      servicesOffered: checked
        ? [...formData.servicesOffered, value]
        : formData.servicesOffered.filter((service) => service !== value),
    });
  };

  // ✅ **Form Submission Handler**
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("salon/create-salon-admin", formData, {
        headers: { Authorization: token },
      });
// clear message after 5 seconds
toast.success(res.data.message);


      setFormData({
        ownerName: "",
        email: "",
        password: "",
        phone: "",
        address: {mapaddress:"" ,street: "", city: "", state: "", zipCode: "", country: "" },
        salonName: "",
        salonType: "Female",
        businessEmail: "",
        businessPhone: "",
        businessWebsite: "",
        establishedYear: "",
        servicesOffered: [],
      });
    } catch (error) {
       // Error toast
       toast.error(error.response?.data?.message || "Something went wrong", {
        autoClose: 5000,
      });
    }

    setLoading(false);
  };

  return (
    <AdminLayout>
 <div className="flex justify-center items-center bg-gray-100 py-10 px-4">
  <div className="bg-white p-8 rounded-2xl shadow-lg w-full sm:w-11/12 md:w-10/12 lg:w-8/12 xl:w-7/12">
  <h1 className="text-4xl font-extrabold text-center mb-6 
               text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600
               drop-shadow-lg shadow-blue-500/50 
               transform transition duration-300 hover:scale-105">
  Create New Salon ✂️ Admin</h1>

    {message && (
      <p
        className={`text-center text-sm mb-4 ${
          message.includes("success") ? "text-green-600" : "text-red-500"
        }`}
      >
        {message}
      </p>
    )}

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={formData.ownerName}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <h3 className="text-lg font-semibold mb-2">Address</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {["street", "mapaddress", "city", "state", "zipCode", "country"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={formData.address[field]}
            onChange={(e) => handleNestedChange(e, "address")}
            required
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ))}
      </div>

      <input
        type="text"
        name="salonName"
        placeholder="Business Name"
        value={formData.salonName}
        onChange={handleChange}
        required
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Salon Type</h3>
      <div className="flex flex-wrap gap-4">
        {["Men", "Women", "Unisex"].map((type) => (
          <label key={type} className="inline-flex items-center">
            <input
              type="radio"
              name="salonType"
              value={type}
              checked={formData.salonType === type}
              onChange={handleChange}
              className="mr-2"
            />
            {type}
          </label>
        ))}
      </div>
      <h3 className="text-lg font-semibold mt-6 mb-2">Services Offered</h3>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg shadow-md">
    {["Haircut", "Facial", "Massage", "Manicure", "Pedicure", "Hair Coloring", "Waxing", "Threading"].map((service) => (
      <label key={service} className="flex items-center bg-white p-3 rounded-lg shadow-sm border border-gray-300 cursor-pointer hover:bg-gray-100">
        <input
          type="checkbox"
          value={service}
          checked={formData.servicesOffered.includes(service)}
          onChange={handleServiceChange}
          className="mr-2 accent-blue-600"
        />
        {service}
      </label>
    ))}
  </div>
      <h3 className="text-lg font-semibold mt-6 mb-2">Business Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-semibold">Business Email</label>
          <input
            type="email"
            name="businessEmail"
            value={formData.businessEmail}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold">Business Phone</label>
          <input
            type="text"
            name="businessPhone"
            value={formData.businessPhone}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold">Business Website</label>
          <input
            type="text"
            name="businessWebsite"
            value={formData.businessWebsite}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold">Established Year</label>
          <input
            type="text"
            name="establishedYear"
            value={formData.establishedYear}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Salon Admin"}
      </button>
    </form>
  </div>
</div>

  <ToastContainer 
  position="top-right"
  autoClose={5000}
  
  />
</AdminLayout>

  );
};

export default Salonadmin;