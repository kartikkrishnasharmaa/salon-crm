import React, { useEffect, useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import axios from "../../../api/axiosConfig";
import { useSelector } from "react-redux";

const ViewOrders = () => {
    const selectedBranch = useSelector(state => state.branch.selectedBranch);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
    
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");
    
            if (!token) {
                setError("Unauthorized: No token found");
                setLoading(false);
                return;
            }
    
            try {
                const response = await axios.get(`/order/fetch-orders?branchId=${selectedBranch}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
    
                console.log("API Response:", response.data); // Debugging
                setOrders(response.data.orders);
            } catch (error) {
                console.error("Error fetching orders:", error.response?.data?.message);
                setError(error.response?.data?.message || "Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };
    
        fetchOrders();
    }, [selectedBranch]);
    
    // ✅ Function to Download Order Receipt PDF
    const downloadReceipt = async (orderId) => {
        const token = localStorage.getItem("token");
    
        if (!token) {
            setError("Unauthorized: No token found");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`/order/generate-receipt${orderId}/receipt`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error("Failed to download receipt");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            
            // Create download link
            const a = document.createElement("a");
            a.href = url;
            a.download = `Receipt_${orderId}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error("Error downloading receipt:", error);
            alert("Error downloading receipt. Please try again.");
        }
    };

    return (
        <SAAdminLayout>
            <h2 className="text-3xl font-bold mb-6">View All Orders</h2>

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
                                <th className="py-2 px-4 border">Customer</th>
                                <th className="py-2 px-4 border">Service</th>
                                <th className="py-2 px-4 border">Employee</th>
                                <th className="py-2 px-4 border">Price</th>
                                <th className="py-2 px-4 border">Payment Method</th>
                                <th className="py-2 px-4 border">Payment Status</th>
                                <th className="py-2 px-4 border">Date</th>
                                <th className="py-2 px-4 border">Action</th> {/* 🔹 New Column for PDF Button */}

                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order._id} className="border">
                                    <td className="py-2 px-4 border">{index + 1}</td>
                                    <td className="py-2 px-4 border">{order.customerId?.name || "N/A"}</td>
                                    <td className="py-2 px-4 border">{order.serviceId?.name || "N/A"}</td>
                                    <td className="py-2 px-4 border">{order.employeeId?.name || "N/A"}</td>
                                    <td className="py-2 px-4 border">₹{order.price}</td>
                                    <td className="py-2 px-4 border">{order.paymentMethod}</td>
                                    <td className="py-2 px-4 border">{order.paymentStatus}</td>
                                    <td className="py-2 px-4 border">{new Date(order.createdAt).toLocaleString()}</td>
                                    <td className="py-2 px-4 border">
                                        {/* 🔹 PDF Download Button */}
                                        <button 
                                            onClick={() => downloadReceipt(order._id)}
                                            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                        >
                                            Download Receipt
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </SAAdminLayout>
    );
};

export default ViewOrders;
