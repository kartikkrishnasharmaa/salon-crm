import React, { useEffect, useState, useCallback } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import axios from "../../../api/axiosConfig";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tabs from "rc-tabs";
import "rc-tabs/assets/index.css";

const CreateCategory = () => {
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  const [formData, setFormData] = useState({
    name: "",
    parentCategory: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({
    name: "",
    branch: "",
    general: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const tabsStyle = `
    .custom-rc-tabs {
      margin: 0 16px;
    }
    .custom-rc-tabs .rc-tabs-tab {
      padding: 8px 16px;
      margin: 0 8px !important;
      border-radius: 6px 6px 0 0;
      transition: all 0.3s;
      border: none !important;
    }
    .custom-rc-tabs .rc-tabs-tab:first-child {
      margin-left: 0 !important;
    }
    .custom-rc-tabs .rc-tabs-tab-active {
      background: #1890ff;
      color: white !important;
    }
    .custom-rc-tabs .rc-tabs-tab:not(.rc-tabs-tab-active) {
      background: #f5f5f5;
      color: #666;
    }
    .custom-rc-tabs .rc-tabs-ink-bar {
      background: #1890ff;
      height: 3px !important;
    }
    .custom-rc-tabs .rc-tabs-nav {
      margin-bottom: 16px;
      border-bottom: none !important;
    }
  `;
  const fetchCategories = useCallback(async () => {
    if (!selectedBranch) {
      setErrors((prev) => ({ ...prev, branch: "⚠ Please select a branch first" }));
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const response = await axios.get("/category/get-categories", {
        headers: { Authorization: `Bearer ${token}` },
        params: { branchId: selectedBranch },
      });

      setCategories(response.data.categories || []);
      setErrors((prev) => ({ ...prev, branch: "" }));
    } catch (error) {
      console.error("Error fetching categories:", error);
      setErrors((prev) => ({
        ...prev,
        general: error.response?.data?.message || "Failed to fetch categories.",
      }));
    }
  }, [selectedBranch]);

  useEffect(() => {
    fetchCategories();
  }, [selectedBranch, fetchCategories]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        general: "Image size should be less than 2MB",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));
    setPreviewImage(URL.createObjectURL(file));
    setErrors((prev) => ({ ...prev, general: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
      isValid = false;
    }

    if (!selectedBranch) {
      newErrors.branch = "Please select a branch first";
      isValid = false;
    }

    // Only update errors if there are changes
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset general errors
    setErrors((prev) => ({ ...prev, general: "" }));

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("branchId", selectedBranch);
      
      if (formData.parentCategory) {
        formDataToSend.append("parentCategory", formData.parentCategory);
      }
      
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await axios.post("/service/create-service-category", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Reset form on success
      setFormData({
        name: "",
        parentCategory: "",
        image: null,
      });
      setPreviewImage("");
      fetchCategories();

      // Show success message
      setErrors((prev) => ({ ...prev, general: "Category created successfully!" }));

    } catch (error) {
      console.error("Error creating category:", error);
      let errorMessage = "Failed to create category";
      
      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = error.response.data.message || "Validation failed";
        } else if (error.response.status === 404) {
          errorMessage = error.response.data.message || "Branch or parent category not found";
        } else if (error.response.status === 409) {
          errorMessage = "Category with this name already exists in the branch";
        }
      }
      
      setErrors((prev) => ({
        ...prev,
        general: errorMessage,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SAAdminLayout>
      <style>{tabsStyle}</style>
      <div className="flex justify-center min-h-screen bg-gray-100 py-4 px-4">
        <div className="bg-white shadow-lg rounded-lg w-full p-8 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Add Service Category
            </h1>
          </div>

          {/* Error Messages */}
          {errors.general && (
            <div className={`p-4 rounded-md ${
              errors.general.includes("success") 
                ? "bg-green-100 border-l-4 border-green-500 text-green-700"
                : "bg-red-100 border-l-4 border-red-500 text-red-700"
            }`}>
              <p>{errors.general}</p>
            </div>
          )}
          
          {errors.branch && (
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
              <p>{errors.branch}</p>
            </div>
          )}

          <Tabs
            defaultActiveKey="1"
            className="custom-rc-tabs p-4"
            items={[
              {
                key: "1",
                label: "Info",
                children: (
                  <form onSubmit={handleSubmit} className="space-y-6 p-4">
                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-4 py-2 rounded-md ${
                          isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                        } text-white`}
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Saving...
                          </span>
                        ) : (
                          "Save"
                        )}
                      </button>
                      <Link
                        to="/salonadmin/view-services"
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Cancel
                      </Link>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`mt-1 block w-full p-2 border ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } rounded-md`}
                        placeholder="Enter category name"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Parent Category (Optional)
                      </label>
                      <select
                        name="parentCategory"
                        value={formData.parentCategory}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Parent Category</option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat._id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">
                        Category Image
                      </h3>
                      <div className="flex items-center space-x-4">
                        {/* Image preview and upload UI remains same */}
                        {/* ... */}
                      </div>
                    </div>
                  </form>
                ),
              },
            ]}
          />
        </div>
      </div>
    </SAAdminLayout>
  );
};

export default CreateCategory;