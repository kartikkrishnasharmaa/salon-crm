import React, { useEffect, useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import axios from "../../../api/axiosConfig";
import { useSelector } from 'react-redux';

const ViewEmployees = () => {
    const selectedBranch = useSelector(state => state.branch.selectedBranch);
  
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

    useEffect(() => {
      const fetchEmployees = async () => {
        const token = localStorage.getItem("token"); // Retrieve token
  
        if (!token) {
          setError("Unauthorized: No token found");
          setLoading(false);
          return;
        }
  
        try {
          const response = await axios.get(`/employee/all/employees?branchId=${selectedBranch}`, {
            headers: { Authorization: `Bearer ${token}` }, // Pass token in headers
          });
          setEmployees(response.data.employees);
        } catch (error) {
          setError(error.response?.data?.message || "Failed to fetch employees");
        } finally {
          setLoading(false);
        }
      };
  
      fetchEmployees();
    }, []);

  return (
    <SAAdminLayout>
      <h2 className="text-3xl font-bold mb-6">View All Employees</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border">#</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Branch</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id} className="border">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{employee.name}</td>
                  <td className="py-2 px-4 border">{employee.email}</td>
                  <td className="py-2 px-4 border">{employee.phone}</td>
                  <td className="py-2 px-4 border">{employee.role}</td>
                  <td className="py-2 px-4 border">{employee.branchId?.branchName || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SAAdminLayout>
  );
};

export default ViewEmployees;
