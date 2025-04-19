import React from 'react';

const ClientInfo = () => {
  // Dummy invoice data
  const invoices = [
    {
      invoiceNumber: 'INV001',
      invoiceDate: '2025-03-10',
      item: 'Personal Training',
      invoiceAccount: 'John Doe',
      invoicePaid: 1500,
      invoiceDue: 500,
      paymentMethod: 'UPI',
      centerName: 'Delhi Center',
    },
    {
      invoiceNumber: 'INV002',
      invoiceDate: '2025-03-15',
      item: 'Gym Membership',
      invoiceAccount: 'Priya Singh',
      invoicePaid: 1000,
      invoiceDue: 0,
      paymentMethod: 'Cash',
      centerName: 'Fatehpur Center',
    },
    {
      invoiceNumber: 'INV003',
      invoiceDate: '2025-04-01',
      item: 'Zumba Classes',
      invoiceAccount: 'Rahul Verma',
      invoicePaid: 800,
      invoiceDue: 200,
      paymentMethod: 'Card',
      centerName: 'Delhi Center',
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Outstanding</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-3 py-2">Invoice Number</th>
            <th className="border px-3 py-2">Invoice Date</th>
            <th className="border px-3 py-2">Item</th>
            <th className="border px-3 py-2">Invoice Account</th>
            <th className="border px-3 py-2">Invoice Paid</th>
            <th className="border px-3 py-2">Invoice Due</th>
            <th className="border px-3 py-2">Payment Method</th>
            <th className="border px-3 py-2">Center Name</th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => (
            <tr key={index}>
              <td className="border px-3 py-2">{invoice.invoiceNumber}</td>
              <td className="border px-3 py-2">{invoice.invoiceDate}</td>
              <td className="border px-3 py-2">{invoice.item}</td>
              <td className="border px-3 py-2">{invoice.invoiceAccount}</td>
              <td className="border px-3 py-2">₹{invoice.invoicePaid}</td>
              <td className="border px-3 py-2 text-red-600 font-semibold">
                ₹{invoice.invoiceDue}
              </td>
              <td className="border px-3 py-2">{invoice.paymentMethod}</td>
              <td className="border px-3 py-2">{invoice.centerName}</td>
              <td className="border px-3 py-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                  View
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