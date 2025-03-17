import React, { useEffect, useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import axios from "../../../api/axiosConfig";
import { useSelector } from "react-redux";

const ViewServices = () => {
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      const token = localStorage.getItem("token"); // 🔑 Retrieve token

      if (!token) {
        setError("Unauthorized: No token found");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `/service/get-services?branchId=${selectedBranch}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setServices(response.data.services);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to fetch services");
      } finally {
        setLoading(false);
      }
    };

    if (selectedBranch) fetchServices();
  }, [selectedBranch]);

  return (
    <SAAdminLayout>
      <h2 className="text-3xl font-bold mb-6">View All Services</h2>

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
                <th className="py-2 px-4 border">Service Name</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Type</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Duration</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service._id} className="border">
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">{service.name}</td>
                  <td className="py-2 px-4 border">{service.category}</td>
                  <td className="py-2 px-4 border">{service.type}</td>
                  <td className="py-2 px-4 border">₹{service.price}</td>
                  <td className="py-2 px-4 border">{service.duration} mins</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </SAAdminLayout>
  );
};

export default ViewServices;
