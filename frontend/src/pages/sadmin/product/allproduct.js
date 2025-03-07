import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

function AllProducts() {
    const [products, setProducts] = useState([
        { id: 1, name: "Shampoo", category: "Hair Care", price: 15, stock: 50 },
        { id: 2, name: "Conditioner", category: "Hair Care", price: 12, stock: 40 },
        { id: 3, name: "Face Wash", category: "Skin Care", price: 10, stock: 30 },
        { id: 4, name: "Body Lotion", category: "Body Care", price: 20, stock: 25 },
    ]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("/products");
                setProducts(response.data.length ? response.data : products);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []);

    return (
        <SAAdminLayout>
            <h1 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg shadow-blue-500/50 transform transition duration-300 hover:scale-105">
                All Products
            </h1>
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    <tr>
                        <th className="px-6 py-3 text-left">Product Name</th>
                        <th className="px-6 py-3 text-left">Category</th>
                        <th className="px-6 py-3 text-left">Price</th>
                        <th className="px-6 py-3 text-left">Stock</th>
                        <th className="px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="text-gray-700">
                    {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-100 border-b transition-all">
                            <td className="px-6 py-4">{product.name}</td>
                            <td className="px-6 py-4">{product.category}</td>
                            <td className="px-6 py-4">${product.price}</td>
                            <td className="px-6 py-4">{product.stock}</td>
                            <td className="px-6 py-4 flex space-x-4">
                                <FaEye className="text-blue-500 cursor-pointer" title="View" />
                                <FaEdit className="text-yellow-500 cursor-pointer" title="Edit" />
                                <FaTrash className="text-red-500 cursor-pointer" title="Delete" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </SAAdminLayout>
    );
}

export default AllProducts;