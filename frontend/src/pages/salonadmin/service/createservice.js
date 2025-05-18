import React, { useState, useEffect, useCallback } from "react";
import { FaRupeeSign, FaPercentage, FaClock } from "react-icons/fa";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../api/axiosConfig";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import BranchSelector from "../../../components/BranchSelector";

const businessUnits = ["Spa", "Salon", "Spa and Salon", "Ayurveda Gram"];
const gstCategories = [
  { id: 1, name: "GST 5%", cgst: 2.5, sgst: 2.5 },
  { id: 2, name: "GST 12%", cgst: 6, sgst: 6 },
  { id: 3, name: "GST 18%", cgst: 9, sgst: 9 },
  { id: 4, name: "GST 28%", cgst: 14, sgst: 14 },
  { id: 5, name: "Custom" }
];

const SAcreateservice = () => {
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [formData, setFormData] = useState({
    branchId: selectedBranch,
    serviceName: "",
    serviceCode: "",
    category: "",
    subCategory: "",
    businessUnit: "Spa",
    description: "",
    memberPrice: "",
    nonMemberPrice: "",
    duration: "",
    hsnCode: "",
    gstCategory: gstCategories[0].name,
    cgst: gstCategories[0].cgst,
    sgst: gstCategories[0].sgst,
    startTime: "09:00",
    endTime: "21:00"
  });

  const [errors, setErrors] = useState({
    branch: "",
    serviceName: "",
    category: "",
    subCategory: "",
    businessUnit: "",
    memberPrice: "",
    nonMemberPrice: "",
    duration: "",
    hsnCode: "",
    gstCategory: ""
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isCustomGST, setIsCustomGST] = useState(false);

  const fetchCategories = useCallback(async () => {
    if (!selectedBranch) {
      setErrors(prev => ({ ...prev, branch: "Please select a branch first" }));
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const response = await axios.get("/service/get-service-categories", {
        headers: { Authorization: `Bearer ${token}` },
        params: { branchId: selectedBranch },
      });

      // Filter only parent categories (where parentCategory is null)
      const parentCategories = response.data.categories.filter(cat => cat.parentCategory === null);
      setCategories(parentCategories || []);
      setErrors(prev => ({ ...prev, branch: "" }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error(error.response?.data?.message || "Failed to fetch categories");
    }
  }, [selectedBranch]);

  useEffect(() => {
    fetchCategories();
  }, [selectedBranch, fetchCategories]);

  useEffect(() => {
    if (!selectedBranch) {
      setErrors(prev => ({ ...prev, branch: "Please select a branch first" }));
    } else {
      setFormData(prev => ({ ...prev, branchId: selectedBranch }));
      setErrors(prev => ({ ...prev, branch: "" }));
    }
  }, [selectedBranch]);

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
    // When category changes, update available subcategories
    if (formData.category) {
      const selectedCat = categories.find(cat => cat._id === formData.category);
      if (selectedCat && selectedCat.children) {
        setSubCategories(selectedCat.children || []);
        // Reset subCategory when category changes
        setFormData(prev => ({ ...prev, subCategory: "" }));
      }
    }
  }, [formData.category, categories]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
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

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.branchId) {
      newErrors.branch = "Branch selection is required";
      isValid = false;
    }
    if (!formData.serviceName.trim()) {
      newErrors.serviceName = "Service name is required";
      isValid = false;
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
      isValid = false;
    }
    if (!formData.subCategory) {
      newErrors.subCategory = "Sub-category is required";
      isValid = false;
    }
    if (!formData.businessUnit) {
      newErrors.businessUnit = "Business unit is required";
      isValid = false;
    }
    if (!formData.memberPrice || isNaN(formData.memberPrice)) {
      newErrors.memberPrice = "Valid member price is required";
      isValid = false;
    }
    if (!formData.nonMemberPrice || isNaN(formData.nonMemberPrice)) {
      newErrors.nonMemberPrice = "Valid non-member price is required";
      isValid = false;
    }
    if (!formData.duration) {
      newErrors.duration = "Duration is required";
      isValid = false;
    }
    if (!formData.hsnCode) {
      newErrors.hsnCode = "HSN code is required";
      isValid = false;
    }
    if (!formData.gstCategory) {
      newErrors.gstCategory = "GST category is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fill all required fields correctly");
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const response = await axios.post("/service/create-service", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      toast.success("Service created successfully!");
      navigate("/salonadmin/view-services");
    } catch (error) {
      console.error("Service creation error:", error);
      let errorMessage = "Failed to create service";
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || "Validation failed";
        } else if (error.response.status === 404) {
          errorMessage = "Branch not found or unauthorized";
        } else if (error.response.data?.errors) {
          // Handle mongoose validation errors
          const firstError = Object.values(error.response.data.errors)[0];
          errorMessage = firstError.message || "Validation error";
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SAAdminLayout>
      <div className="mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-200">
        <div className="w-full">
          <label className="text-sm text-gray-600 block mb-1 text-start">
            Select Branch
          </label>
          <BranchSelector />
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Create New Service
          </h1>
          <Link 
            to="/salonadmin/view-services"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Services
          </Link>
        </div>

        {errors.branch && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-700 rounded-lg">
            {errors.branch}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                  errors.serviceName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., Haircut, Facial"
              />
              {errors.serviceName && (
                <p className="mt-1 text-sm text-red-500">{errors.serviceName}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service Code
              </label>
              <input
                type="text"
                name="serviceCode"
                value={formData.serviceCode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-50"
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category<span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                  errors.category ? "border-red-500" : "border-gray-300"
                }`}
                disabled={categories.length === 0}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
              {categories.length === 0 && (
                <p className="mt-1 text-sm text-yellow-600">
                  No categories found. Please create categories first.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sub-Category<span className="text-red-500">*</span>
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                  errors.subCategory ? "border-red-500" : "border-gray-300"
                }`}
                disabled={!formData.category || subCategories.length === 0}
              >
                <option value="">Select Sub-Category</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>{sub.name}</option>
                ))}
              </select>
              {errors.subCategory && (
                <p className="mt-1 text-sm text-red-500">{errors.subCategory}</p>
              )}
              {formData.category && subCategories.length === 0 && (
                <p className="mt-1 text-sm text-yellow-600">
                  No sub-categories found for this category.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Business Unit<span className="text-red-500">*</span>
              </label>
              <select
                name="businessUnit"
                value={formData.businessUnit}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                  errors.businessUnit ? "border-red-500" : "border-gray-300"
                }`}
              >
                {businessUnits.map((unit) => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              {errors.businessUnit && (
                <p className="mt-1 text-sm text-red-500">{errors.businessUnit}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Service details..."
              />
            </div>
          </div>

          {/* Pricing Information */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Pricing & Tax Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Member Price (₹)<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRupeeSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="memberPrice"
                    value={formData.memberPrice}
                    onChange={handleChange}
                    className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                      errors.memberPrice ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
                {errors.memberPrice && (
                  <p className="mt-1 text-sm text-red-500">{errors.memberPrice}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Non-Member Price (₹)<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaRupeeSign className="text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="nonMemberPrice"
                    value={formData.nonMemberPrice}
                    onChange={handleChange}
                    className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                      errors.nonMemberPrice ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
                {errors.nonMemberPrice && (
                  <p className="mt-1 text-sm text-red-500">{errors.nonMemberPrice}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration<span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaClock className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className={`w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                      errors.duration ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="e.g., 30 mins, 1 hour"
                  />
                </div>
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  HSN Code<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="hsnCode"
                  value={formData.hsnCode}
                  onChange={handleChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                    errors.hsnCode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="e.g., 9966"
                />
                {errors.hsnCode && (
                  <p className="mt-1 text-sm text-red-500">{errors.hsnCode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GST Category<span className="text-red-500">*</span>
                </label>
                <select
                  name="gstCategory"
                  value={formData.gstCategory}
                  onChange={handleGSTChange}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 ${
                    errors.gstCategory ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  {gstCategories.map((gst) => (
                    <option key={gst.id} value={gst.name}>{gst.name}</option>
                  ))}
                </select>
                {errors.gstCategory && (
                  <p className="mt-1 text-sm text-red-500">{errors.gstCategory}</p>
                )}
              </div>

              {isCustomGST && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CGST (%)<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPercentage className="text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="cgst"
                        value={formData.cgst}
                        onChange={handleChange}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      SGST (%)<span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPercentage className="text-gray-400" />
                      </div>
                      <input
                        type="number"
                        name="sgst"
                        value={formData.sgst}
                        onChange={handleChange}
                        className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Member Price with Tax (₹)
                </label>
                <input
                  type="text"
                  value={formData.memberPriceWithTax}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Non-Member Price with Tax (₹)
                </label>
                <input
                  type="text"
                  value={formData.nonMemberPriceWithTax}
                  readOnly
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Service Timing */}
          <div className="pt-6 border-t">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">Service Timing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link
              to="/salonadmin/view-services"
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading || categories.length === 0}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center min-w-32"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save Service"
              )}
            </button>
          </div>
        </form>
      </div>
    </SAAdminLayout>
  );
};

export default SAcreateservice;