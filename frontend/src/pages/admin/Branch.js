import { useState, useEffect } from "react";
import axios from "../../api/axiosConfig";
import AdminLayout from "../../layouts/AdminLayout";

function CreateBranch() {
  const [salonAdmins, setSalonAdmins] = useState([]);
  const [salonAdminId, setSalonAdminId] = useState("");
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchSalonAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/salon/view-all-salon-admins", {
          headers: { Authorization: token },
        });
        setSalonAdmins(response.data.salonAdmins || []);
      } catch (error) {
        console.error("Failed to fetch salon admins");
      }
    };
    fetchSalonAdmins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/salon/create-branch",
        { salonAdminId, branchName, address, phone },
        { headers: { Authorization: token } }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg bg-white">
      <h1 className="text-4xl font-extrabold text-center mb-6 
               text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600
               drop-shadow-lg shadow-blue-500/50 
               transform transition duration-300 hover:scale-105">
  Create ✂️ Salon Branch
</h1>
        {message && <p className="text-red-500">{message}</p>}
        <form onSubmit={handleSubmit}>
          <select
            value={salonAdminId}
            onChange={(e) => setSalonAdminId(e.target.value)}
            className="w-full p-2 border mb-2 text-black bg-white"
          >
            <option value="">
              {salonAdmins.length === 0 ? "Loading..." : "Select Salon Admin"}
            </option>
            {salonAdmins.map((admin) => (
              <option key={admin._id} value={admin._id}>
                {admin.ownerName} - {admin.email}
              </option>
            ))}
          </select>

          <input type="text" placeholder="Branch Name" value={branchName} onChange={(e) => setBranchName(e.target.value)} className="w-full p-2 border mb-2" />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 border mb-2" />
          <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border mb-2" />
          <button type="submit" className="w-full p-2 bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white rounded">Create Branch</button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default CreateBranch;