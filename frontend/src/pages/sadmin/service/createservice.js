import { useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";

const SAcreateservice = () => {
    const [serviceName, setServiceName] = useState("");
    const [category, setCategory] = useState("Hair");
    const [serviceType, setServiceType] = useState("Basic");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [message, setMessage] = useState("");

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
                        <option value="Hair">Hair</option>
                        <option value="Skin">Skin</option>
                        <option value="Nails">Nails</option>
                        <option value="Spa">Spa</option>
                        <option value="Makeup">Makeup</option>
                        <option value="Facial">Facial</option>
                        <option value="Massage">Massage</option>
                        <option value="Hair Coloring">Hair Coloring</option>
                        <option value="Threading">Threading</option>
                        <option value="Waxing">Waxing</option>
                        <option value="Bridal Makeup">Bridal Makeup</option>
                        <option value="Manicure">Manicure</option>
                        <option value="Pedicure">Pedicure</option>
                        <option value="Eyebrow Shaping">Eyebrow Shaping</option>
                        <option value="Hair Treatment">Hair Treatment</option>
                        <option value="Other">Other</option>
                    </select>
                    <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="Basic">Basic</option>
                        <option value="Premium">Premium</option>
                        <option value="Luxury">Luxury</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Service Price (₹)"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Duration (e.g., 30 mins, 1 hour)"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        required
                    />
                    <textarea
                        placeholder="Service Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2"
                    ></textarea>
                    <button
                        type="submit"
                        className="w-full md:col-span-2 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition"
                    >
                        Create Service
                    </button>
                </form>
            </div>
        </SAAdminLayout>
    );
};

export default SAcreateservice;
