import React, { useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminLayout from "../../layouts/AdminLayout";

const SalonBranchCreate = () => {
  const [salonAdmins, setSalonAdmins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSalonAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://192.168.43.15:5000/api/salon/view-all-salon-admins', {
          headers: { Authorization: token },
        });
        console.log("Salon Admins list Data:", response.data.salonAdmins); // Debugging
        setSalonAdmins(response.data.salonAdmins || []);
      } catch (error) {
        toast.error("Failed to fetch salon admins");
      }
    };

    fetchSalonAdmins();
  }, []);

  const validationSchema = Yup.object().shape({
    salonAdmin: Yup.string().required("Salon Admin is required"),
    branchName: Yup.string().required("Branch Name is required"),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post('http://192.168.43.15:5000/api/salon/create-branch', values, {
        headers: { Authorization: token },
      });
      toast.success("Branch created successfully");
      resetForm();
    } catch (error) {
      toast.error("Failed to create branch");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Create Salon Branch</h2>
        <Formik
          initialValues={{
            salonAdmin: "",
            branchName: "",
            address: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-700">
                  Select Salon Admin
                </label>
                <Field
                  as="select"
                  name="salonAdmin"
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select an Admin</option>
                  {salonAdmins.map((admin) => (
                    <option key={admin._id} value={admin._id}>
                      {admin.ownerName} - {admin.salonName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="salonAdmin"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Branch Name</label>
                <Field
                  type="text"
                  name="branchName"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="branchName"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <Field
                  type="text"
                  name="address"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Phone Number</label>
                <Field
                  type="text"
                  name="phone"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500"
                />
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                disabled={isSubmitting || loading}
              >
                {loading ? "Creating..." : "Create Branch"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </AdminLayout>
  );
};

export default SalonBranchCreate;
