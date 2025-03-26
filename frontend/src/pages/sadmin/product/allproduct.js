import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import SAAdminLayout from "../../../layouts/Salonadmin";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../../../api/axiosConfig";
import { FaBox, FaSpinner, } from "react-icons/fa";

const ViewProducts = () => {
  const selectedBranch = useSelector(state => state.branch.selectedBranch);
  const [products, setProducts] = useState({ products: [] });
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    if (selectedBranch) {
      console.log("Fetching Products for Branch ID:", selectedBranch);
      setLoading(true);
      setImageErrors({});
      
      axios.get(`/product/get-products?branchId=${selectedBranch}`, { 
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      .then(res => {
        setProducts(res.data);
        toast.success(`Found ${res.data.products?.length || 0} products`);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        toast.error(error.response?.data?.message || "Failed to load products");
      })
      .finally(() => setLoading(false));
    }
  }, [selectedBranch]);

  const getImageUrl = (imgPath) => {
    if (!imgPath) return null;
    if (imgPath.startsWith('/public/uploads/')) {
      return `/api/images${imgPath}`;
    }
    return imgPath;
  };

  const handleImageError = (productId) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  return (
    <SAAdminLayout>
      <div className="overflow-x-auto">
        <h1 className="text-2xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg shadow-blue-500/50">
          <FaBox className="inline mr-2" />
          Total Products: <strong>{products.products ? products.products.length : 0}</strong>
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <FaSpinner className="animate-spin text-blue-500 text-2xl mr-2" />
            <span>Loading products...</span>
          </div>
        ) : products.products && products.products.length > 0 ? (
          <table className="w-full border-collapse border border-gray-200 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4">S.No</th>
                {/* <th className="border border-gray-300 p-2">Image</th> */}
                <th className="border border-gray-300 p-2">Name</th>
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Stock</th>
                <th className="border border-gray-300 p-2">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {products.products.map((product, index) => {
                const imageUrl = product.images?.[0] && getImageUrl(product.images[0]);
                const hasError = imageErrors[product._id];

                return (
                  <tr key={product._id} className="hover:bg-gray-50 text-center">
                    <td className="py-3 px-4 border">{index + 1}</td>
                    {/* <td className="border border-gray-300 p-2">
                      <div className="flex justify-center">
                        {imageUrl && !hasError ? (
                          <img 
                            src={imageUrl} 
                            alt={product.name}
                            className="h-12 w-12 rounded object-cover"
                            onError={() => handleImageError(product._id)}
                          />
                        ) : (
                          <div className="h-12 w-12 rounded bg-gray-100 flex items-center justify-center">
                            <FaImage className="text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td> */}
                    <td className="border border-gray-300 p-2">{product.name}</td>
                    <td className="border border-gray-300 p-2">{product.category}</td>
                    <td className="border border-gray-300 p-2">
                      ₹{product.price}
                      {product.mrp && product.mrp !== product.price && (
                        <span className="ml-2 text-xs text-gray-500 line-through">₹{product.mrp}</span>
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        product.stockQuantity > 10 ? 'bg-green-100 text-green-800' :
                        product.stockQuantity > 0 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {product.stockQuantity} {product.measurement || 'units'}
                      </span>
                    </td>
                    <td className="border border-gray-300 p-2">{new Date(product.updatedAt).toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FaBox className="mx-auto text-4xl mb-2" />
            <p>No products found for this branch</p>
          </div>
        )}
      </div>
      <ToastContainer />
    </SAAdminLayout>
  );
};

export default ViewProducts;