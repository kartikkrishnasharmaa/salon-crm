import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";

function Employees() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("select"); // Default role
  const [message, setMessage] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branches, setBranches] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const token = localStorage.getItem("token");
        const salonAdminData = JSON.parse(localStorage.getItem("salonAdmin"));
        if (!salonAdminData?._id || !token) {
          setError("Salon ID or token missing. Please log in again.");
          return;
        }

        const response = await axios.get(
          `/branch/get-salon/${salonAdminData._id}/branches`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBranches(response.data.branches);
      } catch (error) {
        setError("Failed to fetch branches.");
      }
    };

    fetchBranches();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("selected role: ", role);

    // ❌ Prevent submitting if role is not selected
    if (role === "select") {
      setMessage("Please select a valid role");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/employee/create-employee",
        { name, email, phone, password, branchId, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage(response.data.message);
      // Clear form after submission
      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setRole("select");
      setBranchId("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <SAAdminLayout>
      <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white">
        <h1
          className="text-4xl font-extrabold text-center mb-6 
               text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600
               drop-shadow-lg shadow-green-500/50 
               transform transition duration-300 hover:scale-105"
        >
          Create 👨‍💼 Employee
        </h1>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border mb-2"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border mb-2"
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border mb-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border mb-2"
          />
          <select
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a Branch</option>
            {branches.map((branch) => (
              <option key={branch._id} value={branch._id}>
                {branch.branchName}
              </option>
            ))}
          </select>
          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border mb-2 text-black bg-white"
          >
            <option value="select">Select Role</option>
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
            <option value="receptionist">Receptionist</option>
          </select>

          <button
            type="submit"
            className="w-full p-2 bg-gradient-to-r from-green-500 to-blue-600 font-bold text-white rounded"
          >
            Create Employee
          </button>
        </form>
      </div>
    </SAAdminLayout>
  );
}

export default Employees;
