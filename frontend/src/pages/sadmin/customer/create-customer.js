import { useState, useEffect } from "react";
// import axios from "../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";

function Createcustomer() {
  const [salonAdmins, setSalonAdmins] = useState([]);
  const [salonAdminId, setSalonAdminId] = useState("");
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);


  return (
    <SAAdminLayout>
      <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white">
        <h1
          className="text-2xl font-extrabold text-center mb-6 
                   text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600
                   drop-shadow-lg shadow-blue-500/50 
                   transform transition duration-300 hover:scale-105"
        >
          Create ✂️ Salon Customer
        </h1>
        {message && <p className="text-red-500">{message}</p>}
        <form>
    
          {/* Branch Name input */}
          <input
            type="text"
            placeholder="Branch Name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            className="w-full p-2 border mb-2"
          />

          {/* Address input */}
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border mb-2"
          />

          {/* Phone input */}
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border mb-2"
          />

          {/* Submit button */}
          <button
            type="submit"
            className="w-full p-2 bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white rounded"
          >
            Create Customer
          </button>
        </form>
      </div>
    </SAAdminLayout>
  );
}

export default Createcustomer;
