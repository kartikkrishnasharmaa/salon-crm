import React, { useEffect, useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiPlus, FiEdit2, FiFilter, FiSearch } from "react-icons/fi";

const ViewProducts = () => {
  // Dummy data for products
  const dummyProducts = [
    {
      _id: "1",
      name: "Shampoo",
      productCode: "SHMP001",
      category: "Hair Care",
      brand: "L'Oreal",
      costPrice: 200,
      sellingPrice: 350,
      quantity: 50,
      hsnCode: "33051000",
      gstRate: 18,
      status: "active",
      createdAt: "2023-05-15T10:30:00Z",
      location: "Delhi"
    },
    {
      _id: "2",
      name: "Hair Conditioner",
      productCode: "COND002",
      category: "Hair Care",
      brand: "Wella",
      costPrice: 180,
      sellingPrice: 300,
      quantity: 35,
      hsnCode: "33051000",
      gstRate: 18,
      status: "active",
      createdAt: "2023-06-20T14:15:00Z",
      location: "Mumbai"
    },
    {
      _id: "3",
      name: "Face Cream",
      productCode: "FACE003",
      category: "Skin Care",
      brand: "Cetaphil",
      costPrice: 250,
      sellingPrice: 450,
      quantity: 20,
      hsnCode: "33049900",
      gstRate: 12,
      status: "active",
      createdAt: "2023-07-10T11:45:00Z",
      location: "Delhi"
    },
    {
      _id: "4",
      name: "Nail Polish",
      productCode: "NAIL004",
      category: "Nail Care",
      brand: "OPI",
      costPrice: 150,
      sellingPrice: 280,
      quantity: 0,
      hsnCode: "33043000",
      gstRate: 18,
      status: "inactive",
      createdAt: "2023-08-05T09:00:00Z",
      location: "Bangalore"
    },
    {
      _id: "5",
      name: "Massage Oil",
      productCode: "OIL005",
      category: "Spa",
      brand: "Forest Essentials",
      costPrice: 300,
      sellingPrice: 550,
      quantity: 15,
      hsnCode: "33049900",
      gstRate: 12,
      status: "active",
      createdAt: "2023-09-12T16:20:00Z",
      location: "Mumbai"
    },
  ];

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    location: "all",
    status: "all",
    category: "all"
  });

  // Initialize with dummy data
  useEffect(() => {
    setLoading(true);
    try {
      setProducts(dummyProducts);
      setFilteredProducts(dummyProducts);
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
      result = result.filter(product => product.location === filters.location);
    }
    
    // Apply status filter
    if (filters.status !== "all") {
      result = result.filter(product => product.status === filters.status);
    }
    
    // Apply category filter
    if (filters.category !== "all") {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(term) ||
        product.productCode.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term)
      );
    }
    
    setFilteredProducts(result);
  }, [filters, searchTerm, products]);

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
      status: "all",
      category: "all"
    });
    setSearchTerm("");
  };

  // Get unique categories for filter dropdown
  const productCategories = [...new Set(dummyProducts.map(p => p.category))];

  return (
    <SAAdminLayout>
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-6">Products</h2>
        
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
            <h3 className="text-lg font-semibold text-gray-700">Filter Products</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {productCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
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
              <ul className="divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <li key={product._id} className="p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-center">
                      <div className="w-full">
                        <div className="flex justify-between items-start w-full">
                          <div>
                            <h3 className="font-medium text-lg text-gray-800">{product.name} ({product.productCode})</h3>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                              <span>Brand: {product.brand}</span>
                              <span>Category: {product.category}</span>
                              <span>Cost: ₹{product.costPrice}</span>
                              <span>Price: ₹{product.sellingPrice}</span>
                              <span className={product.quantity > 0 ? "text-green-600" : "text-red-600"}>
                                Stock: {product.quantity}
                              </span>
                              <span>HSN: {product.hsnCode}</span>
                              <span>GST: {product.gstRate}%</span>
                              <span>Location: {product.location}</span>
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className={`px-2 py-1 rounded-full text-xs mb-2 ${
                              product.status === 'active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                            </span>
                            <span className="text-xs text-gray-400">
                              Created: {new Date(product.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <button 
                          className="p-2 text-blue-600 hover:text-blue-800 rounded-full hover:bg-blue-50 transition-colors"
                          title="Edit Product"
                        >
                          <FiEdit2 size={18} />
                        </button>
                        <button 
                          className="p-2 text-gray-600 hover:text-gray-800 rounded-full hover:bg-gray-100 transition-colors"
                          title="Add Stock"
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

export default ViewProducts;
// import React, { useEffect, useState } from "react";
// import { useSelector } from 'react-redux';
// import SAAdminLayout from "../../../layouts/Salonadmin";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "../../../api/axiosConfig";
// import { FaBox, FaSpinner, } from "react-icons/fa";

// const ViewProducts = () => {
//   const selectedBranch = useSelector(state => state.branch.selectedBranch);
//   const [products, setProducts] = useState({ products: [] });
//   const [loading, setLoading] = useState(true);
//   const [imageErrors, setImageErrors] = useState({});

//   useEffect(() => {
//     if (selectedBranch) {
//       console.log("Fetching Products for Branch ID:", selectedBranch);
//       setLoading(true);
//       setImageErrors({});
      
//       axios.get(`/product/get-products?branchId=${selectedBranch}`, { 
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//       })
//       .then(res => {
//         setProducts(res.data);
//         toast.success(`Found ${res.data.products?.length || 0} products`);
//       })
//       .catch(error => {
//         console.error("Error fetching products:", error);
//         toast.error(error.response?.data?.message || "Failed to load products");
//       })
//       .finally(() => setLoading(false));
//     }
//   }, [selectedBranch]);

//   const getImageUrl = (imgPath) => {
//     if (!imgPath) return null;
//     if (imgPath.startsWith('/public/uploads/')) {
//       return `/api/images${imgPath}`;
//     }
//     return imgPath;
//   };

//   const handleImageError = (productId) => {
//     setImageErrors(prev => ({ ...prev, [productId]: true }));
//   };

//   return (
//     <SAAdminLayout>
//       <div className="overflow-x-auto">
//         <h1 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg shadow-blue-500/50">
//           <FaBox className="inline mr-2" />
//           Total Products: <strong>{products.products ? products.products.length : 0}</strong>
//         </h1>

//         {loading ? (
//           <div className="flex justify-center items-center py-8">
//             <FaSpinner className="animate-spin text-blue-500 text-2xl mr-2" />
//             <span>Loading products...</span>
//           </div>
//         ) : products.products && products.products.length > 0 ? (
//           <table className="w-full border-collapse border border-gray-200 mt-4">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="py-3 px-4">S.No</th>
//                 {/* <th className="border border-gray-300 p-2">Image</th> */}
//                 <th className="border border-gray-300 p-2">Name</th>
//                 <th className="border border-gray-300 p-2">Category</th>
//                 <th className="border border-gray-300 p-2">Price</th>
//                 <th className="border border-gray-300 p-2">Stock</th>
//                 <th className="border border-gray-300 p-2">Updated At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.products.map((product, index) => {
//                 const imageUrl = product.images?.[0] && getImageUrl(product.images[0]);
//                 const hasError = imageErrors[product._id];

//                 return (
//                   <tr key={product._id} className="hover:bg-gray-50 text-center">
//                     <td className="py-3 px-4 border">{index + 1}</td>
//                     {/* <td className="border border-gray-300 p-2">
//                       <div className="flex justify-center">
//                         {imageUrl && !hasError ? (
//                           <img 
//                             src={imageUrl} 
//                             alt={product.name}
//                             className="h-12 w-12 rounded object-cover"
//                             onError={() => handleImageError(product._id)}
//                           />
//                         ) : (
//                           <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
//                             <FaImage className="text-gray-400" />
//                           </div>
//                         )}
//                       </div>
//                     </td> */}
//                     <td className="border border-gray-300 p-2">{product.name}</td>
//                     <td className="border border-gray-300 p-2">{product.category}</td>
//                     <td className="border border-gray-300 p-2">
//                       ₹{product.price}
//                       {product.mrp && product.mrp !== product.price && (
//                         <span className="ml-2 text-xs text-gray-500 line-through">₹{product.mrp}</span>
//                       )}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       <span className={`px-2 py-1 rounded-full text-xs ${
//                         product.stockQuantity > 10 ? 'bg-green-100 text-green-800' :
//                         product.stockQuantity > 0 ? 'bg-yellow-100 text-yellow-800' :
//                         'bg-red-100 text-red-800'
//                       }`}>
//                         {product.stockQuantity} {product.measurement || 'units'}
//                       </span>
//                     </td>
//                     <td className="border border-gray-300 p-2">{new Date(product.updatedAt).toLocaleString()}</td>
//                   </tr>
//                 )
//               })}
//             </tbody>
//           </table>
//         ) : (
//           <div className="text-center py-8 text-gray-500">
//             <FaBox className="mx-auto text-4xl mb-2" />
//             <p>No products found for this branch</p>
//           </div>
//         )}
//       </div>
//       <ToastContainer />
//     </SAAdminLayout>
//   );
// };

// export default ViewProducts;