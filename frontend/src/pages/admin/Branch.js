import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SalonBranchCreate = () => {
  const [salonAdmins, setSalonAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSalonAdmins();
  }, []);

  const fetchSalonAdmins = async () => {
    try {
      const { data } = await axios.get("/api/salon-admins"); // API to get salon admins
      const formattedAdmins = data.map((admin) => ({
        value: admin._id,
        label: `${admin.salonName} (${admin.ownerName})`,
      }));
      setSalonAdmins(formattedAdmins);
    } catch (error) {
      toast.error("Failed to fetch salon admins");
    }
  };

  const formik = useFormik({
    initialValues: {
      salonAdminId: "",
      branchName: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      salonAdminId: Yup.string().required("Salon Admin is required"),
      branchName: Yup.string().required("Branch Name is required"),
      city: Yup.string().required("City is required"),
      state: Yup.string().required("State is required"),
      country: Yup.string().required("Country is required"),
      phone: Yup.string().matches(/^\d{10}$/, "Phone must be 10 digits").required("Phone is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const response = await axios.post("/api/branches/create", values, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // Pass auth token
        });

        toast.success(response.data.message);
        resetForm();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to create branch");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">Create Salon Branch</h2>
      <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
        {/* Salon Admin Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Salon Admin</label>
          <Select
            options={salonAdmins}
            onChange={(selectedOption) => formik.setFieldValue("salonAdminId", selectedOption.value)}
            onBlur={() => formik.setFieldTouched("salonAdminId", true)}
          />
          {formik.touched.salonAdminId && formik.errors.salonAdminId && (
            <p className="text-red-500 text-sm">{formik.errors.salonAdminId}</p>
          )}
        </div>

        {/* Branch Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Branch Name</label>
          <input
            type="text"
            name="branchName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.branchName}
            className="w-full p-2 border rounded-lg"
          />
          {formik.touched.branchName && formik.errors.branchName && (
            <p className="text-red-500 text-sm">{formik.errors.branchName}</p>
          )}
        </div>

        {/* Address Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              className="w-full p-2 border rounded-lg"
            />
            {formik.touched.city && formik.errors.city && <p className="text-red-500 text-sm">{formik.errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
              className="w-full p-2 border rounded-lg"
            />
            {formik.touched.state && formik.errors.state && <p className="text-red-500 text-sm">{formik.errors.state}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.country}
              className="w-full p-2 border rounded-lg"
            />
            {formik.touched.country && formik.errors.country && <p className="text-red-500 text-sm">{formik.errors.country}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.zipCode}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {/* Phone & Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="text"
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            className="w-full p-2 border rounded-lg"
          />
          {formik.touched.phone && formik.errors.phone && <p className="text-red-500 text-sm">{formik.errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full p-2 border rounded-lg"
          />
          {formik.touched.email && formik.errors.email && <p className="text-red-500 text-sm">{formik.errors.email}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Branch"}
        </button>
      </form>
    </div>
  );
};

export default SalonBranchCreate;
