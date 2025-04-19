import React, { useState } from 'react';

const MergeInfo = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCode, setSelectedCode] = useState('');

  // Dummy client data
  const merge = [
    {
      code: 'C123',
      name: 'Amit Sharma',
      number: '9876543210',
      gender: 'Male',
      email: 'amit@example.com',
      baseBranch: 'Delhi',
      membershipPackage: 'Gold',
      isPrimary: true,
      isActive: true,
      location: 'Delhi',
    },
    {
      code: 'C123',
      name: 'Pooja Sharma',
      number: '9876543210',
      gender: 'Female',
      email: 'pooja@example.com',
      baseBranch: 'Delhi',
      membershipPackage: 'Gold',
      isPrimary: false,
      isActive: true,
      location: 'Delhi',
    },
    {
      code: 'C456',
      name: 'Rahul Verma',
      number: '9998887770',
      gender: 'Male',
      email: 'rahul@example.com',
      baseBranch: 'Fatehpur',
      membershipPackage: 'Silver',
      isPrimary: true,
      isActive: false,
      location: 'Fatehpur',
    },
    {
      code: 'C456',
      name: 'Rina Verma',
      number: '9998887770',
      gender: 'Female',
      email: 'rina@example.com',
      baseBranch: 'Fatehpur',
      membershipPackage: 'Silver',
      isPrimary: false,
      isActive: true,
      location: 'Fatehpur',
    },
  ];

  // Filter based on selected location and code
  const filteredClients = merge.filter(client => {
    return (
      (selectedLocation === '' || client.location === selectedLocation) &&
      (selectedCode === '' || client.code === selectedCode)
    );
  });

  const uniqueCodes = [...new Set(merge.map(client => client.code))];

  return (
    <div className="p-4">
      {/* Dropdowns */}
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block mb-1">Select Location</label>
          <select
            value={selectedLocation}
            onChange={e => setSelectedLocation(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">-- Select Location --</option>
            <option value="Delhi">Delhi</option>
            <option value="Fatehpur">Fatehpur</option>
          </select>
        </div>

        <div>
          <label className="block mb-1">Select Code</label>
          <select
            value={selectedCode}
            onChange={e => setSelectedCode(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="">-- Select Code --</option>
            {uniqueCodes.map(code => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Name</th>
            <th className="border px-3 py-2">Number</th>
            <th className="border px-3 py-2">Gender</th>
            <th className="border px-3 py-2">Email ID</th>
            <th className="border px-3 py-2">Base Branch</th>
            <th className="border px-3 py-2">Membership Package</th>
            <th className="border px-3 py-2">Merge</th>
            <th className="border px-3 py-2">Primary / Family Member</th>
            <th className="border px-3 py-2">Client Status</th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredClients.length > 0 ? (
            filteredClients.map((client, index) => (
              <tr key={index}>
                <td className="border px-3 py-2">{client.name}</td>
                <td className="border px-3 py-2">{client.number}</td>
                <td className="border px-3 py-2">{client.gender}</td>
                <td className="border px-3 py-2">{client.email}</td>
                <td className="border px-3 py-2">{client.baseBranch}</td>
                <td className="border px-3 py-2">{client.membershipPackage}</td>
                <td className="border px-3 py-2 text-center">
                  <input type="checkbox" />
                </td>
                <td className="border px-3 py-2">
                  {client.isPrimary ? 'Primary' : 'Family Member'}
                </td>
                <td className="border px-3 py-2">
                  {client.isActive ? 'Active' : 'Inactive'}
                </td>
                <td className="border px-3 py-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center py-4 text-gray-500">
                No clients found for the selected filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default MergeInfo;