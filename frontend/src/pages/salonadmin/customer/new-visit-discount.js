import React from 'react';

const ClientInfo = ({ client }) => {
  // Dummy data for visit codes
  const visitCodes = [
    {
      discountCode: 'WELCOME50',
      discount: '50%',
      sentOn: '2025-04-01',
      validFrom: '2025-04-05',
      location: 'Fatehpur',
    },
    {
      discountCode: 'SPRING20',
      discount: '20%',
      sentOn: '2025-03-20',
      validFrom: '2025-03-25',
      location: 'Delhi',
    },
    {
      discountCode: 'SALONNEW10',
      discount: '10%',
      sentOn: '2025-04-10',
      validFrom: '2025-04-15',
      location: 'Mumbai',
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">New Visit Code</h2>

      {/* Discount Code Table */}
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Discount Code</th>
            <th className="border px-3 py-2">Discount</th>
            <th className="border px-3 py-2">Sent On</th>
            <th className="border px-3 py-2">Valid From</th>
            <th className="border px-3 py-2">Location</th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {visitCodes.map((code, index) => (
            <tr key={index}>
              <td className="border px-3 py-2">{code.discountCode}</td>
              <td className="border px-3 py-2">{code.discount}</td>
              <td className="border px-3 py-2">{code.sentOn}</td>
              <td className="border px-3 py-2">{code.validFrom}</td>
              <td className="border px-3 py-2">{code.location}</td>
              <td className="border px-3 py-2 text-center">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientInfo;