import { useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import axios from "../../../api/axiosConfig";

function CreateCustomer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(""); // ✅ Added Password Field
  const [branchId, setBranchId] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
  
    // ✅ LocalStorage se salonAdmin ka data fetch karna
    const salonAdminData = JSON.parse(localStorage.getItem("salonAdmin"));
  
    if (!salonAdminData || !salonAdminData._id) {
      setError("Salon ID not found. Please log in again.");
      return;
    }
  
    try {
      const response = await axios.post(
        "/customer/create-customer",
        { 
          name, 
          email, 
          phone, 
          password, 
          branchId, 
          salonId: salonAdminData._id  // ✅ Salon ID ke liye `_id` use karein
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
  
      setMessage(response.data.message);
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setBranchId("");
  
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };
  

  return (
    <SAAdminLayout>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg">
          Create ✂️ Salon Customer
        </h1>
        {message && <p className="text-green-500 text-center font-medium">{message}</p>}
        {error && <p className="text-red-500 text-center font-medium">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Branch ID (Optional)"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition"
          >
            Create Customer
          </button>
        </form>
      </div>
    </SAAdminLayout>
  );
}

export default CreateCustomer;
