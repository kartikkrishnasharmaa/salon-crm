import React from 'react';
import { 
    FaUser, FaPhone, FaEnvelope, FaLock,
  } from "react-icons/fa";
const ClientInfo = ({ client }) => {
    return (
        <div className="space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-semibold">Customer ID</label>
                    <div className="flex items-center border p-2 rounded-md">
                        <FaUser className="text-gray-500 mr-2" />
                        <input type="text" value={client.id} readOnly className="w-full bg-gray-100 border-none" />
                    </div>
                </div>
                <div>
                    <label className="block font-semibold">App User</label>
                    <select className="w-full border p-2 rounded-md">
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-semibold">First Name</label>
                    <input type="text" value={client.name.split(' ')[0]} className="w-full border p-2 rounded-md" />
                </div>
                <div>
                    <label className="block font-semibold">Last Name</label>
                    <input type="text" value={client.name.split(' ')[1] || ''} className="w-full border p-2 rounded-md" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-semibold">Gender</label>
                    <div className="flex items-center gap-4">
                        <label><input type="radio" name="gender" value="Male" checked={client.gender === 'Male'} /> Male</label>
                        <label><input type="radio" name="gender" value="Female" checked={client.gender === 'Female'} /> Female</label>
                    </div>
                </div>
                <div>
                    <label className="block font-semibold">Client Status</label>
                    <select className="w-full border p-2 rounded-md">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-semibold">ISD Code & Mobile</label>
                    <div className="flex items-center border p-2 rounded-md">
                        <FaPhone className="text-gray-500 mr-2" />
                        <input type="text" value={client.number} className="w-full border-none" />
                    </div>
                </div>
                <div>
                    <label className="block font-semibold">Email</label>
                    <div className="flex items-center border p-2 rounded-md">
                        <FaEnvelope className="text-gray-500 mr-2" />
                        <input type="text" value={client.email} className="w-full border-none" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-semibold">Birthday</label>
                    <input type="date" className="w-full border p-2 rounded-md" />
                </div>
                <div>
                    <label className="block font-semibold">Anniversary</label>
                    <input type="date" className="w-full border p-2 rounded-md" />
                </div>
            </div>

            <div>
                <label className="block font-semibold">Password</label>
                <div className="flex items-center border p-2 rounded-md">
                    <FaLock className="text-gray-500 mr-2" />
                    <input type="password" className="w-full border-none" />
                </div>
            </div>
        </div>
    );
};

export default ClientInfo;