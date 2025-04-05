import React, { useState } from "react"; // Import useState hook
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaMapMarkerAlt,FaPhone, FaRupeeSign } from "react-icons/fa";
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

  const statesWithCities = {
    Maharashtra: ["Mumbai", "Pune", "Nagpur"],
    Karnataka: ["Bangalore", "Mysore", "Mangalore"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara"],
    Rajasthan: ["Jaipur", "Udaipur", "Jodhpur"]
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
    Jodhpur: ["Ratanada", "Shastri Nagar", "Basni"]
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

          <Tabs
            defaultActiveKey="1"
            className="custom-tabs gap-5"
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
                      className="w-full p-3 border rounded-md mb-4"
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
                      placeholder="Brand Name"
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
                  </div>
                ),
              },
              {
                key: "3",
                className: "ml-4",
                label: "Service & Price Setting",
                children: (
                  <div>
                    <h2 className="text-xl font-bold mt-9">Location name</h2>
                  </div>
                ),
              },
              {
                key: "4",
                className: "ml-4",
                label: "Product & Price Setting",
                children: (
                  <div>
                    <h2 className="text-xl font-bold mt-9">Location name</h2>
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