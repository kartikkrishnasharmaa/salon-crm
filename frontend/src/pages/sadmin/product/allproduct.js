import React, { useEffect, useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import axios from "../../../api/axiosConfig";
import { useSelector } from 'react-redux';

const ViewProducts = () => {
    const selectedBranch = useSelector(state => state.branch.selectedBranch);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        console.log("🔹 Selected Branch for fetch product:", selectedBranch);

        const fetchProducts = async () => {
            const token = localStorage.getItem("token"); // Retrieve token

            if (!token) {
                setError("Unauthorized: No token found");
                setLoading(false);
                return;
            }

            if (!selectedBranch?._id) {
                setError("No branch selected");
                setLoading(false);
                return;
            }

            try {
                const apiUrl = `/product/get-products?branchId=${selectedBranch._id}`;
                console.log("Fetching products from:", apiUrl);

                const response = await axios.get(apiUrl, {
                    headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
                });

                setProducts(response.data.products);
            } catch (error) {
                console.error("Error fetching products:", error.response?.data || error.message);
                setError(error.response?.data?.message || "Failed to fetch products");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [selectedBranch]); // Re-run when branch changes

    return (
        <SAAdminLayout>
            <h2 className="text-3xl font-bold mb-6">View All Products</h2>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border">#</th>
                                <th className="py-2 px-4 border">Name</th>
                                <th className="py-2 px-4 border">Category</th>
                                <th className="py-2 px-4 border">Price</th>
                                <th className="py-2 px-4 border">Stock</th>
                                <th className="py-2 px-4 border">Branch</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product._id} className="border">
                                    <td className="py-2 px-4 border">{index + 1}</td>
                                    <td className="py-2 px-4 border">{product.name}</td>
                                    <td className="py-2 px-4 border">{product.category}</td>
                                    <td className="py-2 px-4 border">{product.price}</td>
                                    <td className="py-2 px-4 border">{product.stockQuantity}</td>
                                    <td className="py-2 px-4 border">{product.salonBranch?.branchName || "N/A"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </SAAdminLayout>
    );
};

export default ViewProducts;
