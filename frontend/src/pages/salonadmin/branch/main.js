import React, { useState, useEffect } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import Tabs from "rc-tabs";
import "rc-tabs/assets/index.css";
import axios from "../../../api/axiosConfig";

function BranchMainPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [formData, setFormData] = useState({
    locationName: "",
    businessName: "",
    address: "",
    state: "",
    city: "",
    area: "",
    phone: ""
  });

  const [operationHours, setOperationHours] = useState(
    ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].reduce((acc, day) => {
      acc[day] = { open: "09:00", close: "17:00", isSelected: true };
      return acc;
    }, {})
  );

  const token = localStorage.getItem("token");
  const salonAdminData = JSON.parse(localStorage.getItem("salonAdmin"));
  const salonAdminId = salonAdminData?._id;

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!salonAdminId || !token) {
          throw new Error("Authentication data missing");
        }

        const response = await axios.get(`/branch/get-salon/${salonAdminId}/branches`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.data?.branches) {
          throw new Error("Invalid response format");
        }

        setBranches(response.data.branches);
        
        if (response.data.branches.length > 0) {
          handleBranchSelect(response.data.branches[0]);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch branches");
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, [token, salonAdminId]);

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setFormData({
      locationName: branch.branchName || "",
      businessName: branch.businessName || "",
      address: branch.address || "",
      state: branch.state || "",
      city: branch.city || "",
      area: branch.area || "",
      phone: branch.phone || ""
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setOperationHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const statesWithCities = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"],
  };

  const citiesWithAreas = {
    Mumbai: ["Andheri", "Bandra", "Dadar"],
    Pune: ["Kothrud", "Viman Nagar", "Aundh"],
    Nagpur: ["Sitabuldi", "Civil Lines", "Sadar"],
    Bangalore: ["Koramangala", "Indiranagar", "MG Road"],
    Mysore: ["Mysore Palace", "Brindavan Gardens", "Chamundi Hill"],
    Ahmedabad: ["Navrangpura", "Maninagar", "Satellite"],
    Surat: ["Athwa", "Adajan", "Piplod"],
    Vadodara: ["Alkapuri", "Fatehgunj", "Akota"],
    Jaipur: ["Malviya Nagar", "Vaishali Nagar", "Bani Park"],
    Udaipur: ["Fateh Sagar", "Hiran Magri", "Sukhadia Circle"],
    Jodhpur: ["Ratanada", "Shastri Nagar", "Basni"],
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setFormData(prev => ({
      ...prev,
      state: state,
      city: "",
      area: ""
    }));
  };

  const handleCityChange = (e) => {
    setFormData(prev => ({
      ...prev,
      city: e.target.value,
      area: ""
    }));
  };

  const handleAreaChange = (e) => {
    setFormData(prev => ({
      ...prev,
      area: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const tabsStyle = `
    .custom-rc-tabs {
      margin: 0 16px;
    }
    .custom-rc-tabs .rc-tabs-tab {
      padding: 8px 16px;
      margin: 0 8px !important;
      border-radius: 6px 6px 0 0;
      transition: all 0.3s;
      border: none !important;
    }
    .custom-rc-tabs .rc-tabs-tab:first-child {
      margin-left: 0 !important;
    }
    .custom-rc-tabs .rc-tabs-tab-active {
      background: #1890ff;
      color: white !important;
    }
    .custom-rc-tabs .rc-tabs-tab:not(.rc-tabs-tab-active) {
      background: #f5f5f5;
      color: #666;
    }
    .custom-rc-tabs .rc-tabs-ink-bar {
      background: #1890ff;
      height: 3px !important;
    }
    .custom-rc-tabs .rc-tabs-nav {
      margin-bottom: 16px;
      border-bottom: none !important;
    }
  `;

  if (loading) {
    return (
      <SAAdminLayout>
        <div className="flex justify-center items-center h-screen">
          <p>Loading branches...</p>
        </div>
      </SAAdminLayout>
    );
  }

  if (error) {
    return (
      <SAAdminLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </SAAdminLayout>
    );
  }

  if (!branches || branches.length === 0) {
    return (
      <SAAdminLayout>
        <div className="flex justify-center items-center h-screen">
          <p>No branches found</p>
        </div>
      </SAAdminLayout>
    );
  }


  return (
    <SAAdminLayout>
      <div className="flex justify-center items-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-7xl space-y-6">
          <div className="flex justify-center mb-6">
            <FaMapMarkerAlt className="text-5xl text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Office Location Details
          </h1>
          
          {loading ? (
            <p className="text-center text-gray-500 text-xl">Loading branches...</p>
          ) : (
            <div className="mb-6">
              <label htmlFor="branch-select" className="block text-sm font-medium text-gray-700 mb-2">
                Select Branch
              </label>
              <select
                id="branch-select"
                onChange={(e) => {
                  const branch = branches.find(b => b._id === e.target.value);
                  if (branch) handleBranchSelect(branch);
                }}
                className="w-full p-3 border rounded-md"
                value={selectedBranch?._id || ''}
              >
                {branches.map((branch) => (
                  <option key={branch._id} value={branch._id}>
                    {branch.branchName}
                  </option>
                ))}
              </select>
            </div>
          )}

          <style>{tabsStyle}</style>

          <Tabs
            defaultActiveKey="1"
            className="custom-rc-tabs"
            items={[
              {
                key: "1",
                label: "Info",
                children: (
                  <form className="p-6" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="locationName"
                      placeholder="Location Name"
                      value={formData.locationName}
                      onChange={handleInputChange}
                      className="w-full text-black-900 p-3 border rounded-md mb-4"
                      required
                    />
                    <input
                      type="text"
                      name="businessName"
                      placeholder="Business Name"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-md mb-4"
                      required
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-md mb-4"
                      required
                    />

                    <select
                      className="w-full p-3 border rounded-md mb-4"
                      name="state"
                      value={formData.state}
                      onChange={handleStateChange}
                      required
                    >
                      <option value="">Select State</option>
                      {Object.keys(statesWithCities).map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>

                    {formData.state && (
                      <select
                        className="w-full p-3 border rounded-md mb-4"
                        name="city"
                        value={formData.city}
                        onChange={handleCityChange}
                        required
                      >
                        <option value="">Select City</option>
                        {statesWithCities[formData.state].map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    )}

                    {formData.city && citiesWithAreas[formData.city] && (
                      <select
                        className="w-full p-3 border rounded-md mb-4"
                        name="area"
                        value={formData.area}
                        onChange={handleAreaChange}
                        required
                      >
                        <option value="">Select Area</option>
                        {citiesWithAreas[formData.city].map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    )}

                    <div className="mb-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-md pl-10"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full p-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
                    >
                      Save
                    </button>
                  </form>
                ),
              },
              {
                key: "2",
                label: "Operation Hour",
                children: (
                  <div>
                    <h2 className="text-xl font-bold mt-9">Location name</h2>
                    <div className="mt-4">
                      <div className="mb-2 flex items-center">
                        <input
                          type="checkbox"
                          id="selectAll"
                          className="mr-2"
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            setOperationHours((prev) => {
                              const updated = {};
                              Object.keys(prev).forEach((day) => {
                                updated[day] = {
                                  ...prev[day],
                                  isSelected: isChecked,
                                };
                              });
                              return updated;
                            });
                          }}
                        />
                        <label htmlFor="selectAll">Select All</label>
                      </div>

                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-2 text-left">Day</th>
                            <th className="border p-2 text-left">Opening Time</th>
                            <th className="border p-2 text-left">Closing Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(operationHours).map(
                            ([day, { open, close, isSelected }]) => (
                              <tr key={day} className="border">
                                <td className="border p-2 flex items-center">
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    className="mr-2"
                                    onChange={(e) => {
                                      setOperationHours((prev) => ({
                                        ...prev,
                                        [day]: {
                                          ...prev[day],
                                          isSelected: e.target.checked,
                                        },
                                      }));
                                    }}
                                  />
                                  {day}
                                </td>
                                <td className="border p-2">
                                  <input
                                    type="time"
                                    value={open}
                                    disabled={!isSelected}
                                    className={`w-full p-1 border rounded ${
                                      !isSelected ? "bg-gray-100" : ""
                                    }`}
                                    onChange={(e) =>
                                      handleTimeChange(
                                        day,
                                        "open",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td className="border p-2">
                                  <input
                                    type="time"
                                    value={close}
                                    disabled={!isSelected}
                                    className={`w-full p-1 border rounded ${
                                      !isSelected ? "bg-gray-100" : ""
                                    }`}
                                    onChange={(e) =>
                                      handleTimeChange(
                                        day,
                                        "close",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>

                      <div className="flex justify-end mt-4 space-x-2">
                        <button
                          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                key: "3",
                label: "Service & Price Setting",
                children: (
                  <div>
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-3 text-left">Category</th>
                            <th className="border p-3 text-left">Sub Category</th>
                            <th className="border p-3 text-left">Service Name</th>
                            <th className="border p-3 text-left">Member Price ($)</th>
                            <th className="border p-3 text-left">Non-Member Price ($)</th>
                            <th className="border p-3 text-left">Active</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              id: 1,
                              category: "Hair",
                              subCategory: "Cut & Style",
                              serviceName: "Men's Haircut",
                              memberPrice: 25,
                              nonMemberPrice: 35,
                              isActive: true,
                            },
                            {
                              id: 2,
                              category: "Hair",
                              subCategory: "Coloring",
                              serviceName: "Full Highlights",
                              memberPrice: 80,
                              nonMemberPrice: 100,
                              isActive: true,
                            },
                            {
                              id: 3,
                              category: "Spa",
                              subCategory: "Massage",
                              serviceName: "Deep Tissue (30 mins)",
                              memberPrice: 45,
                              nonMemberPrice: 60,
                              isActive: false,
                            },
                          ].map((service) => (
                            <tr
                              key={service.id}
                              className="border hover:bg-gray-50"
                            >
                              <td className="border p-3">{service.category}</td>
                              <td className="border p-3">{service.subCategory}</td>
                              <td className="border p-3">{service.serviceName}</td>
                              <td className="border p-3">
                                <input
                                  type="number"
                                  defaultValue={service.memberPrice}
                                  className="w-20 p-1 border rounded"
                                />
                              </td>
                              <td className="border p-3">
                                <input
                                  type="number"
                                  defaultValue={service.nonMemberPrice}
                                  className="w-20 p-1 border rounded"
                                />
                              </td>
                              <td className="border p-3 text-center">
                                <input
                                  type="checkbox"
                                  defaultChecked={service.isActive}
                                  className="h-4 w-4"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex justify-end mt-6 space-x-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                ),
              },
              {
                key: "4",
                label: "Product & Price Setting",
                children: (
                  <div>
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-3 text-left">Category</th>
                            <th className="border p-3 text-left">Sub Category</th>
                            <th className="border p-3 text-left">Product Name</th>
                            <th className="border p-3 text-left">Price ($)</th>
                            <th className="border p-3 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            {
                              id: 1,
                              category: "Skincare",
                              subCategory: "Cleansers",
                              productName: "Foaming Face Wash",
                              price: 12.99,
                              isEnabled: true,
                            },
                            {
                              id: 2,
                              category: "Haircare",
                              subCategory: "Shampoo",
                              productName: "Anti-Dandruff Shampoo",
                              price: 15.50,
                              isEnabled: false,
                            },
                            {
                              id: 3,
                              category: "Makeup",
                              subCategory: "Lipstick",
                              productName: "Matte Red Lipstick",
                              price: 8.99,
                              isEnabled: true,
                            },
                          ].map((product) => (
                            <tr key={product.id} className="border hover:bg-gray-50">
                              <td className="border p-3">{product.category}</td>
                              <td className="border p-3">{product.subCategory}</td>
                              <td className="border p-3">{product.productName}</td>
                              <td className="border p-3">
                                <input
                                  type="number"
                                  defaultValue={product.price}
                                  disabled={!product.isEnabled}
                                  className={`w-20 p-1 border rounded ${
                                    !product.isEnabled ? "bg-gray-100" : ""
                                  }`}
                                />
                              </td>
                              <td className="border p-3 text-center">
                                <input
                                  type="checkbox"
                                  defaultChecked={product.isEnabled}
                                  className="h-4 w-4"
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
              
                    <div className="flex justify-end mt-6 space-x-3">
                      <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
                        Cancel
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        Save Changes
                      </button>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </SAAdminLayout>
  );
}

export default BranchMainPage;