import React, { useEffect, useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import axios from "../../../api/axiosConfig";
import { useSelector } from "react-redux";

const CreateCategory = () => {
  const selectedBranch = useSelector((state) => state.branch.selectedBranch); // ✅ Redux se branch select
  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]); // ✅ Parent categories
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ Fetch categories when branch is selected
  useEffect(() => {
    if (!selectedBranch) return;
    fetchCategories();
  }, [selectedBranch]); // ✅ Runs when branch changes

  // ✅ Fetch categories function
  const fetchCategories = async () => {
    try {
        if (!selectedBranch) {
            setError("⚠ No branch selected.");
            return;
        }

        console.log("✅ Fetching categories for branch:", selectedBranch); // Debugging

        const token = localStorage.getItem("token");
        if (!token) throw new Error("⚠ Unauthorized: No token found.");

        const response = await axios.get("/category/get-categories", {
            headers: { Authorization: `Bearer ${token}` },
            params: { branchId: selectedBranch }, // ✅ Ensure branchId is sent
        });

        console.log("✅ API Response:", response.data); // Debugging
        setCategories(response.data.categories || []);
    } catch (error) {
        console.error("❌ Error fetching categories:", error);
        setError(error.response?.data?.message || "⚠ Failed to fetch categories.");
    }
};

const saveCategory = async () => {
  if (!categoryName.trim()) return setError("⚠ Category name is required.");
  if (!selectedBranch) return setError("⚠ Branch ID is required."); // ✅ Extra Check

  try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) throw new Error("⚠ Unauthorized: No token found.");

      await axios.post(
          "/category/create-category",
          {
              name: categoryName,
              parentCategoryId: parentCategory || null,
              branchId: selectedBranch, // ✅ Ensure branchId is included
          },
          { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("✅ Category Created Successfully");
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
  return (
    <SAAdminLayout>
      <div className="flex justify-center min-h-screen bg-gray-100 py-4 px-6">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Create Category</h1>

          {error && <p className="text-red-500">{error}</p>}

          {/* 📌 Category Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter category name"
            />
          </div>

          {/* 📌 Parent Category Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Parent Category (Optional)</label>
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

          {/* 📌 Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={saveCategory}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setCategoryName("");
                setParentCategory("");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </SAAdminLayout>
  );
};

export default CreateCategory;
