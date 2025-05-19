import React, { useState, useEffect } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // To access the selected branch
import axios from "../../../api/axiosConfig";

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
  // Access the selected branch from Redux store
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

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
  const [categoriesData, setCategoriesData] = useState([]); // State to hold structured category data

  // Function to fetch services from the API
 const fetchServices = async () => {
  if (!selectedBranch) return;
  setLoading(true);
  setError("");
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`/service/get-services`, {
      params: { branchId: selectedBranch },
      headers: { Authorization: `Bearer ${token}` },
    });

    // Debugging: Check actual response structure
    console.log('API Response:', response.data);
    
    const fetchedServices = response.data.services;
    
    // Debugging: Verify received services
    console.log('Fetched Services:', fetchedServices);
    
    // Clear previous data
    setServices(fetchedServices);
    
    // Structure services only if array is not empty
    if (fetchedServices.length > 0) {
      const structuredData = structureServices(fetchedServices);
      console.log('Structured Data:', structuredData); // Debug structure
      setCategoriesData(structuredData);
    } else {
      console.warn('Received empty services array');
      setCategoriesData([]);
    }
    
    setLoading(false);
  } catch (err) {
    setError("Failed to load services");
    console.error("Error fetching services:", err);
    setLoading(false);
  }
};

  // useEffect to fetch services when the component mounts or selectedBranch changes
  useEffect(() => {
    fetchServices();
  }, [selectedBranch]);

  // Function to structure the flat service list into categories and subcategories
  const structureServices = (services) => {
    const structured = {};
    services.forEach((service) => {
      if (!structured[service.category]) {
        structured[service.category] = {
          category: service.category,
          subcategories: {},
        };
      }
      if (!structured[service.category].subcategories[service.subcategory]) {
        structured[service.category].subcategories[service.subcategory] = {
          name: service.subcategory,
          services: [],
        };
      }
      structured[service.category].subcategories[
        service.subcategory
      ].services.push({
        ...service,
        status: service.active ? "active" : "inactive", // Add status for filtering
      });
    });

    // Convert the structured object into an array for rendering
    return Object.values(structured).map((categoryObj) => ({
      ...categoryObj,
      subcategories: Object.values(categoryObj.subcategories),
    }));
  };

  // Apply filters and search
  useEffect(() => {
    let result = [];
    categoriesData.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        let filteredSubcategoryServices = subcategory.services;

        // Apply location filter
        if (filters.location !== "all") {
          filteredSubcategoryServices = filteredSubcategoryServices.filter(
            (service) => service.branchId === filters.location // Assuming your service object has branchId
          );
        }

        // Apply status filter
        if (filters.status !== "all") {
          filteredSubcategoryServices = filteredSubcategoryServices.filter(
            (service) =>
              filters.status === "active" ? service.active : !service.active
          );
        }

        // Apply search
        if (searchTerm) {
          const term = searchTerm.toLowerCase();
          filteredSubcategoryServices = filteredSubcategoryServices.filter(
            (service) =>
              service.serviceName.toLowerCase().includes(term) ||
              service.category.toLowerCase().includes(term) ||
              service.subcategory.toLowerCase().includes(term)
          );
        }

        if (filteredSubcategoryServices.length > 0) {
          result = result.concat(filteredSubcategoryServices);
        }
      });
    });
    setFilteredServices(result);
  }, [filters, searchTerm, categoriesData]);

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

  const handleStatusChange = async (serviceId) => {
    const token = localStorage.getItem("token");
    const serviceToUpdate = services.find(
      (service) => service._id === serviceId
    );
    if (!serviceToUpdate) return;

    try {
      await axios.put(
        `/service/update-service/${serviceId}`, // Replace with your actual update endpoint
        { active: !serviceToUpdate.active },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // After successful update, refetch services to update the UI
      fetchServices();
    } catch (error) {
      console.error("Error updating service status:", error);
      setError("Failed to update service status");
    }
  };

  const handleEdit = (serviceId) => {
    console.log(`Edit service ${serviceId}`);
    // Implement edit functionality here, likely navigate to an edit page
  };

  const handleDelete = async (serviceId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`/service/delete-service/${serviceId}`, {
        // Replace with your actual delete endpoint
        headers: { Authorization: `Bearer ${token}` },
      });
      // After successful deletion, refetch services to update the UI
      fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      setError("Failed to delete service");
    }
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
                {/* Assuming your service object has branchId */}
                {Array.from(
                  new Set(services.map((service) => service.branchId))
                ).map((location) => (
                  <option key={location} value={location}>
                    {location}
                  </option>
                ))}
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

            {/* Category Filter (using toggle - can be adapted to a dropdown if needed) */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                // Add necessary props and options based on your category data
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {Array.from(new Set(services.map((service) => service.category))).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div> */}
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
            {categoriesData.length === 0 && !loading ? (
              <div className="p-6 text-center text-gray-500">
                No services available for the selected branch.
              </div>
            ) : (
              categoriesData.map((categoryData) => (
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
                        const subcategoryServices = subcategory.services.filter(
                          (service) =>
                            filteredServices.some(
                              (fs) => fs._id === service._id
                            ) // Ensure only filtered services are shown
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
                                            {/* <button
                                              onClick={() =>
                                                handleUpdate(service.id)
                                              }
                                              className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                                              title="Update"
                                            >
                                              <FiCheck size={16} />
                                            </button> */}
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
