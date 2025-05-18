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

const ViewServices = () => {
  // Dummy data structure with categories, subcategories and services
  const dummyData = [
    {
      category: "Hair Services",
      subcategories: [
        {
          name: "Cutting & Styling",
          services: [
            {
              id: 1,
              serviceName: "Haircut",
              time: "45 mins",
              memberPrice: "₹500",
              nonMemberPrice: "₹600",
              active: true,
              location: "Delhi",
            },
            {
              id: 2,
              serviceName: "Haircut + Beard",
              time: "60 mins",
              memberPrice: "₹800",
              nonMemberPrice: "₹950",
              active: true,
              location: "Mumbai",
            },
          ],
        },
        {
          name: "Coloring",
          services: [
            {
              id: 3,
              serviceName: "Global Hair Color",
              time: "90 mins",
              memberPrice: "₹1200",
              nonMemberPrice: "₹1500",
              active: true,
              location: "Bangalore",
            },
            {
              id: 4,
              serviceName: "Highlights",
              time: "120 mins",
              memberPrice: "₹1800",
              nonMemberPrice: "₹2200",
              active: false,
              location: "Delhi",
            },
          ],
        },
      ],
    },
    {
      category: "Skin Care",
      subcategories: [
        {
          name: "Facials",
          services: [
            {
              id: 5,
              serviceName: "Basic Facial",
              time: "60 mins",
              memberPrice: "₹800",
              nonMemberPrice: "₹1000",
              active: true,
              location: "Mumbai",
            },
          ],
        },
      ],
    },
    {
      category: "Beard Grooming",
      subcategories: [
        {
          name: "Beard Services",
          services: [
            {
              id: 6,
              serviceName: "Beard Trim",
              time: "30 mins",
              memberPrice: "₹300",
              nonMemberPrice: "₹400",
              active: true,
              location: "Bangalore",
            },
            {
              id: 7,
              serviceName: "Beard Spa",
              time: "45 mins",
              memberPrice: "₹600",
              nonMemberPrice: "₹750",
              active: true,
              location: "Delhi",
            },
          ],
        },
      ],
    },
  ];

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "all",
    status: "all",
  });
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubcategories, setExpandedSubcategories] = useState({});
  const [filteredServices, setFilteredServices] = useState([]);

  // Initialize with dummy data
  useEffect(() => {
    setLoading(true);
    try {
      // Flatten the dummyData to create a services array
      const allServices = dummyData.flatMap((category) =>
        category.subcategories.flatMap((subcategory) =>
          subcategory.services.map((service) => ({
            ...service,
            category: category.category,
            subcategory: subcategory.name,
            status: service.active ? "active" : "inactive",
          }))
        )
      );
      setServices(allServices);
      setFilteredServices(allServices);
      setLoading(false);
    } catch (err) {
      setError("Failed to load services");
      setLoading(false);
    }
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = services;

    // Apply location filter
    if (filters.location !== "all") {
      result = result.filter(
        (service) => service.location === filters.location
      );
    }

    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter((service) =>
        filters.status === "active" ? service.active : !service.active
      );
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (service) =>
          service.serviceName.toLowerCase().includes(term) ||
          service.category.toLowerCase().includes(term) ||
          service.subcategory.toLowerCase().includes(term)
      );
    }

    setFilteredServices(result);
  }, [filters, searchTerm, services]);

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

  const toggleSubcategory = (category, subcategory) => {
    const key = `${category}-${subcategory}`;
    setExpandedSubcategories((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleStatusChange = (serviceId) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === serviceId
          ? { ...service, active: !service.active }
          : service
      )
    );
  };

  const handleEdit = (serviceId) => {
    console.log(`Edit service ${serviceId}`);
    // Implement edit functionality here
  };

  const handleUpdate = (serviceId) => {
    console.log(`Update service ${serviceId}`);
    // Implement update functionality here
  };

  const handleDelete = (serviceId) => {
    console.log(`Delete service ${serviceId}`);
    // Implement delete functionality here
    setServices((prevServices) =>
      prevServices.filter((service) => service.id !== serviceId)
    );
  };

  return (
    <SAAdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Services Management</h2>
        {/* Buttons Row */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Link
            to="/salonadmin/create-service"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-md"
          >
            <FiPlus className="text-lg" /> Add New Service
          </Link>
          <Link
            to="/salonadmin/create-service-category"
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
              Filter Services
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
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-col justify-end">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category of Service
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

        {/* Services List */}
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
            {filteredServices.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No services found matching your criteria.
              </div>
            ) : (
              dummyData.map((categoryData) => (
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
                    </div>
                    {expandedCategories[categoryData.category] ? (
                      <FiChevronDown className="text-gray-600 text-lg" />
                    ) : (
                      <FiChevronRight className="text-gray-600 text-lg" />
                    )}
                  </div>

                  {/* Subcategories - only shown when category is expanded */}
                  {expandedCategories[categoryData.category] && (
                    <div className="divide-y divide-gray-200">
                      {categoryData.subcategories.map((subcategory) => {
                        const subKey = `${categoryData.category}-${subcategory.name}`;
                        const subcategoryServices = filteredServices.filter(
                          (service) =>
                            service.category === categoryData.category &&
                            service.subcategory === subcategory.name
                        );

                        if (subcategoryServices.length === 0) return null;

                        return (
                          <div key={subKey}>
                            {/* Subcategory Header */}
                            <div
                              className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-200 transition-colors pl-12"
                              onClick={() =>
                                toggleSubcategory(
                                  categoryData.category,
                                  subcategory.name
                                )
                              }
                            >
                              <h4 className="font-medium text-gray-700">
                                {subcategory.name}
                              </h4>
                              {expandedSubcategories[subKey] ? (
                                <FiChevronDown className="text-gray-600" />
                              ) : (
                                <FiChevronRight className="text-gray-600" />
                              )}
                            </div>

                            {/* Services Table - only shown when subcategory is expanded */}
                            {expandedSubcategories[subKey] && (
                              <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50">
                                    <tr>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Service Name
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Time
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Member Price
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Non-Member Price
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Active
                                      </th>
                                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white divide-y divide-gray-200">
                                    {subcategoryServices.map((service) => (
                                      <tr key={service.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                          {service.serviceName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {service.time}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {service.memberPrice}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          {service.nonMemberPrice}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          <button
                                            onClick={() =>
                                              handleStatusChange(service.id)
                                            }
                                            className={`p-1 rounded-full ${
                                              service.active
                                                ? "bg-green-100 text-green-600"
                                                : "bg-red-100 text-red-600"
                                            }`}
                                          >
                                            {service.active ? (
                                              <FiCheck />
                                            ) : (
                                              <FiX />
                                            )}
                                          </button>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                          <div className="flex space-x-2">
                                            <button
                                              onClick={() =>
                                                handleEdit(service.id)
                                              }
                                              className="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                                              title="Edit"
                                            >
                                              <FiEdit2 size={16} />
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleUpdate(service.id)
                                              }
                                              className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                              title="Update"
                                            >
                                              <FiCheck size={16} />
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleDelete(service.id)
                                              }
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
                      })}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </SAAdminLayout>
  );
};

export default ViewServices;
