import React, { useEffect, useState } from "react";
import axios from "../../api/axiosConfig";
import { useParams } from "react-router-dom"; // To access the adminId parameter from URL
import AdminLayout from "../../layouts/AdminLayout";

const AdminDetailPage = () => {
  const { adminId } = useParams(); // Get adminId from the URL parameter
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleBack = () => {
    window.history.back(); // Go back to the previous page
  };
  useEffect(() => {
    const fetchAdminDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/salon/view-salon-admin/${adminId}`, {
          headers: { Authorization: token },
        });
        setAdmin(response.data.salonAdmin);
        setLoading(false);
      } catch (error) {
        setError("Failed to load admin details");
        setLoading(false);
      }
    };

    fetchAdminDetail();
  }, [adminId]); // Fetch data whenever adminId changes (if you navigate to a different admin)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-semibold text-indigo-700 mb-6 text-center">
            Salon Admin Details
          </h2>

          {admin && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col space-y-2">
                  <p className="text-lg font-medium text-gray-700">
                    <strong>Owner Name:</strong> {admin.ownerName}
                  </p>
                  <p className="text-lg font-medium text-gray-700">
                    <strong>Email:</strong> {admin.email}
                  </p>
                  <p className="text-lg font-medium text-gray-700">
                    <strong>Phone:</strong> {admin.phone}
                  </p>
                </div>

                <div className="flex flex-col space-y-2">
                  <p className="text-lg font-medium text-gray-700">
                    <strong>Salon Name:</strong> {admin.salonName}
                  </p>
                  <p className="text-lg font-medium text-gray-700">
                    <strong>Salon Type:</strong> {admin.salonType}
                  </p>
                  <p className="text-lg font-medium text-gray-700">
                    <strong>Established Year:</strong> {admin.establishedYear}
                  </p>
                </div>
              </div>

               <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-semibold text-indigo-600">
                  Services Offered
                </h3>
                <ul className="list-disc pl-6 space-y-2">
                  {admin.servicesOffered &&
                    admin.servicesOffered.map((service, index) => (
                      <li key={index} className="text-lg text-gray-700">
                        {service}
                      </li>
                    ))}
                </ul>
              </div> 

              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-semibold text-indigo-600">
                  Address Details
                </h3>
                <p className="text-lg text-gray-700">
                  <strong>Street:</strong> {admin.address.street}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>City:</strong> {admin.address.city}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>State:</strong> {admin.address.state}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Zip Code:</strong> {admin.address.zipCode}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Country:</strong> {admin.address.country}
                </p>
              </div>

              <div className="space-y-6 mb-8">
                <h3 className="text-2xl font-semibold text-indigo-600">
                  Business Info
                </h3>
                <p className="text-lg text-gray-700">
                  <strong>Business Email:</strong> {admin.businessEmail}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Business Phone:</strong> {admin.businessPhone}
                </p>
                <p className="text-lg text-gray-700">
                  <strong>Website:</strong>{" "}
                  <a
                    href={`https://${admin.businessWebsite}`}
                    className="text-blue-500"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {admin.businessWebsite}
                  </a>
                </p>
              </div>

            

              <div className="mt-8 text-center">
              {/* Back Button */}
              <button 
                onClick={handleBack} 
                className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition duration-300">
                Back
              </button>
            </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDetailPage;
