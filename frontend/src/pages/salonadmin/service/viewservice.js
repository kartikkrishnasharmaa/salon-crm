import React, { useState, useEffect } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // To access selected branch
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
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ location: "all", status: "all" });
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedSubcategories, setExpandedSubcategories] = useState({});
  const [categoriesData, setCategoriesData] = useState([]);
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

    const fetchedServices = response.data.services; // ✅ Fix here

    if (Array.isArray(fetchedServices)) {
      setServices(fetchedServices);
      const structured = structureServices(fetchedServices);
      setCategoriesData(structured);
    } else {
      setServices([]);
      setCategoriesData([]);
    }

    setLoading(false);
  } catch (err) {
    setError("Failed to load services");
    setLoading(false);
  }
};


  useEffect(() => {
    fetchServices();
  }, [selectedBranch]);

  // Structure services by category > subcategory > services
  const structureServices = (services) => {
    const structured = {};
    services.forEach((service) => {
      const categoryName = service.category?.name || "Uncategorized";
      const subcategoryName = service.subCategory?.name || "Uncategorized";

      if (!structured[categoryName]) {
        structured[categoryName] = {
          category: categoryName,
          subcategories: {},
        };
      }
      if (!structured[categoryName].subcategories[subcategoryName]) {
        structured[categoryName].subcategories[subcategoryName] = {
          name: subcategoryName,
          services: [],
        };
      }
      structured[categoryName].subcategories[subcategoryName].services.push(
        service
      );
    });

    return Object.values(structured).map((cat) => ({
      ...cat,
      subcategories: Object.values(cat.subcategories),
    }));
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

  return (
    <SAAdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Services Management</h2>

        <div className="flex flex-wrap gap-4 mb-6">
          <Link
            to="/salonadmin/create-service"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-md"
          >
            <FiPlus /> Add New Service
          </Link>
          <Link
            to="/salonadmin/create-service-category"
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-md"
          >
            <FiPlus /> Add New Category
          </Link>
        </div>

        {/* Filter Section - Same as before */}
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
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Locations</option>
                {Array.from(new Set(services.map((s) => s.branchId))).map(
                  (loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <input
                  type="text"
                  placeholder="Search by service, category, or subcategory"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 focus:outline-none"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="p-2 text-gray-500 hover:text-gray-800"
                    aria-label="Clear search"
                  >
                    <FiX />
                  </button>
                )}
                <button
                  onClick={() => {
                    setFilters({ location: "all", status: "all" });
                    setSearchTerm("");
                  }}
                  className="p-2 text-blue-600 hover:text-blue-900"
                  aria-label="Reset filters"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Display services */}
        {loading && <p>Loading services...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && categoriesData.length === 0 && (
          <p className="text-gray-600">No services found.</p>
        )}

        <div className="space-y-6">
          {categoriesData.map((category) => (
            <div
              key={category.category}
              className="border border-gray-300 rounded-lg shadow-sm p-4"
            >
              {/* Category Header */}
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleCategory(category.category)}
              >
                <div className="flex items-center gap-2">
                  {expandedCategories[category.category] ? (
                    <FiChevronDown />
                  ) : (
                    <FiChevronRight />
                  )}
                  <h3 className="text-xl font-semibold">{category.category}</h3>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Add subcategory for", category.category);
                  }}
                  className="text-green-600 hover:text-green-800"
                  title="Add Subcategory"
                >
                  <FiPlus />
                </button>
              </div>

              {/* Subcategories */}
              {expandedCategories[category.category] && (
                <div className="mt-3 pl-6 space-y-4">
                  {category.subcategories.map((subcategory) => {
                    const subKey = `${category.category}-${subcategory.name}`;
                    return (
                      <div
                        key={subKey}
                        className="border border-gray-200 rounded-md p-3 bg-white"
                      >
                        {/* Subcategory Header */}
                        <div
                          className="flex items-center justify-between cursor-pointer"
                          onClick={() =>
                            toggleSubcategory(
                              category.category,
                              subcategory.name
                            )
                          }
                        >
                          <div className="flex items-center gap-2 font-semibold text-gray-700">
                            {expandedSubcategories[subKey] ? (
                              <FiChevronDown />
                            ) : (
                              <FiChevronRight />
                            )}
                            {subcategory.name}
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log(
                                  "Edit Subcategory",
                                  subcategory.name
                                );
                              }}
                              className="text-blue-600 hover:text-blue-800"
                              title="Edit Subcategory"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                console.log(
                                  "Delete Subcategory",
                                  subcategory.name
                                );
                              }}
                              className="text-red-600 hover:text-red-800"
                              title="Delete Subcategory"
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>

                        {/* Services */}
                        {expandedSubcategories[subKey] && (
                          <div className="mt-2 pl-6 space-y-3">
                            {subcategory.services.map((service) => (
                              <div
                                key={service._id}
                                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-md p-2"
                              >
                                <div>
                                  <p className="font-medium">
                                    {service.serviceName}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    {service.description}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    Price: ₹{service.nonMemberPrice} (Non-Member), 
                                    ₹{service.memberPrice} (Member)
                                  </p>
                                </div>
                                <div className="flex items-center gap-4">
                                  <button
                                    onClick={() => console.log("Edit", service._id)}
                                    title="Edit Service"
                                    className="text-blue-600 hover:text-blue-800"
                                  >
                                    <FiEdit2 />
                                  </button>
                                  <button
                                    onClick={() => console.log("Delete", service._id)}
                                    title="Delete Service"
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <FiTrash2 />
                                  </button>
                                  <button
                                    onClick={() => console.log("Toggle Status", service._id)}
                                    title="Toggle Status"
                                    className={`${
                                      service.status === "active"
                                        ? "text-green-600 hover:text-green-800"
                                        : "text-gray-400 hover:text-gray-600"
                                    }`}
                                  >
                                    {service.status === "active" ? (
                                      <FiCheck />
                                    ) : (
                                      <FiX />
                                    )}
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </SAAdminLayout>
  );
};

export default ViewServices;