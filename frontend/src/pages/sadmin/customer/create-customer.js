import { useState } from "react";
import SAAdminLayout from "../../../layouts/Salonadmin";

function CreateCustomer() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [branchName, setBranchName] = useState("");
  const [address, setAddress] = useState("");
  const [preferredService, setPreferredService] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Customer created successfully!");
  };

  return (
    <SAAdminLayout>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-xl border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 drop-shadow-lg">
          Create ✂️ Salon Customer
        </h1>
        {message && (
          <p className="text-green-500 text-center font-medium">{message}</p>
        )}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 w-full"
              required
            />
          </div>
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Branch Name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
            required
          />
          <input
            type="text"
            placeholder="Preferred Service"
            value={preferredService}
            onChange={(e) => setPreferredService(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Notes (Special Instructions)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 col-span-1 md:col-span-2"
          ></textarea>
          <button
            type="submit"
            className="w-full md:col-span-2 p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition"
          >
            Create Customer
          </button>
        </form>
      </div>
    </SAAdminLayout>
  );
}

export default CreateCustomer;
