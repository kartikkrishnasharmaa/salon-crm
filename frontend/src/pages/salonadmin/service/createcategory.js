import React, { useEffect, useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import axios from "../../../api/axiosConfig";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tabs from "rc-tabs";
import "rc-tabs/assets/index.css";

const CreateCategory = () => {
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryImage, setCategoryImage] = useState(null);

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

  useEffect(() => {
    if (!selectedBranch) return;
    fetchCategories();
  }, [selectedBranch]);

  const fetchCategories = async () => {
    try {
      if (!selectedBranch) {
        setError("⚠ No branch selected.");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) throw new Error("⚠ Unauthorized: No token found.");

      const response = await axios.get("/category/get-categories", {
        headers: { Authorization: `Bearer ${token}` },
        params: { branchId: selectedBranch },
      });

      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
      setError(
        error.response?.data?.message || "⚠ Failed to fetch categories."
      );
    }
  };

  const saveCategory = async () => {
    if (!categoryName.trim()) return setError("⚠ Category name is required.");
    if (!selectedBranch) return setError("⚠ Branch ID is required.");

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("⚠ Unauthorized: No token found.");

      await axios.post(
        "/category/create-category",
        {
          name: categoryName,
          parentCategoryId: parentCategory || null,
          branchId: selectedBranch,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCategoryName("");
      setParentCategory("");
      fetchCategories();
    } catch (error) {
      console.error("❌ Error creating category:", error);
      setError(error.response?.data?.message || "⚠ Failed to save category.");
    } finally {
      setLoading(false);
    }
  };

  const getParentCategoryName = (parentId) => {
    if (!parentId) return "None";
    const parent = categories.find((c) => c._id === parentId);
    return parent ? parent.name : "N/A";
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
            <div className="flex space-x-4">
              <button
                onClick={saveCategory}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <Link
                to="/salonadmin/view-services"
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Cancel
              </Link>
            </div>
          </div>

          <Tabs
            defaultActiveKey="1"
            className="custom-rc-tabs p-4"
            items={[
              {
                key: "1",
                label: "Info",
                children: (
                  <div className="space-y-6 p-4">
                    {error && <p className="text-red-500">{error}</p>}

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Title Name
                      </label>
                      <input
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Enter category name"
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Parent Category (Optional)
                      </label>
                      <select
                        value={parentCategory}
                        onChange={(e) => setParentCategory(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Parent Category</option>
                        {categories.length > 0 ? (
                          categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                              {cat.name}
                            </option>
                          ))
                        ) : (
                          <option disabled>No categories found</option>
                        )}
                      </select>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-medium text-gray-800 mb-3">
                        Category Image
                      </h3>

                      <div className="flex items-center space-x-4">
                        {/* Image Preview */}
                        {categoryImage ? (
                          <div className="relative">
                            <img
                              src={URL.createObjectURL(categoryImage)}
                              alt="Category Preview"
                              className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                            />
                            <button
                              onClick={() => setCategoryImage(null)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <div className="w-24 h-24 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-gray-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}

                        {/* Upload Button */}
                        <div>
                          <label className="cursor-pointer">
                            <span className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                              {categoryImage ? "Change Image" : "Upload Image"}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) =>
                                setCategoryImage(e.target.files[0])
                              }
                              className="hidden"
                            />
                          </label>
                          <p className="mt-1 text-sm text-gray-500">
                            JPEG, PNG (Max 2MB)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
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
