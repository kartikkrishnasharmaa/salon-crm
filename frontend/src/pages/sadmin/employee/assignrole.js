import { useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";

const roles = ["Manager", "Staff", "Receptionist"];

function AssignRole() {
    const [employees, setEmployees] = useState([
        { id: 1, name: "Ravi Kumar", assignedRoles: "" },
        { id: 2, name: "Pooja Sharma", assignedRoles: "" },
        { id: 3, name: "Amit Verma", assignedRoles: "" }
    ]);

    const handleRoleAssign = (id, role) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.id === id ? { ...emp, assignedRoles: role } : emp
            )
        );
    };

    return (
        <SAAdminLayout>
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 text-center">Assign Roles to Employees</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {employees.map(emp => (
                        <div key={emp.id} className="p-6 border rounded-xl shadow-md bg-white flex flex-col items-center">
                            <p className="text-lg font-semibold mb-2">{emp.name}</p>
                            <label className="block w-full text-center">Assign Role:
                                <select
                                    className="mt-2 p-2 w-full border rounded bg-gray-100 text-center"
                                    value={emp.assignedRoles}
                                    onChange={(e) => handleRoleAssign(emp.id, e.target.value)}
                                >
                                    <option value="">Select Role</option>
                                    {roles.map(role => (
                                        <option key={role} value={role}>{role}</option>
                                    ))}
                                </select>
                            </label>
                            {emp.assignedRoles && <p className="mt-3 text-blue-600 font-medium">Role: {emp.assignedRoles}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </SAAdminLayout>
    );
}

export default AssignRole;
