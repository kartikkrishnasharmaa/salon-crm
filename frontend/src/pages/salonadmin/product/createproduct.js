import { useState } from "react";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaBox, FaRupeeSign, FaBalanceScale } from "react-icons/fa";
import Tabs from "rc-tabs"; // ✅ Fix: Import as default
import "rc-tabs/assets/index.css";
import { Link } from "react-router-dom";

const hsnCodes = [
  { code: "3304", description: "Beauty/makeup preparations" },
  { code: "3305", description: "Hair care products" },
  {
    code: "3307",
    description: "Pre-shave, shaving or after-shave preparations",
  },
  // Add more HSN codes as needed
];
const brands = {
  "L'Oreal": {
    "Hair Care": ["Shampoo", "Conditioner", "Hair Mask"],
  },
  Nivea: {
    "Skin Care": ["Moisturizer", "Face Wash", "Sunscreen"],
  },
  "O.P.I": {
    "Nail Care": ["Nail Polish", "Nail Extensions"],
  },
};

function AllProducts() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");
  const [inclusiveTax, setInclusiveTax] = useState(false);
  const [mrp, setMrp] = useState("");
  const [hsnCode, setHsnCode] = useState("");
  const [barcode, setBarcode] = useState("");
  const [isConsumable, setIsConsumable] = useState("");
  const [isRetail, setIsRetail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("phone", phone);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("unit", unit);
      formData.append("inclusiveTax", inclusiveTax);
      formData.append("mrp", mrp);
      formData.append("hsnCode", hsnCode);
      formData.append("barcode", barcode);
      formData.append("isConsumable", isConsumable);
      formData.append("isRetail", isRetail);

      const response = await axios.post("/products/create", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const [locations, setLocations] = useState([
    { location: "Warehouse A", city: "New York", price: price || 0 },
    { location: "Store B", city: "Los Angeles", price: price || 0 },
    { location: "Warehouse C", city: "Chicago", price: price || 0 },
    { location: "Store D", city: "Houston", price: price || 0 },
  ]);

  const updatePrice = (index, newPrice) => {
    const updatedLocations = [...locations];
    updatedLocations[index].price = newPrice;
    setLocations(updatedLocations);
  };

  return (
    <SAAdminLayout>
      <div className="flex justify-center items-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-7xl space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Add Product 🛒
          </h1>
          {message && (
            <p className="text-red-500 text-center mb-4">{message}</p>
          )}

          <Tabs
            defaultActiveKey="1"
            className="custom-tabs p-5 space-x-4" // Add this
            items={[
              {
                key: "1",
                label: "Info",
                children: (
                  <>
                    <form onSubmit={handleSubmit} className="p-6">
                      <input
                        type="text"
                        placeholder="Product Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 border rounded-md mb-4"
                        required
                      />

                      {/* Brand Dropdown */}
                      <select
                        className="w-full p-3 border rounded-md mb-4"
                        value={brand}
                        onChange={(e) => {
                          setBrand(e.target.value);
                          setCategory("");
                          setSubCategory("");
                        }}
                        required
                      >
                        <option value="">Select Brand</option>
                        {Object.keys(brands).map((brandName) => (
                          <option key={brandName} value={brandName}>
                            {brandName}
                          </option>
                        ))}
                      </select>

                      {/* Category Dropdown */}
                      <select
                        className="w-full p-3 border rounded-md mb-4"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          setSubCategory("");
                        }}
                        disabled={!brand}
                        required
                      >
                        <option value="">Select Category</option>
                        {brand &&
                          Object.keys(brands[brand]).map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                      </select>

                      {/* Sub-Category Dropdown */}
                      <select
                        className="w-full p-3 border rounded-md mb-4"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        disabled={!category}
                        required
                      >
                        <option value="">Select Sub-Category</option>
                        {brand &&
                          category &&
                          brands[brand][category]?.map((subCat) => (
                            <option key={subCat} value={subCat}>
                              {subCat}
                            </option>
                          ))}
                      </select>

                      {/* HSN Code Dropdown */}
                      <select
                        className="w-full p-3 border rounded-md mb-4"
                        value={hsnCode}
                        onChange={(e) => setHsnCode(e.target.value)}
                        required
                      >
                        <option value="">Select HSN Code</option>
                        {hsnCodes.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.code} - {item.description}
                          </option>
                        ))}
                      </select>

                      {/* Quantity Section with Icon and Label */}
                      <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2 flex items-center">
                          <FaBalanceScale className="mr-2" />
                          <input
                            type="text"
                            placeholder="Quantity"
                            className="w-full p-3 border rounded-md mb-4"
                          />
                        </label>

                        <div className="flex space-x-4">
                          <div className="flex-1">
                            <label className="block text-sm text-gray-600 mb-1">
                              Unit
                            </label>
                            <select
                              className="w-full p-3 border rounded-md"
                              value={unit}
                              onChange={(e) => setUnit(e.target.value)}
                              required
                            >
                              <option value="">Choose Unit</option>
                              <option value="pcs">Pieces (pcs)</option>
                              <option value="ml">Milliliters (ml)</option>
                              <option value="g">Grams (g)</option>
                              <option value="L">Liters (L)</option>
                              <option value="kg">Kilograms (kg)</option>
                            </select>
                          </div>

                          <div className="flex-1">
                            <label className="block text-sm text-gray-600 mb-1">
                              Amount
                            </label>
                            <div className="relative">
                              <input
                                type="number"
                                placeholder="Enter quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full p-3 border rounded-md pl-10"
                                required
                              />
                              <span className="absolute left-3 top-3.5 text-gray-400">
                                Qty:
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price and MRP */}
                      <div className="flex space-x-4 mb-4">
                        <input
                          type="number"
                          placeholder="Purchase Price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          className="w-1/2 p-3 border rounded-md"
                          required
                        />
                        <input
                          type="number"
                          placeholder="MRP"
                          value={mrp}
                          onChange={(e) => setMrp(e.target.value)}
                          className="w-1/2 p-3 border rounded-md"
                          required
                        />
                      </div>
                      <div className="mb-4">
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaRupeeSign className="text-gray-400" />
                          </div>
                          <input
                            type="number"
                            placeholder="MRP"
                            className="w-full p-3 border rounded-md pl-10"
                          />
                        </div>
                      </div>
                      <div className="flex mb-4 ">
                        <label className="block text-gray-700 font-medium mb-2">
                          <FaBox className="inline mr-2" />
                          Consumable
                        </label>
                        <div className="flex items-center ml-5 space-x-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-blue-600"
                              name="consumable"
                              value="yes"
                              checked={isConsumable === "yes"}
                              onChange={(e) => setIsConsumable(e.target.value)}
                            />
                            <span className="ml-2">Yes</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-blue-600"
                              name="consumable"
                              value="no"
                              checked={isConsumable === "no"}
                              onChange={(e) => setIsConsumable(e.target.value)}
                            />
                            <span className="ml-2">No</span>
                          </label>
                        </div>
                      </div>
                      <div className="flex mb-4 ">
                        <label className="block text-gray-700 font-medium mb-2">
                          <FaBox className="inline mr-2" />
                          Retail
                        </label>
                        <div className="flex items-center ml-5 space-x-4">
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-blue-600"
                              name="consumable"
                              value="yes"
                              checked={isConsumable === "yes"}
                              onChange={(e) => setIsConsumable(e.target.value)}
                            />
                            <span className="ml-2">Yes</span>
                          </label>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              className="form-radio h-4 w-4 text-blue-600"
                              name="consumable"
                              value="no"
                              checked={isConsumable === "no"}
                              onChange={(e) => setIsConsumable(e.target.value)}
                            />
                            <span className="ml-2">No</span>
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full p-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
                      >
                        Add Product
                      </button>
                    </form>
                  </>
                ),
              },
              {
                key: "2",
                label: "Location",
                children: (
                  <div>
                    <div>
                      <div>
                        <div className="flex items-center mb-4">
                          <h2 className="text-xl font-bold mb-4">
                            Product Name: {name}
                          </h2>
                        </div>
                        <table className="w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-200">
                              <th className="border border-gray-300 p-2">
                                Location
                              </th>
                              <th className="border border-gray-300 p-2">
                                City
                              </th>
                              <th className="border border-gray-300 p-2">
                                Stock Available
                              </th>
                              <th className="border border-gray-300 p-2">
                                Retail Available
                              </th>
                              <th className="border border-gray-300 p-2">
                                Price
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {locations.map((item, index) => (
                              <tr
                                key={index}
                                className="border border-gray-300"
                              >
                                <td className="border border-gray-300 p-2">
                                  {item.location}
                                </td>
                                <td className="border border-gray-300 p-2">
                                  {item.city}
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                  <input type="checkbox" />
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                  <input type="checkbox" />
                                </td>
                                <td className="border border-gray-300 p-2">
                                  <input
                                    type="number"
                                    value={item.price}
                                    onChange={(e) =>
                                      updatePrice(index, e.target.value)
                                    }
                                    className="p-1 border rounded w-full"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="flex space-x-4 ml-4 mt-7 mb-6">
                      <Link className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                        Save
                      </Link>
                      <Link
                        to="/salonadmin/view-services"
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                      >
                        Cancel
                      </Link>
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
