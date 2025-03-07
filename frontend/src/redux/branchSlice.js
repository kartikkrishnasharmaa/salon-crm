import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedBranch: localStorage.getItem('selectedBranch') || null, // ✅ Load from localStorage
};

const branchSlice = createSlice({
    name: 'branch',
    initialState,
    reducers: {
        setBranch: (state, action) => {
            state.selectedBranch = action.payload;
            localStorage.setItem('selectedBranch', action.payload); // ✅ Save to localStorage
        },
    },
});

export const { setBranch } = branchSlice.actions;
export default branchSlice.reducer;
