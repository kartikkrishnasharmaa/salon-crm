import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";

function AllProducts() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState("");

    const handleImageChange = (e) => {
        setImages([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("name", name);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("stock", stock);
            formData.append("description", description);
            images.forEach((image) => formData.append("images", image));

            const response = await axios.post("/products/create", formData, {
                headers: { Authorization: token, "Content-Type": "multipart/form-data" },
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <SAAdminLayout>
            <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Add 🛒 Product</h1>
                {message && <p className="text-red-500 text-center mb-4">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                    <input type="file" multiple onChange={handleImageChange} className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <button type="submit" className="w-full p-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-md hover:shadow-md">Add Product</button>
                </form>
            </div>
        </SAAdminLayout>
    );
}

export default AllProducts;
