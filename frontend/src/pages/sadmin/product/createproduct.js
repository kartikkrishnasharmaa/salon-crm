import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";

function AllProducts() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [message, setMessage] = useState("");

  // 🔹 Redux से `branchId` ले रहे हैं
  const branchId = useSelector((state) => state.branch.selectedBranch);

  // 📸 Handle Image Selection & Preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    setPreviewImages(files.map(file => URL.createObjectURL(file))); // Preview URLs
  };

  // 🚀 Handle Product Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("branchId", branchId);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stockQuantity", stockQuantity);
      formData.append("description", description);
      formData.append("brand", brand);
      images.forEach((image) => formData.append("images", image));

      const response = await axios.post("/product/create-product", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.message);
      // Reset form after successful submission
      setName("");
      setPrice("");
      setCategory("");
      setStockQuantity("");
      setDescription("");
      setBrand("");
      setImages([]);
      setPreviewImages([]);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <SAAdminLayout>
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add 🛒 Product
        </h1>
        {message && <p className="text-red-500 text-center mb-4">{message}</p>}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          {/* 🔹 Branch ID (Auto-filled from Redux) */}
          <p className="text-gray-600 text-sm">Branch: {branchId || "No branch selected"}</p>

          {/* 🔹 Product Name */}
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 🔹 Price */}
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 🔹 Category Selection */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            <option value="Hair Care">Hair Care</option>
            <option value="Skin Care">Skin Care</option>
            <option value="Nail Care">Nail Care</option>
            <option value="Other">Other</option>
          </select>

          {/* 🔹 Stock Quantity */}
          <input
            type="number"
            placeholder="Stock Quantity"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 🔹 Brand */}
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 🔹 Description */}
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          {/* 🔹 Image Upload */}
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* 🔹 Image Previews */}
          {previewImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {previewImages.map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-md"
                />
              ))}
            </div>
          )}

          {/* 🔹 Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-md hover:shadow-md"
          >
            Add Product
          </button>
        </form>
      </div>
    </SAAdminLayout>
  );
}

export default AllProducts;
