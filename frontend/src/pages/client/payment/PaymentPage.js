import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientLayout from "../../../layouts/ClientLayout";

const PaymentPage = () => {
    const [clients, setClients] = useState([]);
    const [selectedClient, setSelectedClient] = useState("");
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        // Fetch clients from API
        const fetchClients = async () => {
            try {
                const response = await axios.get("/clients");
                setClients(response.data);
            } catch (error) {
                toast.error("Failed to load clients");
            }
        };
        fetchClients();
    }, []);

    const handleClientChange = async (event) => {
        const clientId = event.target.value;
        setSelectedClient(clientId);

        if (!clientId) {
            setPayments([]);
            return;
        }

        try {
            const response = await axios.get(`/payments?clientId=${clientId}`);
            setPayments(response.data);
        } catch (error) {
            toast.error("Failed to load payments");
        }
    };

    return (
        <ClientLayout>
            <h1 className="text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg shadow-blue-500/50 transform transition duration-300 hover:scale-105">
                Payment Management
            </h1>

            {/* Client Selection Dropdown */}
            <div className="mb-6 text-center">
                <select onChange={handleClientChange} value={selectedClient} className="p-2 border rounded-md">
                    <option value="">Select Client</option>
                    {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                    ))}
                </select>
            </div>

            {/* Payment Details Sections */}
            {selectedClient && (
                <div className="overflow-x-auto">
                    {/* Advance Payments Section */}
                    <h2 className="text-xl font-bold text-green-600 mt-4">Advance Payments</h2>
                    <table className="min-w-full border-collapse border border-gray-300 mt-2">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Date</th>
                                <th className="border p-2">Time</th>
                                <th className="border p-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.filter(payment => payment.type === 'Advance').length > 0 ? (
                                payments.filter(payment => payment.type === 'Advance').map(payment => (
                                    <tr key={payment.id} className="text-center">
                                        <td className="border p-2">{payment.date}</td>
                                        <td className="border p-2">{payment.time}</td>
                                        <td className="border p-2 text-green-500">₹{payment.amount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-4 text-center">No advance payments found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Due Payments Section */}
                    <h2 className="text-xl font-bold text-red-600 mt-6">Due Payments</h2>
                    <table className="min-w-full border-collapse border border-gray-300 mt-2">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Date</th>
                                <th className="border p-2">Time</th>
                                <th className="border p-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.filter(payment => payment.type === 'Due').length > 0 ? (
                                payments.filter(payment => payment.type === 'Due').map(payment => (
                                    <tr key={payment.id} className="text-center">
                                        <td className="border p-2">{payment.date}</td>
                                        <td className="border p-2">{payment.time}</td>
                                        <td className="border p-2 text-red-500">₹{payment.amount}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="p-4 text-center">No due payments found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            <ToastContainer position="top-right" autoClose={3000} />
        </ClientLayout>
    );
};

export default PaymentPage;


