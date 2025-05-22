import React from 'react';

const BookingSummary = ({ bookingSummary, removeService }) => {
  return (
    <div className="w-full bg-gray-100 p-4 rounded-md shadow-md mb-4">
      <h3 className="text-lg font-bold mb-2">Booking Summary</h3>
      {bookingSummary.length > 0 ? (
        <>
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2">Service</th>
                <th className="border border-gray-300 p-2">Staff</th>
                <th className="border border-gray-300 p-2">Price</th>
                <th className="border border-gray-300 p-2">Date</th>
                <th className="border border-gray-300 p-2">Time</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookingSummary.map((booking, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">
                    {booking.service}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {booking.staff}
                  </td>
                  <td className="border border-gray-300 p-2">
                    ₹{booking.price}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {booking.date}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {booking.time}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => removeService(booking.service)}
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-right">
            <span className="font-semibold">Total Bill: </span>
            <span className="font-bold">
              ₹
              {bookingSummary.reduce(
                (total, booking) => total + booking.price,
                0
              )}
            </span>
          </div>
        </>
      ) : (
        <p className="text-center">No services selected.</p>
      )}
    </div>
  );
};

export default BookingSummary;