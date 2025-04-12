import React, { useState } from "react"; // Import useState hook
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaMapMarkerAlt, FaPhone, FaRupeeSign } from "react-icons/fa";
import Tabs from "rc-tabs";
import "rc-tabs/assets/index.css";

function AllProducts() {
  // Initialize state for all required variables
  const [name, setName] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [mrp, setMrp] = useState("");
  const [barcode, setBarcode] = useState("");
  const [inclusiveTax, setInclusiveTax] = useState(false);
  const [isConsumable, setIsConsumable] = useState("");

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

  const [operationHours, setOperationHours] = useState(
    [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ].reduce((acc, day) => {
      acc[day] = { open: "09:00", close: "17:00", isSelected: true };
      return acc;
    }, {})
  );

  const handleTimeChange = (day, field, value) => {
    setOperationHours((prev) => ({
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
    setSelectedState(state);
    setSelectedCity(""); // Reset city when state changes
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

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
          <style>{tabsStyle}</style>

          <Tabs
            defaultActiveKey="1"
            className="custom-rc-tabs"

            items={[
              {
                key: "1",
                label: "Info",
                children: (
                  <form className="p-6">
                    <input
                      type="text"
                      placeholder="Location Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full text-black-900 p-3 border rounded-md mb-4"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Business Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border rounded-md mb-4"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 border rounded-md mb-4"
                      required
                    />

                    {/* State Dropdown */}
                    <select
                      className="w-full p-3 border rounded-md mb-4"
                      value={selectedState}
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

                    {/* City Dropdown - only shown when a state is selected */}
                    {selectedState && (
                      <select
                        className="w-full p-3 border rounded-md mb-4"
                        value={selectedCity}
                        onChange={handleCityChange}
                        required
                      >
                        <option value="">Select City</option>
                        {statesWithCities[selectedState].map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    )}

                    {/* Area Dropdown - only shown when a city is selected */}
                    {selectedCity && citiesWithAreas[selectedCity] && (
                      <select
                        className="w-full p-3 border rounded-md mb-4"
                        required
                      >
                        <option value="">Select Area</option>
                        {citiesWithAreas[selectedCity].map((area) => (
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
                          type="number"
                          placeholder="Phone Number"
                          className="w-full p-3 border rounded-md pl-10"
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
                className: "ml-4",
                label: "Operation Hour",
                children: (
                  <div>
                    <h2 className="text-xl font-bold mt-9">Location name</h2>
                    <div className="mt-4">
                      {/* Select All Checkbox */}
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

                      {/* Table */}
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-2 text-left">Day</th>
                            <th className="border p-2 text-left">
                              Opening Time
                            </th>
                            <th className="border p-2 text-left">
                              Closing Time
                            </th>
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

                      {/* Save/Cancel Buttons */}
                      <div className="flex justify-end mt-4 space-x-2">
                        <button
                          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                          onClick={() => console.log("Cancelled")}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                          onClick={() => console.log("Saved", operationHours)}
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
                className: "ml-4",
                label: "Service & Price Setting",
                children: (
                  <div>

                    {/* Table with Dummy Data */}
                    <div className="mt-6 overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border p-3 text-left">Category</th>
                            <th className="border p-3 text-left">
                              Sub Category
                            </th>
                            <th className="border p-3 text-left">
                              Service Name
                            </th>
                            <th className="border p-3 text-left">
                              Member Price ($)
                            </th>
                            <th className="border p-3 text-left">
                              Non-Member Price ($)
                            </th>
                            <th className="border p-3 text-left">Active</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Dummy Data Rows */}
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
                              <td className="border p-3">
                                {service.subCategory}
                              </td>
                              <td className="border p-3">
                                {service.serviceName}
                              </td>
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

                    {/* Action Buttons */}
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
                key: "4", // Change key as needed
                className: "ml-4",
                label: "Product & Price Setting",
                children: (
                  <div>
                    {/* Product Table */}
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
                          {/* Dummy Product Data */}
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
              
                    {/* Action Buttons */}
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

export default AllProducts;
