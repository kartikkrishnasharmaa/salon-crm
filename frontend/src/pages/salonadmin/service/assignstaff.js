import { useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";

const services = [
    "Hair Cut", "Facial", "Spa", "Cleanup", "Eyebrow", "Wax", "Nail Care"
];

function AssignStaff() {
    const [employees, setEmployees] = useState([
        { id: 1, name: "Ravi Kumar", assignedServices: [] },
        { id: 2, name: "Pooja Sharma", assignedServices: [] },
        { id: 3, name: "Amit Verma", assignedServices: [] }
    ]);

    const handleAssign = (id, service) => {
        setEmployees(prevEmployees =>
            prevEmployees.map(emp =>
                emp.id === id
                    ? { ...emp, assignedServices: emp.assignedServices.includes(service) ? emp.assignedServices.filter(s => s !== service) : [...emp.assignedServices, service] }
                    : emp
            )
        );
    };

    return (
        <SAAdminLayout>
            <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Assign Employee to Services</h2>
                <div className="grid gap-4">
                    {employees.map(emp => (
                        <div key={emp.id} className="p-4 border rounded-lg">
                            <p className="font-semibold">{emp.name}</p>
                            <div className="mt-2">
                                {services.map(service => (
                                    <label key={service} className="block">
                                        <input
                                            type="checkbox"
                                            className="mr-2"
                                            checked={emp.assignedServices.includes(service)}
                                            onChange={() => handleAssign(emp.id, service)}
                                        />
                                        {service}
                                    </label>
                                ))}
                            </div>
                            {emp.assignedServices.length > 0 && <p className="mt-2 text-green-600">Assigned: {emp.assignedServices.join(", ")}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </SAAdminLayout>
    );
}

export default AssignStaff;