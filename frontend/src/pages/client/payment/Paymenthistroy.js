import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientLayout from "../../../layouts/ClientLayout";

const PaymentPage = () => {
  
    return (
        <ClientLayout>
            <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg shadow-blue-500/50 transform transition duration-300 hover:scale-105">
                Payment History
            </h1>



            {/* Payment History Table */}
                <div className="overflow-x-auto">
                    <h2 className="text-xl font-bold text-blue-600 mt-4">Payment Details</h2>
                    <table className="min-w-full border-collapse border border-gray-300 mt-2">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Date</th>
                                <th className="border p-2">Time</th>
                                <th className="border p-2">Type</th>
                                <th className="border p-2">Amount</th>
                                <th className="border p-2">Service</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                                    <tr  className="text-center">
                                        <td className="border p-2">5 march</td>
                                        <td className="border p-2">7979</td>
                                        <td className={`border p-2 `}>999</td>
                                        <td className="border p-2">₹99</td>
                                        <td className="border p-2">5465654</td>
                                    </tr>
                               
                                <tr>
                                    <td colSpan="5" className="p-4 text-center">No payment records found</td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </ClientLayout>
    );
};

export default PaymentPage;


