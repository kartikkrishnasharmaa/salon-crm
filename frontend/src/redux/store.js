import { configureStore } from '@reduxjs/toolkit';
import branchReducer from './branchSlice';
import customerReducer from './customerSlice';

const store = configureStore({
  reducer: {
    branch: branchReducer,
    customers: customerReducer,
  },
});

export default store;
