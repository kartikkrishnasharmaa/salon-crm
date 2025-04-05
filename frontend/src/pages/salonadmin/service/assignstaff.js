import React, { useState, useEffect } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import axios from "../../../api/axiosConfig";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";


const AssignStaff = () => {
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);
  const [allEmployees, setAllEmployees] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [employeeServicesMap, setEmployeeServicesMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all employees
  const fetchAllEmployees = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `/employee/all/employees?branchId=${selectedBranch}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.employees;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch employees"
      );
    }
  };

  // Fetch all services
  const fetchAllServices = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `/service/get-services?branchId=${selectedBranch}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.services;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to fetch services"
      );
    }
  };

  // Fetch assigned services for each employee
  const fetchEmployeeServices = async (employeeId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`/employee/get-services/${employeeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.services || [];
    } catch (error) {
      console.error("Error fetching employee services:", error);
      return [];
    }
  };

  // Load all necessary data
  useEffect(() => {
    if (!selectedBranch) {
      setLoading(false);
      setError("Please select a branch first");
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        // Step 1: Fetch all employees and all services in parallel
        const [employees, services] = await Promise.all([
          fetchAllEmployees(),
          fetchAllServices(),
        ]);

        setAllEmployees(employees);
        setAllServices(services);

        // Step 2: Fetch assigned services for each employee
        const servicesMap = {};
        for (const employee of employees) {
          servicesMap[employee._id] = await fetchEmployeeServices(employee._id);
        }

        setEmployeeServicesMap(servicesMap);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [selectedBranch]);

  // Handle service assignment
  const handleAssignService = async (employeeId, serviceId, isAssigned) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    try {
      setUpdating(true);

      const endpoint = isAssigned
        ? "/service/remove-service"
        : "/service/assign-service";

      await axios.post(
        endpoint,
        { employeeId, serviceId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update local state
      setEmployeeServicesMap((prev) => {
        const updated = { ...prev };
        if (isAssigned) {
          updated[employeeId] = updated[employeeId].filter(
            (id) => id !== serviceId
          );
        } else {
          updated[employeeId] = [...(updated[employeeId] || []), serviceId];
        }
        return updated;
      });

      toast.success(
        `Service ${
          isAssigned ? "removed from" : "assigned to"
        } employee successfully`
      );
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        `Failed to ${isAssigned ? "remove" : "assign"} service`;
      toast.error(errorMsg);
      console.error("Service assignment error:", error);
    } finally {
      setUpdating(false);
    }
  };

  // Filter employees based on search term
  const filteredEmployees = allEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if service is assigned to employee
  const isServiceAssigned = (employeeId, serviceId) => {
    return employeeServicesMap[employeeId]?.includes(serviceId) || false;
  };

  if (loading) {
    return (
      <SAAdminLayout>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Assign Services to Employees
          </h2>
       Loading....
        </div>
      </SAAdminLayout>
    );
  }

  if (error) {
    return (
      <SAAdminLayout>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Assign Services to Employees
          </h2>
          <div className="bg-red-100 border-l-4 border-red-500 p-4">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </SAAdminLayout>
    );
  }

  return (
    <SAAdminLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Service Assignment</h2>
          {selectedBranch && allEmployees.length > 0 && (
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search employees..."
                className="w-full px-4 py-2 border rounded-lg pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          )}
        </div>

        {!selectedBranch ? (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-yellow-700">
              Please select a branch from the sidebar to manage service
              assignments
            </p>
          </div>
        ) : allEmployees.length === 0 ? (
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-700">
              No employees found in this branch. Please add employees first.
            </p>
          </div>
        ) : allServices.length === 0 ? (
          <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-700">
              No services found in this branch. Please add services first.
            </p>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="bg-gray-100 border-l-4 border-gray-500 p-4 rounded">
            <p className="text-gray-700">
              No employees match your search criteria
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredEmployees.map((employee) => {
              const assignedServices = employeeServicesMap[employee._id] || [];
              const assignedCount = assignedServices.length;

              return (
                <div
                  key={employee._id}
                  className="border rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{employee.name}</h3>
                      <p className="text-sm text-gray-600">{employee.role}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">
                      {assignedCount} service{assignedCount !== 1 ? "s" : ""}{" "}
                      assigned
                    </span>
                  </div>

                  <div className="p-4">
                    <h4 className="font-medium text-gray-700 mb-3">
                      Available Services:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {allServices.map((service) => {
                        const isAssigned = isServiceAssigned(
                          employee._id,
                          service._id
                        );
                        return (
                          <div
                            key={service._id}
                            className={`p-3 border rounded-lg flex items-center ${
                              isAssigned
                                ? "bg-green-50 border-green-200"
                                : "hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="checkbox"
                              id={`${employee._id}-${service._id}`}
                              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                              checked={isAssigned}
                              onChange={() =>
                                handleAssignService(
                                  employee._id,
                                  service._id,
                                  isAssigned
                                )
                              }
                              disabled={updating}
                            />
                            <label
                              htmlFor={`${employee._id}-${service._id}`}
                              className="ml-3 flex-1 cursor-pointer"
                            >
                              <div className="flex justify-between">
                                <span className="font-medium">
                                  {service.name}
                                </span>
                                <span className="text-sm font-semibold">
                                  ₹{service.price}
                                </span>
                              </div>
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>
                                  {service.category} • {service.duration} mins
                                </span>
                                <span>{service.type}</span>
                              </div>
                            </label>
                          </div>
                        );
                      })}
                    </div>

                    {assignedCount > 0 && (
                      <div className="mt-6 pt-4 border-t">
                        <h4 className="font-medium text-green-700 mb-3">
                          Currently Assigned Services:
                        </h4>
                        <ul className="divide-y divide-gray-200">
                          {allServices
                            .filter((service) =>
                              isServiceAssigned(employee._id, service._id)
                            )
                            .map((service) => (
                              <li
                                key={service._id}
                                className="py-2 flex justify-between items-center"
                              >
                                <div>
                                  <p className="font-medium">{service.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {service.duration} mins • ₹{service.price} •{" "}
                                    {service.category}
                                  </p>
                                </div>
                                <button
                                  onClick={() =>
                                    handleAssignService(
                                      employee._id,
                                      service._id,
                                      true
                                    )
                                  }
                                  disabled={updating}
                                  className="text-red-600 hover:text-red-800 text-sm font-medium px-3 py-1 rounded hover:bg-red-50"
                                >
                                  Remove
                                </button>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </SAAdminLayout>
  );
};

export default AssignStaff;
