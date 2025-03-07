import React from "react";
import ClientLayout from "../../../layouts/ClientLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookingHistory = () => {
    // Dummy Data
    const bookings = [
        { id: 1, date: "2025-02-20", service: "Haircut", status: "Completed", price: 500 },
        { id: 2, date: "2025-02-22", service: "Facial", status: "Pending", price: 1200 },
        { id: 3, date: "2025-02-25", service: "Manicure", status: "Completed", price: 800 },
        { id: 4, date: "2025-02-28", service: "Hair Spa", status: "Pending", price: 1500 },
    ];

    return (
        <ClientLayout>
            <h1 className="text-4xl font-extrabold text-center mb-6 
                text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600
                drop-shadow-lg shadow-blue-500/50 
                transform transition duration-300 hover:scale-105">
                Booking History
            </h1>

            <div className="max-w-4xl mx-auto bg-white p-6 shadow-md rounded-xl">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 border">Date</th>
                            <th className="p-3 border">Service</th>
                            <th className="p-3 border">Status</th>
                            <th className="p-3 border">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="text-center border hover:bg-gray-50">
                                <td className="p-3 border">{new Date(booking.date).toLocaleDateString()}</td>
                                <td className="p-3 border">{booking.service}</td>
                                <td className={`p-3 border font-bold 
                                    ${booking.status === "Completed" ? "text-green-600" : "text-red-600"}`}>
                                    {booking.status}
                                </td>
                                <td className="p-3 border">₹{booking.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </ClientLayout>
    );
};

export default BookingHistory;
