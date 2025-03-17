import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";

const SAcreateservice = () => {
    const [serviceName, setServiceName] = useState("");
    const [category, setCategory] = useState("Hair");
    const [serviceType, setServiceType] = useState("Basic");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // 🔹 Redux se `branchId` le rahe hain
    const branchId = useSelector(state => state.branch.selectedBranch);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!branchId) {
            setMessage("Branch not selected! Please select a branch.");
            return;
        }

        if (!serviceName || !category || !serviceType || !price || !duration || !startTime || !endTime) {
            setMessage("All fields are required!");
            return;
        }

        if (startTime >= endTime) {
            setMessage("End time must be after start time.");
            return;
        }

        setIsLoading(true);
        setMessage("");

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "/service/create-service",
                { branchId, name: serviceName, category, type: serviceType, price, duration, startTime, endTime, description },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage(response.data.message);
            setServiceName("");
            setCategory("Hair");
            setServiceType("Basic");
            setDescription("");
            setPrice("");
            setDuration("");
            setStartTime("");
            setEndTime("");
        } catch (error) {
            setMessage(error.response?.data?.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SAAdminLayout>
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-200">
                <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg">
                    Create Salon Service
                </h1>
                
                {/* ✅ Branch ID Debugging */}
                <p className="text-center text-gray-500">Branch ID: {branchId || "Not Selected"}</p>

                {message && <p className="text-center font-medium text-red-500">{message}</p>}

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

                    <input
                        type="time"
                        placeholder="Start Time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="time"
                        placeholder="End Time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
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
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating Service..." : "Create Service"}
                    </button>
                </form>
            </div>
        </SAAdminLayout>
    );
};

export default SAcreateservice;
