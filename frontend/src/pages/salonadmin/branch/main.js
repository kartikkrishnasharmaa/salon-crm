import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaMapMarkerAlt, FaPhone, FaClock } from "react-icons/fa";
import Tabs from "rc-tabs";
import "rc-tabs/assets/index.css";

function EditBranch() {
  const { branchId } = useParams();
  const navigate = useNavigate();
  const [branch, setBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    branchName: "",
    address: "",
    state: "",
    city: "",
    area: "",
    phone: "",
  });
  const [operationHours, setOperationHours] = useState({});
  const token = localStorage.getItem("token");
  const salonAdminData = JSON.parse(localStorage.getItem("salonAdmin"));
  const salonAdminId = salonAdminData?._id;

  const statesWithCities = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur", "sikar"], // include sikar for your data
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
    sikar: ["Rani Sati Road"],
  };

  useEffect(() => {
    if (!salonAdminId || !token) {
      console.error("🚨 SalonAdminId or Token missing!");
      setLoading(false);
      return;
    }

    const fetchBranch = async () => {
      try {
        const response = await axios.get(
          `/branch/get-salon/${salonAdminId}/branches`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const branchData = response.data;

        if (branchData) {
          setBranch(branchData);
          setFormData({
            branchName: branchData.branchName,
            address: branchData.address,
            state: branchData.state,
            city: branchData.city,
            area: branchData.area,
            phone: branchData.phone,
          });

          const initialHours =
            branchData.hours ||
            [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].reduce((acc, day) => {
              acc[day] = {
                open: "09:00",
                close: "17:00",
                isSelected: true,
              };
              return acc;
            }, {});

          setOperationHours(initialHours);
        } else {
          console.error("❌ No branch data found");
        }
      } catch (error) {
        console.error("❌ Error fetching branch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBranch();
  }, [branchId, token, salonAdminId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setFormData((prev) => ({ ...prev, state, city: "", area: "" }));
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setFormData((prev) => ({ ...prev, city, area: "" }));
  };

  const handleTimeChange = (day, field, value) => {
    setOperationHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value },
    }));
  };

  const handleSubmitAddress = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/branch/update/${branchId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Branch address updated successfully!");
    } catch (error) {
      console.error("❌ Error updating branch:", error);
      alert("Failed to update branch address");
    }
  };

  const handleSubmitHours = async () => {
    const formatted = {
      mon: {
        open: operationHours.Monday.open,
        close: operationHours.Monday.close,
        closed: !operationHours.Monday.isSelected,
      },
      tue: {
        open: operationHours.Tuesday.open,
        close: operationHours.Tuesday.close,
        closed: !operationHours.Tuesday.isSelected,
      },
      wed: {
        open: operationHours.Wednesday.open,
        close: operationHours.Wednesday.close,
        closed: !operationHours.Wednesday.isSelected,
      },
      thu: {
        open: operationHours.Thursday.open,
        close: operationHours.Thursday.close,
        closed: !operationHours.Thursday.isSelected,
      },
      fri: {
        open: operationHours.Friday.open,
        close: operationHours.Friday.close,
        closed: !operationHours.Friday.isSelected,
      },
      sat: {
        open: operationHours.Saturday.open,
        close: operationHours.Saturday.close,
        closed: !operationHours.Saturday.isSelected,
      },
      sun: {
        open: operationHours.Sunday.open,
        close: operationHours.Sunday.close,
        closed: !operationHours.Sunday.isSelected,
      },
    };

    try {
      await axios.patch(
        `/branch/update/${branchId}`,
        { hours: formatted },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Operation hours updated successfully!");
    } catch (error) {
      console.error("❌ Error updating operation hours:", error);
      alert("Failed to update operation hours");
    }
  };

  if (loading) {
    return (
      <SAAdminLayout>
        <div className="flex justify-center items-center h-screen">
          <p>Loading branch details...</p>
        </div>
      </SAAdminLayout>
    );
  }
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

  if (!branch) {
    return (
      <SAAdminLayout>
        <div className="flex justify-center items-center h-screen">
          <p>Branch not found</p>
        </div>
      </SAAdminLayout>
    );
  }

  return (
    <SAAdminLayout>
      <div className="flex justify-center items-start bg-gray-100 p-4 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-7xl space-y-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Edit Branch: {branch.branchName}
          </h1>
          <style>{tabsStyle}</style>

          <Tabs
            defaultActiveKey="1"
            className="custom-rc-tabs"
            items={[
              {
                key: "1",
                label: "Address",
                children: (
                  <form className="p-6" onSubmit={handleSubmitAddress}>
                    {/* Branch Name */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Branch Name
                      </label>
                      <input
                        type="text"
                        name="branchName"
                        value={formData.branchName}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-md"
                        required
                      />
                    </div>

                    {/* Address */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaMapMarkerAlt className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-md pl-10"
                          placeholder={
                            formData.address || "Enter the branch address"
                          } // Placeholder for address
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">State</label>
                      <select
                        className="w-full p-3 border rounded-md"
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
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">City</label>
                      <select
                        className="w-full p-3 border rounded-md"
                        name="city"
                        value={formData.city}
                        onChange={handleCityChange}
                        required
                      >
                        <option value="">Select City</option>
                        {(statesWithCities[formData.state] || []).map(
                          (city) => (
                            <option key={city} value={city}>
                              {city}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">Area</label>
                      <select
                        className="w-full p-3 border rounded-md"
                        name="area"
                        value={formData.area}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Area</option>
                        {(citiesWithAreas[formData.city] || []).map((area) => (
                          <option key={area} value={area}>
                            {area}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-md pl-10"
                          placeholder={formData.phone || "Enter phone number"} // Placeholder for phone
                          required
                        />
                      </div>
                    </div>

                    {/* Location Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-gray-700 mb-2">
                          State
                        </label>
                        <select
                          className="w-full p-3 border rounded-md"
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
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">City</label>
                        <select
                          className="w-full p-3 border rounded-md"
                          name="city"
                          value={formData.city}
                          onChange={handleCityChange}
                          required
                        >
                          <option value="">Select City</option>
                          {(statesWithCities[formData.state] || []).map(
                            (city) => (
                              <option key={city} value={city}>
                                {city}
                              </option>
                            )
                          )}
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-700 mb-2">Area</label>
                        <select
                          className="w-full p-3 border rounded-md"
                          name="area"
                          value={formData.area}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Area</option>
                          {(citiesWithAreas[formData.city] || []).map(
                            (area) => (
                              <option key={area} value={area}>
                                {area}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full p-3 border rounded-md pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                ),
              },
              {
                key: "2",
                label: "Operation Hours",
                children: (
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-6">
                      Operation Hours for {branch.branchName}
                    </h2>

                    <div className="mb-4 flex items-center">
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
                      <label htmlFor="selectAll">Select All Days</label>
                    </div>

                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border p-3 text-left">Day</th>
                          <th className="border p-3 text-left">Opening Time</th>
                          <th className="border p-3 text-left">Closing Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(operationHours).map(
                          ([day, { open, close, isSelected }]) => (
                            <tr key={day} className="border hover:bg-gray-50">
                              <td className="border p-3 flex items-center">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  className="mr-2"
                                  onChange={(e) =>
                                    setOperationHours((prev) => ({
                                      ...prev,
                                      [day]: {
                                        ...prev[day],
                                        isSelected: e.target.checked,
                                      },
                                    }))
                                  }
                                />
                                {day}
                              </td>
                              <td className="border p-3">
                                <input
                                  type="time"
                                  value={open}
                                  disabled={!isSelected}
                                  className={`w-full p-2 border rounded ${
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
                              <td className="border p-3">
                                <input
                                  type="time"
                                  value={close}
                                  disabled={!isSelected}
                                  className={`w-full p-2 border rounded ${
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

                    <div className="flex justify-end mt-6 space-x-3">
                      <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmitHours}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Save Hours
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

export default EditBranch;
