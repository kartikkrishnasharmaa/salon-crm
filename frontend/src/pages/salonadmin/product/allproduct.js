import React, { useState, useEffect } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { Link } from "react-router-dom";
import {
  FiPlus,
  FiTrash2,
  FiChevronDown,
  FiChevronRight,
  FiCheck,
  FiX,
  FiEdit2,
  FiFilter,
  FiSearch,
} from "react-icons/fi";

const ViewProducts = () => {
  // Dummy data structure with categories and products
  const dummyData = [
    {
      category: "Hair Care",
      products: [
        {
          id: 1,
          name: "Shampoo",
          productCode: "SHMP001",
          brand: "L'Oreal",
          costPrice: "₹200",
          sellingPrice: "₹350",
          quantity: 50,
          hsnCode: "33051000",
          gstRate: "18%",
          status: "active",
          location: "Delhi",
        },
        {
          id: 2,
          name: "Hair Conditioner",
          productCode: "COND002",
          brand: "Wella",
          costPrice: "₹180",
          sellingPrice: "₹300",
          quantity: 35,
          hsnCode: "33051000",
          gstRate: "18%",
          status: "active",
          location: "Mumbai",
        },
      ],
    },
    {
      category: "Skin Care",
      products: [
        {
          id: 3,
          name: "Face Cream",
          productCode: "FACE003",
          brand: "Cetaphil",
          costPrice: "₹250",
          sellingPrice: "₹450",
          quantity: 20,
          hsnCode: "33049900",
          gstRate: "12%",
          status: "active",
          location: "Delhi",
        },
        {
          id: 4,
          name: "Sunscreen",
          productCode: "SUN004",
          brand: "Neutrogena",
          costPrice: "₹300",
          sellingPrice: "₹500",
          quantity: 15,
          hsnCode: "33049900",
          gstRate: "12%",
          status: "inactive",
          location: "Bangalore",
        },
      ],
    },
    {
      category: "Nail Care",
      products: [
        {
          id: 5,
          name: "Nail Polish",
          productCode: "NAIL005",
          brand: "OPI",
          costPrice: "₹150",
          sellingPrice: "₹280",
          quantity: 0,
          hsnCode: "33043000",
          gstRate: "18%",
          status: "inactive",
          location: "Bangalore",
        },
      ],
    },
  ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "all",
    status: "all",
  });
  const [expandedCategories, setExpandedCategories] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Initialize with dummy data
  useEffect(() => {
    setLoading(true);
    try {
      // Flatten the dummyData to create a products array
      const allProducts = dummyData.flatMap((category) =>
        category.products.map((product) => ({
          ...product,
          category: category.category,
        }))
      );
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setLoading(false);
    } catch (err) {
      setError("Failed to load products");
      setLoading(false);
    }
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = products;

    // Apply location filter
    if (filters.location !== "all") {
      result = result.filter(
        (product) => product.location === filters.location
      );
    }

    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter((product) =>
        filters.status === "active"
          ? product.status === "active"
          : product.status === "inactive"
      );
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.productCode.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      );
    }

    setFilteredProducts(result);
  }, [filters, searchTerm, products]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const resetFilters = () => {
    setFilters({
      location: "all",
      status: "all",
    });
    setSearchTerm("");
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleStatusChange = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? {
              ...product,
              status: product.status === "active" ? "inactive" : "active",
            }
          : product
      )
    );
  };

  const handleEdit = (productId) => {
    console.log(`Edit product ${productId}`);
    // Implement edit functionality here
  };

  const handleUpdate = (productId) => {
    console.log(`Update product ${productId}`);
    // Implement update functionality here
  };

  const handleDelete = (productId) => {
    console.log(`Delete product ${productId}`);
    // Implement delete functionality here
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <SAAdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Products Management</h2>

        {/* Buttons Row */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Link
            to="/salonadmin/create-product"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-md"
          >
            <FiPlus className="text-lg" /> Add New Product
          </Link>
          <Link
            to="/salonadmin/create-category"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-md"
          >
            <FiPlus className="text-lg" /> Add New Category
          </Link>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <FiFilter className="text-gray-600 text-xl" />
            <h3 className="text-lg font-semibold text-gray-700">
              Filter Products
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <select
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Locations</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>

            {/* Status Filter - Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Search Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Active Status
              </label>
              <div
                onClick={() =>
                  setFilters((prev) => ({
                    ...prev,
                    status: prev.status === "active" ? "inactive" : "active",
                  }))
                }
                className={`w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                  filters.status === "active" ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <div
                  className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
                    filters.status === "active"
                      ? "translate-x-8"
                      : "translate-x-0"
                  }`}
                ></div>
              </div>
              <span className="mt-1 text-sm text-gray-600">
                {filters.status === "active" ? "ON" : "OFF"}
              </span>
            </div>
          </div>
        </div>

        {/* Products List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            {filteredProducts.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No products found matching your criteria.
              </div>
            ) : (
              dummyData.map((categoryData) => {
                // Filter products for this category
                const categoryProducts = filteredProducts.filter(
                  (product) => product.category === categoryData.category
                );

                if (categoryProducts.length === 0) return null;

                return (
                  <div
                    key={categoryData.category}
                    className="border-b border-gray-200"
                  >
                    {/* Enhanced Category Header */}
                    <div
                      className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors group"
                      onClick={() => toggleCategory(categoryData.category)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                          <FiPlus className="text-gray-600 group-hover:text-blue-600 transition-colors" />
                        </div>
                        <h3 className="font-semibold text-lg text-gray-800">
                          {categoryData.category}
                        </h3>
                        <span className="text-sm text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                          {categoryProducts.length} products
                        </span>
                      </div>
                      {expandedCategories[categoryData.category] ? (
                        <FiChevronDown className="text-gray-600 text-lg" />
                      ) : (
                        <FiChevronRight className="text-gray-600 text-lg" />
                      )}
                    </div>

                    {/* Products Table - only shown when category is expanded */}
                    {expandedCategories[categoryData.category] && (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Product Name
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Code
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Brand
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Cost Price
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Selling Price
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Stock
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {categoryProducts.map((product) => (
                              <tr key={product.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                  {product.name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {product.productCode}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {product.brand}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {product.costPrice}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {product.sellingPrice}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs ${
                                      product.quantity > 10
                                        ? "bg-green-100 text-green-800"
                                        : product.quantity > 0
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {product.quantity} in stock
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <button
                                    onClick={() =>
                                      handleStatusChange(product.id)
                                    }
                                    className={`p-1 rounded-full ${
                                      product.status === "active"
                                        ? "bg-green-100 text-green-600"
                                        : "bg-red-100 text-red-600"
                                    }`}
                                  >
                                    {product.status === "active" ? (
                                      <FiCheck />
                                    ) : (
                                      <FiX />
                                    )}
                                  </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  <div className="flex space-x-2">
                                    <button
                                      onClick={() => handleEdit(product.id)}
                                      className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                      title="Edit"
                                    >
                                      <FiEdit2 size={16} />
                                    </button>
                                    <button
                                      onClick={() => handleUpdate(product.id)}
                                      className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                      title="Update"
                                    >
                                      <FiCheck size={16} />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(product.id)}
                                      className="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                                      title="Delete"
                                    >
                                      <FiTrash2 size={16} />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </SAAdminLayout>
  );
};

export default ViewProducts;
