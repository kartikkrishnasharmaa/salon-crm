import React from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { useSelector } from "react-redux";
import { dummyEmployees } from "../../../data/dummyData";

const ViewEmployees = () => {
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

  const filteredEmployees = dummyEmployees.filter(
    (emp) => emp.branch === selectedBranch
  );

  return (
    <SAAdminLayout>
      <h2 className="text-3xl font-bold mb-6">View All Employee</h2>
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">
          Employees for Branch: {selectedBranch || "None Selected"}
        </h2>
        {filteredEmployees.length > 0 ? (
          <ul className="space-y-2">
            {filteredEmployees.map((emp) => (
              <li key={emp.id} className="border p-2 rounded-lg">
                {emp.name} - {emp.role}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No employees found.</p>
        )}
      </div>
    </SAAdminLayout>
  );
};

export default ViewEmployees;
