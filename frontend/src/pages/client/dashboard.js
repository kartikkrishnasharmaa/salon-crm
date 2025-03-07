import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Redirect for unauthorized users
import ClientLayout from "../../layouts/ClientLayout";
import axios from "../../api/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {


    return (
        <ClientLayout>
            {/* Dashboard Heading */}
            <h1 className="text-4xl font-extrabold text-center mb-6 
                 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600
                 drop-shadow-lg shadow-blue-500/50 
                 transform transition duration-300 hover:scale-105">
                Client Dashboard
            </h1>



            <ToastContainer position="top-right" autoClose={3000} />
        </ClientLayout>
    );
};

export default Dashboard;
