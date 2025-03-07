import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaEye, FaEdit, FaTrash, FaPlus, FaMinus } from "react-icons/fa";

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

    const updateStock = (id, amount) => {
        setProducts((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, stock: Math.max(0, product.stock + amount) } : product
            )
        );
    };

    return (
        <SAAdminLayout>
            <h1 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 drop-shadow-lg shadow-pink-500/50 transform transition duration-300 hover:scale-105 text-center">
                Manage Salon Products 🛍️
            </h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden border">
                    <thead className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left">Product Name</th>
                            <th className="px-6 py-3 text-left">Category</th>
                            <th className="px-6 py-3 text-left">Price</th>
                            <th className="px-6 py-3 text-center">Stock</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-100 border-b transition-all">
                                <td className="px-6 py-4 font-semibold">{product.name}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4">${product.price}</td>
                                <td className="px-6 py-4 flex items-center justify-center space-x-3">
                                    <button onClick={() => updateStock(product.id, -1)} className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition">
                                        <FaMinus />
                                    </button>
                                    <span className="px-6 py-2 bg-gray-200 rounded-lg text-lg font-bold text-center w-14">{product.stock}</span>
                                    <button onClick={() => updateStock(product.id, 1)} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-700 transition">
                                        <FaPlus />
                                    </button>
                                </td>
                                <td className="px-6 py-4 flex items-center justify-center space-x-6">
                                    <FaEye className="text-blue-500 cursor-pointer hover:scale-110 transition" title="View" />
                                    <FaEdit className="text-yellow-500 cursor-pointer hover:scale-110 transition" title="Edit" />
                                    <FaTrash className="text-red-500 cursor-pointer hover:scale-110 transition" title="Delete" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </SAAdminLayout>
    );
}

export default AllProducts;