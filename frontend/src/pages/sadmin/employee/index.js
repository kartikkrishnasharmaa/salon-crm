import { useState, useEffect } from "react";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";

function Employees() {
  const [salons, setSalons] = useState([]);
  const [salonId, setSalonId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("staff"); // Default role
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/employee/employee/create",
        { name, email, phone, password, role },
        { headers: { Authorization: token } }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <SAAdminLayout>
      <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white">
        <h1 className="text-4xl font-extrabold text-center mb-6 
               text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-600
               drop-shadow-lg shadow-green-500/50 
               transform transition duration-300 hover:scale-105">
          Create 👨‍💼 Employee
        </h1>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          {/* Branch Dropdown */}
     
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border mb-2" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border mb-2" />
          <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border mb-2" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border mb-2" />

          {/* Role Selection */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border mb-2 text-black bg-white"
          >
            <option value="staff">Staff</option>
            <option value="manager">Manager</option>
          </select>

          <button type="submit" className="w-full p-2 bg-gradient-to-r from-green-500 to-blue-600 font-bold text-white rounded">
            Create Employee
          </button>
        </form>
      </div>
    </SAAdminLayout>
  );
}

export default Employees;


// import React from "react";
// import SAAdminLayout from "../../../layouts/Salonadmin";


// const Employees = () => {

//     return (
//         <SAAdminLayout>
//             <h2 className="text-3xl font-bold mb-6">Create Employee</h2>





//         </SAAdminLayout>
//     );
// };

// export default Employees;