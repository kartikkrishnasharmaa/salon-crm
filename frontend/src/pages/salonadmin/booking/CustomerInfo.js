import React from 'react';

const CustomerInfo = ({
 mobile,
  handleMobileChange,
  customerData,
  setCustomerData,
  isNewCustomer,
  customersList
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <label className="font-semibold">Mobile Number</label>
        <input
          type="text"
          value={mobile}
          onChange={handleMobileChange}
          className="border rounded p-2 w-full"
          placeholder="Enter Mobile Number"
          maxLength="10"
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold">First Name</label>
        <input
          type="text"
          value={customerData.name}
          onChange={(e) =>
            setCustomerData({ ...customerData, name: e.target.value })
          }
          className={`border rounded p-2 w-full ${
            !isNewCustomer ? "bg-gray-100" : ""
          }`}
          placeholder="Customer Name"
          readOnly={!isNewCustomer}
          required
        />
      </div>

      <div className="flex flex-col">
        <label className="font-semibold">Last Name</label>
        <input
          type="text"
          value={customerData.lastName}
          onChange={(e) =>
            setCustomerData({
              ...customerData,
              lastName: e.target.value,
            })
          }
          className={`border rounded p-2 w-full ${
            !isNewCustomer ? "bg-gray-100" : ""
          }`}
          placeholder="Last Name"
          readOnly={!isNewCustomer}
        />
      </div>
      <div className="flex flex-col">
        <label className="font-semibold">Gender</label>
        <div className="flex space-x-4 mt-2">
          {["Male", "Female"].map((g) => (
            <label key={g} className="flex items-center space-x-2">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={customerData.gender === g}
                onChange={(e) =>
                  setCustomerData({
                    ...customerData,
                    gender: e.target.value,
                  })
                }
                className="form-radio"
                required
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;