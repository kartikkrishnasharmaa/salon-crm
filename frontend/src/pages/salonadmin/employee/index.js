import { useState } from "react";
import axios from "../../../api/axiosConfig";
import SAAdminLayout from "../../../layouts/Salonadmin";
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaMapMarkerAlt, FaVenusMars } from "react-icons/fa";
import Tabs from "rc-tabs";
import "rc-tabs/assets/index.css";

const positions = [
  { id: 1, name: "Stylist" },
  { id: 2, name: "Receptionist" },
  { id: 3, name: "Manager" },
  { id: 4, name: "Beautician" },
  { id: 5, name: "Hair Specialist" },
];

const salons = [
  { id: 1, name: "Main Branch", location: "Downtown" },
  { id: 2, name: "Westside Salon", location: "West District" },
  { id: 3, name: "Uptown Beauty", location: "Uptown" },
];

function CreateEmployee() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [assignedSalon, setAssignedSalon] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("position", position);
      formData.append("salary", salary);
      formData.append("gender", gender);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("joiningDate", joiningDate);
      formData.append("assignedSalon", assignedSalon);
      formData.append("emergencyContact", emergencyContact);

      const response = await axios.post("/employees/create", formData, {
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

  return (
    <SAAdminLayout>
      <div className="flex justify-center items-center bg-gray-100 p-4">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-7xl space-y-6">
          <div className="flex justify-center mb-6">
            <FaUser className="text-5xl text-blue-500" />
          </div>
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Add New Employee
          </h1>
          {message && (
            <p className="text-red-500 text-center mb-4">{message}</p>
          )}

          <Tabs
            defaultActiveKey="1"
            className="custom-tabs"
            items={[
              {
                key: "1",
                label: "Basic Info",
                children: (
                  <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1">First Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full p-3 border rounded-md pl-10"
                            required
                          />
                          <FaUser className="absolute left-3 top-3.5 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full p-3 border rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1">Email</label>
                        <div className="relative">
                          <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-md pl-10"
                            required
                          />
                          <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1">Phone</label>
                        <div className="relative">
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-3 border rounded-md pl-10"
                            required
                          />
                          <FaPhone className="absolute left-3 top-3.5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Address</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full p-3 border rounded-md pl-10"
                          required
                        />
                        <FaMapMarkerAlt className="absolute left-3 top-3.5 text-gray-400" />
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1">Position</label>
                        <select
                          className="w-full p-3 border rounded-md"
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          required
                        >
                          <option value="">Select Position</option>
                          {positions.map((pos) => (
                            <option key={pos.id} value={pos.id}>
                              {pos.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1">Salary</label>
                        <div className="relative">
                          <input
                            type="number"
                            placeholder="Monthly Salary"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            className="w-full p-3 border rounded-md pl-10"
                            required
                          />
                          <span className="absolute left-3 top-3.5 text-gray-400">$</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1">Gender</label>
                        <div className="relative">
                          <select
                            className="w-full p-3 border rounded-md pl-10"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                          <FaVenusMars className="absolute left-3 top-3.5 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1">Date of Birth</label>
                        <input
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="w-full p-3 border rounded-md"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full p-3 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
                    >
                      Add Employee
                    </button>
                  </form>
                ),
              },
              {
                key: "2",
                label: "Employment Details",
                children: (
                  <div className="p-6 space-y-4">
                    <div className="flex space-x-4">
                      <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1">Joining Date</label>
                        <input
                          type="date"
                          value={joiningDate}
                          onChange={(e) => setJoiningDate(e.target.value)}
                          className="w-full p-3 border rounded-md"
                          required
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm text-gray-600 mb-1">Assigned Salon</label>
                        <select
                          className="w-full p-3 border rounded-md"
                          value={assignedSalon}
                          onChange={(e) => setAssignedSalon(e.target.value)}
                          required
                        >
                          <option value="">Select Salon</option>
                          {salons.map((salon) => (
                            <option key={salon.id} value={salon.id}>
                              {salon.name} ({salon.location})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Emergency Contact</label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="Emergency Contact Number"
                          value={emergencyContact}
                          onChange={(e) => setEmergencyContact(e.target.value)}
                          className="w-full p-3 border rounded-md pl-10"
                          required
                        />
                        <FaPhone className="absolute left-3 top-3.5 text-gray-400" />
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-bold mb-2">Employee Documents</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">ID Proof</label>
                          <input
                            type="file"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Address Proof</label>
                          <input
                            type="file"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Qualifications</label>
                          <input
                            type="file"
                            className="w-full p-2 border rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                key: "3",
                label: "Permissions",
                children: (
                  <div className="p-6">
                    <h3 className="font-bold mb-4">System Access Permissions</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-5 w-5" />
                        <span>Access to Appointment Management</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-5 w-5" />
                        <span>Access to Customer Records</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-5 w-5" />
                        <span>Access to Inventory</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-5 w-5" />
                        <span>Access to Sales Reports</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-5 w-5" />
                        <span>Access to Financial Data</span>
                      </label>
                    </div>

                    <h3 className="font-bold mt-6 mb-4">Service Permissions</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-5 w-5" />
                        <span>Hair Services</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-5 w-5" />
                        <span>Skin Services</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-5 w-5" />
                        <span>Nail Services</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-5 w-5" />
                        <span>Makeup Services</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-5 w-5" />
                        <span>Massage Services</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" className="h-5 w-5" />
                        <span>Waxing Services</span>
                      </label>
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

export default CreateEmployee;
