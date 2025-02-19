import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBranch } from '../features/branch/branchSlice';
import { dummyBranches } from '../data/dummyData';

const BranchSelector = () => {
  const dispatch = useDispatch();
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

  const handleBranchChange = (event) => {
    dispatch(setBranch(event.target.value));
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <label className="block text-gray-700 font-semibold mb-2">
        Select Branch:
      </label>
      <select
        className="w-full p-2 border rounded-lg"
        value={selectedBranch || ''}
        onChange={handleBranchChange}
      >
        <option value="">-- Select a Branch --</option>
        {dummyBranches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BranchSelector;
