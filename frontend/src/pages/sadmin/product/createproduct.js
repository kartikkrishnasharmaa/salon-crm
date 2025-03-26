import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaBox } from "react-icons/fa";

function AllProducts() {
  // 🏷️ Product Form State
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]); // For dropdown
  const [stockQuantity, setStockQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [inclusiveTax, setInclusiveTax] = useState(false);
  const [mrp, setMrp] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [tax, setTax] = useState("");
  const [measurement, setMeasurement] = useState("");
  const [isRetail, setIsRetail] = useState(false);
  const [isConsumable, setIsConsumable] = useState(false);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const measurementUnits = [
    "kg", "g", "mg", 
    "l", "ml", 
    "pcs", "pair", 
    "box", "packet",
    "m", "cm", "mm"
  ];
  // 🏪 Get Branch ID from Redux
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

  // 📦 Fetch Categories when branch changes
  useEffect(() => {
    if (selectedBranch) {
      fetchCategories();
    }
  }, [selectedBranch]);

  // 🔄 Fetch Categories from API
  const fetchCategories = async () => {
    try {
      console.log("Fetching categories for branch:", selectedBranch);
      const token = localStorage.getItem("token");
      const response = await axios.get("/category/get-categories", {
        headers: { Authorization: `Bearer ${token}` },
        params: { branchId: selectedBranch },
      });
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(error.response?.data?.message || "Failed to fetch categories");
    }
  };

  // 📸 Handle Image Upload & Preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

  // 🚀 Submit Product Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!selectedBranch || !name || !category || !price || !stockQuantity) {
        throw new Error("Please fill all required fields");
      }

      const token = localStorage.getItem("token");
      const formData = new FormData();

      // ✨ Append all fields
      formData.append("branchId", selectedBranch);
      formData.append("name", name);
      formData.append("category", category);
      formData.append("price", price);
      formData.append("stockQuantity", stockQuantity);
      if (description) formData.append("description", description);
      if (brand) formData.append("brand", brand);
      formData.append("inclusiveTax", inclusiveTax);
      if (mrp) formData.append("mrp", mrp);
      if (hsnCode) formData.append("hsnCode", hsnCode);
      if (tax) formData.append("tax", tax);
      if (measurement) formData.append("measurement", measurement);
      formData.append("isRetail", isRetail);
      formData.append("isConsumable", isConsumable);
      images.forEach(image => formData.append("images", image));

      const response = await axios.post("/product/create-product", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Product created successfully!");
      resetForm();
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    }
  };

  // 🔄 Reset Form
  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setStockQuantity("");
    setDescription("");
    setBrand("");
    setInclusiveTax(false);
    setMrp("");
    setHsnCode("");
    setTax("");
    setMeasurement("");
    setIsRetail(false);
    setIsConsumable(false);
    setImages([]);
    setPreviewImages([]);
  };

  return (
    <SAAdminLayout>
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <div className="flex justify-center mb-4">
          <FaBox className="text-4xl text-blue-500" />
        </div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Product
        </h1>

        {/* 🚨 Error Messages */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {message && (
          <p className={`text-center mb-4 ${
            message.includes("success") ? "text-green-500" : "text-red-500"
          }`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 🔹 Branch Info */}
 
          {/* 🔹 Required Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name*</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category*</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price*</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Stock Quantity*</label>
              <input
                type="number"
                value={stockQuantity}
                onChange={(e) => setStockQuantity(e.target.value)}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          {/* 🔹 Optional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">HSN Code</label>
              <input
                type="text"
                value={hsnCode}
                onChange={(e) => setHsnCode(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">MRP</label>
              <input
                type="number"
                value={mrp}
                onChange={(e) => setMrp(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tax (%)</label>
              <input
                type="number"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* 🔹 Checkboxes */}
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={inclusiveTax}
                onChange={(e) => setInclusiveTax(e.target.checked)}
              />
              <span>Price Inclusive of Tax</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isRetail}
                onChange={(e) => setIsRetail(e.target.checked)}
              />
              <span>Retail Product</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isConsumable}
                onChange={(e) => setIsConsumable(e.target.checked)}
              />
              <span>Consumable</span>
            </label>
          </div>

          {/* 🔹 Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows={3}
            />
          </div>

          {/* 🔹 Measurement */}
     {/* 🔹 Measurement - Updated to Dropdown */}
     <div>
          <label className="block text-sm font-medium text-gray-700">Measurement Unit</label>
          <select
            value={measurement}
            onChange={(e) => setMeasurement(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select Unit</option>
            {measurementUnits.map((unit) => (
              <option key={unit} value={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>

          {/* 🔹 Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* 🖼️ Image Previews */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {previewImages.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt="Preview"
                  className="w-full h-24 object-cover rounded-md"
                />
              ))}
            </div>
          )}

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>
    </SAAdminLayout>
  );
}

export default AllProducts;