import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SAAdminLayout from "../../../layouts/Salonadmin";

const categories = {
    Hair: ["Haircut", "Hair Coloring", "Hair Treatment"],
    Skin: ["Facial", "Peel Treatment", "Skin Rejuvenation"],
    Nails: ["Manicure", "Pedicure", "Nail Art"],
    Spa: ["Massage", "Aromatherapy", "Hot Stone Therapy"],
    Makeup: ["Bridal Makeup", "Party Makeup", "Editorial Makeup"],
    Other: ["Custom Service"]
};

const businessUnits = ["Spa", "Salon", "Spa and Salon", "Ayurveda Gram"];

const SAcreateservice = () => {
    const [serviceName, setServiceName] = useState("");
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("Hair");
    const [subCategory, setSubCategory] = useState(categories["Hair"][0]);
    const [businessUnit, setBusinessUnit] = useState("Spa");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [cgst, setCgst] = useState("");
    const [sgst, setSgst] = useState("");
    const [priceWithTax, setPriceWithTax] = useState("");
    const [duration, setDuration] = useState("");
    const [message, setMessage] = useState("");

    const calculatePriceWithTax = (price, cgst, sgst) => {
        const taxAmount = (parseFloat(price) * ((parseFloat(cgst) || 0) + (parseFloat(sgst) || 0))) / 100;
        return (parseFloat(price) + taxAmount).toFixed(2);
    };

    const handlePriceChange = (e) => {
        const priceValue = parseFloat(e.target.value) || 0;
        setPrice(priceValue);
        setPriceWithTax(calculatePriceWithTax(priceValue, cgst, sgst));
    };

    const handleTaxChange = (e, type) => {
        const value = parseFloat(e.target.value) || 0;
        if (type === "cgst") {
            setCgst(value);
        } else {
            setSgst(value);
        }
        setPriceWithTax(calculatePriceWithTax(price, type === "cgst" ? value : cgst, type === "sgst" ? value : sgst));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("Service created successfully!");
    };

    return (
        <SAAdminLayout>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-200">
                <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg">
                    Create Salon Service
                </h1>
                {message && (
                    <p className="text-green-500 text-center font-medium">{message}</p>
                )}
                <div className="relative mb-4">
                    <input
                        type="text"
                        placeholder="Search Service"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Service Name"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    >
                        {Object.keys(categories).map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    >
                        {categories[category].map((sub) => (
                            <option key={sub} value={sub}>{sub}</option>
                        ))}
                    </select>
                    <select
                        value={businessUnit}
                        onChange={(e) => setBusinessUnit(e.target.value)}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    >
                        {businessUnits.map((unit) => (
                            <option key={unit} value={unit}>{unit}</option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Service Price (₹)"
                        value={price}
                        onChange={handlePriceChange}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="number"
                        placeholder="CGST (%)"
                        value={cgst}
                        onChange={(e) => handleTaxChange(e, "cgst")}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="number"
                        placeholder="SGST (%)"
                        value={sgst}
                        onChange={(e) => handleTaxChange(e, "sgst")}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="text"
                        placeholder="Price with Tax (₹)"
                        value={priceWithTax}
                        readOnly
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 bg-gray-100"
                    />
                    <input
                        type="text"
                        placeholder="Duration (e.g., 30 mins, 1 hour)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <div className="flex justify-end gap-4 col-span-1 md:col-span-2">
                        <button
                            type="button"
                            className="px-6 py-3 bg-gray-400 text-white font-bold rounded-lg hover:shadow-lg transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </SAAdminLayout>
    );
};

export default SAcreateservice;