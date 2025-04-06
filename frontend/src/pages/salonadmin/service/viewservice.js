import React, { useEffect, useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiPlus, FiEdit2, FiFilter, FiSearch } from "react-icons/fi";

const ViewServices = () => {
  // Dummy data for services
  const dummyServices = [
    {
      _id: "1",
      name: "Haircut",
      category: "Hair",
      type: "Standard",
      price: 500,
      duration: 45,
      status: "active",
      createdAt: "2023-05-15T10:30:00Z",
      location: "Delhi"
    },
    {
      _id: "2",
      name: "Beard Trim",
      category: "Beard",
      type: "Standard",
      price: 300,
      duration: 30,
      status: "active",
      createdAt: "2023-06-20T14:15:00Z",
      location: "Mumbai"
    },
    {
      _id: "3",
      name: "Hair Color",
      category: "Hair",
      type: "Premium",
      price: 1200,
      duration: 90,
      status: "active",
      createdAt: "2023-07-10T11:45:00Z",
      location: "Delhi"
    },
    {
      _id: "4",
      name: "Facial",
      category: "Skin",
      type: "Premium",
      price: 800,
      duration: 60,
      status: "inactive",
      createdAt: "2023-08-05T09:00:00Z",
      location: "Bangalore"
    },
    {
      _id: "5",
      name: "Head Massage",
      category: "Wellness",
      type: "Standard",
      price: 400,
      duration: 30,
      status: "active",
      createdAt: "2023-09-12T16:20:00Z",
      location: "Mumbai"
    },
  ];

  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "all",
    status: "all"
  });

  // Initialize with dummy data
  useEffect(() => {
    setLoading(true);
    try {
      setServices(dummyServices);
      setFilteredServices(dummyServices);
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
      result = result.filter(service => service.location === filters.location);
    }
    
    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter(service => service.status === filters.status);
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(service =>
        service.name.toLowerCase().includes(term) ||
        service.category.toLowerCase().includes(term)
      );
    }
    
    setFilteredServices(result);
  }, [filters, searchTerm, services]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const resetFilters = () => {
    setFilters({
      location: "all",
      status: "all"
    });
    setSearchTerm("");
  };

  return (
    <SAAdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Services</h2>
        
        {/* Buttons Row */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Link 
            to="/salonadmin/services/add-new-service" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-md"
          >
            <FiPlus className="text-lg" /> Add New Service
          </Link>
          <Link 
            to="/salonadmin/services/add-new-category" 
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors shadow-md"
          >
            <FiPlus className="text-lg" /> Add New Category
          </Link>
        </div>

        {/* Filter Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <FiFilter className="text-gray-600 text-xl" />
            <h3 className="text-lg font-semibold text-gray-700">Filter Services</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
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
            
            <div className="flex items-end gap-2">
              <button
                onClick={resetFilters}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors"
              >
                Reset Filters
              </button>
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
              <ul className="divide-y divide-gray-200">
                {filteredServices.map((service) => (
                  <li key={service._id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="w-full">
                        <div className="flex justify-between items-start w-full">
                          <div>
                            <h3 className="font-medium text-lg text-gray-800">{service.name}</h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                              <span>Category: {service.category}</span>
                              <span>Type: {service.type}</span>
                              <span>Price: ₹{service.price}</span>
                              <span>Duration: {service.duration} mins</span>
                              <span>Location: {service.location}</span>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            service.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                          </span>
                        </div>
                        <div className="mt-2 text-xs text-gray-400">
                          Created: {new Date(service.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button 
                          className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition-colors"
                          title="Edit Service"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button 
                          className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                          title="Add Variant"
                        >
                          <FiPlus size={18} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </SAAdminLayout>
  );
};

export default ViewServices;