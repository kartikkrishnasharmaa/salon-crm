import { createSlice } from "@reduxjs/toolkit";

const branchSlice = createSlice({
  name: "branch",
  initialState: {
    selectedBranch: null, // Currently selected branch
    employees: [],
    customers: [],
    appointments: [],
  },
  reducers: {
    setBranch: (state, action) => {
      state.selectedBranch = action.payload;
    },
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
  },
});

export const { setBranch, setEmployees, setCustomers, setAppointments } = branchSlice.actions;
export default branchSlice.reducer;
