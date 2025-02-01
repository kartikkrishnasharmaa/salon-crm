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
    openingHours: {
      monday: { open: "", close: "" },
      tuesday: { open: "", close: "" },
      wednesday: { open: "", close: "" },
      thursday: { open: "", close: "" },
      friday: { open: "", close: "" },
      saturday: { open: "", close: "" },
      sunday: { open: "", close: "" },
    },
    priceRange: "Medium",
    salonImages: [],
    description: "",
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

  // ✅ **Opening Hours Change Handler**
  const handleOpeningHoursChange = (e, day) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      openingHours: {
        ...formData.openingHours,
        [day]: { ...formData.openingHours[day], [name]: value },
      },
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

  // ✅ **File Upload Handler**
  const handleFileChange = (e) => {
    setFormData({ ...formData, salonImages: [...e.target.files] });
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
        address: { street: "", city: "", state: "", zipCode: "", country: "" },
        salonName: "",
        salonType: "Unisex",
        businessEmail: "",
        businessPhone: "",
        businessWebsite: "",
        establishedYear: "",
        servicesOffered: [],
        openingHours: {
          monday: { open: "", close: "" },
          tuesday: { open: "", close: "" },
          wednesday: { open: "", close: "" },
          thursday: { open: "", close: "" },
          friday: { open: "", close: "" },
          saturday: { open: "", close: "" },
          sunday: { open: "", close: "" },
        },
        priceRange: "Medium",
        salonImages: [],
        description: "",
      });
    } catch (error) {
       // Error toast
       toast.error(error.response?.data?.message || "Something went wrong", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }

    setLoading(false);
  };

  return (
    <AdminLayout>
  <div className="flex justify-center items-center bg-gray-100 py-10 px-4">
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full sm:w-11/12 md:w-8/12 lg:w-6/12 xl:w-5/12">
      <h2 className="text-2xl font-bold text-center mb-6">
        Create Salon Admin
      </h2>

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
        <div className="flex flex-col gap-4">
          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name"
            value={formData.ownerName}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Address Fields */}
        <h3 className="text-lg font-semibold mb-2">Address</h3>
        {["street", "city", "state", "zipCode", "country"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={formData.address[field]}
            onChange={(e) => handleNestedChange(e, "address")}
            required
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
        ))}
        
        <input
          type="text"
          name="salonName"
          placeholder="Salon Name"
          value={formData.salonName}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Salon Type */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Salon Type</h3>
        <div className="space-x-6 mb-4">
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

        {/* Business Information */}
        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Business Email</label>
            <input
              type="email"
              name="businessEmail"
              value={formData.businessEmail}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">Business Phone</label>
            <input
              type="text"
              name="businessPhone"
              value={formData.businessPhone}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">Business Website</label>
            <input
              type="text"
              name="businessWebsite"
              value={formData.businessWebsite}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>

          <div>
            <label className="block font-semibold">Established Year</label>
            <input
              type="text"
              name="establishedYear"
              value={formData.establishedYear}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
        </div>

        {/* Opening Hours */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Opening Hours</h3>
        {Object.keys(formData.openingHours).map((day) => (
          <div key={day} className="space-x-4 mb-4">
            <label className="font-medium">{day.toUpperCase()}</label>
            <input
              type="time"
              name="open"
              value={formData.openingHours[day].open}
              onChange={(e) => handleOpeningHoursChange(e, day)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              name="close"
              value={formData.openingHours[day].close}
              onChange={(e) => handleOpeningHoursChange(e, day)}
              className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        {/* Services Offered */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Services Offered</h3>
        <div className="space-x-4">
          {["Haircut", "Facial", "Massage", "Manicure", "Pedicure"].map((service) => (
            <label key={service} className="inline-flex items-center">
              <input
                type="checkbox"
                value={service}
                checked={formData.servicesOffered.includes(service)}
                onChange={handleServiceChange}
                className="mr-2"
              />
              {service}
            </label>
          ))}
        </div>

        {/* File Upload */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Salon Images</h3>
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />

        {/* Description */}
        <h3 className="text-lg font-semibold mt-6 mb-2">Description</h3>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        ></textarea>

        {/* Submit Button */}
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