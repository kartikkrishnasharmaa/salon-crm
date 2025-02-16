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
        <h2 className="text-xl font-bold mb-4">Create Branch</h2>
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
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Create Branch</button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default CreateBranch;