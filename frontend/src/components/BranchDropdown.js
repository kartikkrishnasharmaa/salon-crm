import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBranch, setEmployees, setCustomers, setAppointments } from "../store/branchSlice";
import axios from "axios";

const BranchDropdown = ({ branches }) => {
  const dispatch = useDispatch();
  const selectedBranch = useSelector((state) => state.branch.selectedBranch);

  const fetchBranchData = async (branchId) => {
    const employees = await axios.get(`/api/employee/${branchId}`);
    const customers = await axios.get(`/api/customer/${branchId}`);
    const appointments = await axios.get(`/api/appointment/${branchId}`);

    dispatch(setEmployees(employees.data));
    dispatch(setCustomers(customers.data));
    dispatch(setAppointments(appointments.data));
  };

  return (
    <select onChange={(e) => {
      dispatch(setBranch(e.target.value));
      fetchBranchData(e.target.value);
    }}>
      <option value="">Select Branch</option>
      {branches.map((branch) => (
        <option key={branch._id} value={branch._id}>{branch.branchName}</option>
      ))}
    </select>
  );
};

export default BranchDropdown;
