import React, { useEffect, useState } from "react";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";

const AssignEmployeeToBranch = () => {
  const [branches, setBranches] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const salonAdminData = JSON.parse(localStorage.getItem("salonAdmin")); // Parse JSON object
  const salonAdminId = salonAdminData?._id; // Extract _id properly

  useEffect(() => {
    console.log("SalonAdmin Data:", salonAdminData);
    console.log("Extracted SalonAdminId:", salonAdminId);
    console.log("Token:", token);

    if (!salonAdminId || !token) {
      console.error("🚨 SalonAdminId or Token missing! API calls will not proceed.");
      setLoading(false);
      return;
    }

    const fetchBranches = async () => {
      try {
        console.log("📡 Fetching branches...");
        const response = await axios.get(`/branch/get-salon/${salonAdminId}/branches`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ Branches fetched:", response.data);
        setBranches(response.data.branches);
      } catch (error) {
        console.error("❌ Error fetching branches:", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get("/employee/all-employees", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("✅ Employees fetched:", response.data);
        setEmployees(response.data.employees);
      } catch (error) {
        console.error("❌ Error fetching employees:", error);
      }
    };

    Promise.all([fetchBranches(), fetchEmployees()])
      .then(() => setLoading(false))
      .catch(() => setLoading(false));

  }, [token, salonAdminId]);

  const handleAssign = async () => {
    if (!selectedBranch || !selectedEmployee) {
      setMessage("❌ Please select both an Employee and a Branch.");
      return;
    }
  
    try {
      console.log("📡 Assigning employee to branch...");
      const response = await axios.put(
        "/branch/assign-branch",
        { employeeId: selectedEmployee, branchId: selectedBranch },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("✅ Assignment response:", response.data);
      setMessage(`✅ ${response.data.message}`);
    } catch (error) {
      console.error("❌ Error assigning employee to branch:", error);
      setMessage("❌ Error assigning employee to branch.");
    }
  };
  
  return (
    <SAAdminLayout>
      <h2 className="text-3xl font-bold mb-6">Assign Employee to Branch</h2>

      {message && <p className="text-lg font-semibold text-center">{message}</p>}

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Branch Dropdown */}
          <div className="mb-4">
            <label className="block font-medium">Select Branch:</label>
            <select
              className="border p-2 w-full"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
            >
              <option value="">-- Select Branch --</option>
              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.branchName}
                </option>
              ))}
            </select>
          </div>

          {/* Employee Dropdown */}
          <div className="mb-4">
            <label className="block font-medium">Select Employee:</label>
            <select
              className="border p-2 w-full"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
            >
              <option value="">-- Select Employee --</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.name} ({employee.role})
                </option>
              ))}
            </select>
          </div>

          {/* Assign Button */}
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            onClick={handleAssign}
          >
            Assign Employee to Branch
          </button>
        </>
      )}
    </SAAdminLayout>
  );
};

export default AssignEmployeeToBranch;
