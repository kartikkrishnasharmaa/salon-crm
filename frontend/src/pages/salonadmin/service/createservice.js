import React, { useState, useEffect } from "react";
import { FaRupeeSign, FaPercentage } from "react-icons/fa";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { Link } from "react-router-dom";

const categories = {
  Hair: ["Haircut", "Hair Coloring", "Hair Treatment"],
  Skin: ["Facial", "Peel Treatment", "Skin Rejuvenation"],
  Nails: ["Manicure", "Pedicure", "Nail Art"],
  Spa: ["Massage", "Aromatherapy", "Hot Stone Therapy"],
  Makeup: ["Bridal Makeup", "Party Makeup", "Editorial Makeup"],
  Other: ["Custom Service"]
};

const businessUnits = ["Spa", "Salon", "Spa and Salon", "Ayurveda Gram"];
const gstCategories = [
  { id: 1, name: "GST 5%", cgst: 2.5, sgst: 2.5 },
  { id: 2, name: "GST 12%", cgst: 6, sgst: 6 },
  { id: 3, name: "GST 18%", cgst: 9, sgst: 9 },
  { id: 4, name: "GST 28%", cgst: 14, sgst: 14 },
  { id: 5, name: "Custom" }
];

const SAcreateservice = () => {
  const [formData, setFormData] = useState({
    serviceName: "",
    serviceCode: "",
    category: "Hair",
    subCategory: categories["Hair"][0],
    businessUnit: "Spa",
    description: "",
    memberPrice: "",
    nonMemberPrice: "",
    duration: "",
    hsnCode: "",
    gstCategory: gstCategories[0].name,
    cgst: gstCategories[0].cgst,
    sgst: gstCategories[0].sgst,
    memberPriceWithTax: "",
    nonMemberPriceWithTax: ""
  });

  const [message, setMessage] = useState("");
  const [isCustomGST, setIsCustomGST] = useState(false);

  useEffect(() => {
    if (formData.serviceName.length > 0) {
      const code = formData.serviceName
        .replace(/\s+/g, '-')
        .toUpperCase()
        .substring(0, 10);
      setFormData(prev => ({ ...prev, serviceCode: code }));
    }
  }, [formData.serviceName]);

  useEffect(() => {
    const calculatePriceWithTax = (price) => {
      const taxAmount = (parseFloat(price || 0) * (parseFloat(formData.cgst || 0) + parseFloat(formData.sgst || 0))) / 100;
      return (parseFloat(price || 0) + taxAmount).toFixed(2);
    };

    setFormData(prev => ({
      ...prev,
      memberPriceWithTax: calculatePriceWithTax(prev.memberPrice),
      nonMemberPriceWithTax: calculatePriceWithTax(prev.nonMemberPrice)
    }));
  }, [formData.memberPrice, formData.nonMemberPrice, formData.cgst, formData.sgst]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGSTChange = (e) => {
    const selectedGST = gstCategories.find(g => g.name === e.target.value);
    setFormData(prev => ({
      ...prev,
      gstCategory: selectedGST.name,
      cgst: selectedGST.cgst,
      sgst: selectedGST.sgst
    }));
    setIsCustomGST(selectedGST.name === "Custom");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Service Data:", formData);
    setMessage("Service created successfully!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <SAAdminLayout>
      <div className=" mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
          Create New Service
        </h1>
        
        {message && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Service Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name*</label>
            <input
              type="text"
              name="serviceName"
              value={formData.serviceName}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Code</label>
            <input
              type="text"
              name="serviceCode"
              value={formData.serviceCode}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-50"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category*</label>
            <select
              name="category"
              value={formData.category}
              onChange={(e) => {
                handleChange(e);
                setFormData(prev => ({
                  ...prev,
                  subCategory: categories[e.target.value][0]
                }));
              }}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sub-Category*</label>
            <select
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              {categories[formData.category].map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Unit*</label>
            <select
              name="businessUnit"
              value={formData.businessUnit}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              {businessUnits.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Pricing Information */}
          <div className="pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Member Price (₹)*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaRupeeSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="memberPrice"
                  value={formData.memberPrice}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Non-Member Price (₹)*</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaRupeeSign className="text-gray-400" />
                </div>
                <input
                  type="number"
                  name="nonMemberPrice"
                  value={formData.nonMemberPrice}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration*</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 30 mins, 1 hour"
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">HSN Code*</label>
              <input
                type="text"
                name="hsnCode"
                value={formData.hsnCode}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST Category*</label>
              <select
                name="gstCategory"
                value={formData.gstCategory}
                onChange={handleGSTChange}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                required
              >
                {gstCategories.map((gst) => (
                  <option key={gst.id} value={gst.name}>{gst.name}</option>
                ))}
              </select>
            </div>

            {isCustomGST && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CGST (%)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPercentage className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="cgst"
                      value={formData.cgst}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SGST (%)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPercentage className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="sgst"
                      value={formData.sgst}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Member Price with Tax (₹)</label>
              <input
                type="text"
                value={formData.memberPriceWithTax}
                readOnly
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Non-Member Price with Tax (₹)</label>
              <input
                type="text"
                value={formData.nonMemberPriceWithTax}
                readOnly
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-100"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t">
            <Link
            to=""
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
            >
              Save Service
            </button>
          </div>
        </form>
      </div>
    </SAAdminLayout>
  );
};

export default SAcreateservice;