import React from 'react';

const StaffSelection = ({
  staffType,
  handleStaffTypeChange,
  selectedStaff,
  handleStaffSelect,
  staffList
}) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col">
        <label className="font-semibold">Staff Type</label>
        <div className="flex space-x-4 mt-2">
          {["single", "multiple"].map((type) => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="radio"
                name="staffType"
                value={type}
                checked={staffType === type}
                onChange={() => handleStaffTypeChange(type)}
                className="form-radio"
                required
              />
              <span className="capitalize">
                {type === "single" ? "Single Staff" : "Multiple Staff"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {staffType === "single" && (
        <div className="flex flex-col mt-2">
          <label className="font-semibold">Select Staff</label>
          <select
            className="border rounded p-2 w-full"
            value={selectedStaff[0] || ""}
            onChange={(e) => handleStaffSelect([e.target.value])}
            required
          >
            <option value="">Select Staff</option>
            {staffList.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {staffType === "multiple" && (
        <div className="flex flex-col mt-2">
          <label className="font-semibold">Select Multiple Staff</label>
          <div className="border rounded p-2 w-full h-32 overflow-y-auto">
            {staffList.map((staff) => (
              <label
                key={staff._id}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  value={staff._id}
                  checked={selectedStaff.includes(staff._id)}
                  onChange={(e) => handleStaffSelect(e.target.value)}
                />
                <span>{staff.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffSelection;