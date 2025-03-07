import { createSlice } from '@reduxjs/toolkit';

const branchSlice = createSlice({
  name: 'branch',
  initialState: {
    selectedBranch: null,
  },
  reducers: {
    setBranch: (state, action) => {
      state.selectedBranch = action.payload;
    },
  },
});

export const { setBranch } = branchSlice.actions;
export default branchSlice.reducer;