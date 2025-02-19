import { configureStore } from "@reduxjs/toolkit";
import branchReducer from "../features/branch/branchSlice";

export const store = configureStore({
  reducer: {
    branch: branchReducer,
  },
});

export default store;
