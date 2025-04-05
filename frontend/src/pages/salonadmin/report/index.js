import React from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { Link } from "react-router-dom";
import { FileText, CalendarCheck, Users } from "lucide-react"; // Icons for each card

const reportPages = [
    { 
        title: "Customer Report", 
        description: "View and export customer details.", 
        link: "/salonadmin/customer-report", 
        color: "bg-blue-500", 
        icon: <FileText size={40} className="text-white" /> 
    },
    { 
        title: "Booking Report", 
        description: "Check all bookings and export data.", 
        link: "/salonadmin/booking-report", 
        color: "bg-green-500", 
        icon: <CalendarCheck size={40} className="text-white" /> 
    },
    { 
        title: "Employee Report", 
        description: "Manage employee records and reports.", 
        link: "/salonadmin/employee-report", 
        color: "bg-red-500", 
        icon: <Users size={40} className="text-white" /> 
    },
];

const SAreport = () => {
    return (
        <SAAdminLayout>
            <h1 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg text-center mt-7 shadow-blue-500/50 transform transition duration-300 hover:scale-105">
          Generate Reports
        </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {reportPages.map((report, index) => (
                    <Link key={index} to={report.link} className="hover:scale-105 transition transform duration-300">
                        <div className={`p-6 rounded-2xl shadow-xl text-white ${report.color} flex items-center gap-4`}>
                            <div className="p-4 bg-white bg-opacity-20 rounded-xl">{report.icon}</div>
                            <div>
                                <h3 className="text-2xl font-semibold">{report.title}</h3>
                                <p className="mt-1 text-white text-opacity-90">{report.description}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </SAAdminLayout>
    );
};

export default SAreport;
