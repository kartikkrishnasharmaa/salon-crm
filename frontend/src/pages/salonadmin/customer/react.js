import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';

const ClientInfo = ({ client }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    appUser: '',
    city: '',
    name: '',
    fullName: '',
    isActive: true,
    gender: '',
    email: '',
    birthday: '',
    anniversary: '',
    country: '',
    countryCode: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Client Info</h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Customer ID */}
        <div>
          <label className="block mb-1">Customer ID</label>
          <input
            type="text"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            placeholder="Enter Customer ID"
          />
        </div>

        {/* App User */}
        <div>
          <label className="block mb-1">App User</label>
          <input
            type="text"
            name="appUser"
            value={formData.appUser}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            placeholder="Enter App User"
          />
        </div>

        {/* City Dropdown */}
        <div>
          <label className="block mb-1">City</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
          >
            <option value="">-- Select City --</option>
            <option value="Delhi">Delhi</option>
            <option value="Fatehpur">Fatehpur</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Lucknow">Lucknow</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            placeholder="Enter Name"
          />
        </div>

        {/* Full Name */}
        <div>
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            placeholder="Enter Full Name"
          />
        </div>

        {/* Client Status */}
        <div className="flex items-center gap-3 mt-6">
          <label className="block">Client Status:</label>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            {formData.isActive ? 'Active' : 'Inactive'}
          </label>
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-1">Gender</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === 'Male'}
                onChange={handleChange}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === 'Female'}
                onChange={handleChange}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </div>

        {/* Email with Icon */}
        <div className="relative">
          <label className="block mb-1">Email</label>
          <div className="flex items-center border rounded px-3">
            <FaEnvelope className="text-gray-500 mr-2" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="py-2 w-full focus:outline-none"
              placeholder="Enter Email"
            />
          </div>
        </div>

        {/* Birthday */}
        <div>
          <label className="block mb-1">Birthday</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        {/* Anniversary */}
        <div>
          <label className="block mb-1">Anniversary</label>
          <input
            type="date"
            name="anniversary"
            value={formData.anniversary}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
          />
        </div>

        {/* Country */}
        <div>
          <label className="block mb-1">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            placeholder="Enter Country"
          />
        </div>

        {/* Country Code */}
        <div>
          <label className="block mb-1">Country Code</label>
          <input
            type="text"
            name="countryCode"
            value={formData.countryCode}
            onChange={handleChange}
            className="border px-3 py-2 w-full rounded"
            placeholder="+91, +1, etc."
          />
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;