import { createSlice } from "@reduxjs/toolkit";
import appState from "./app.state";

export const counterSlice = createSlice({
  name: "app",
  initialState: appState,
  reducers: {
    setEmployeeInfo: (state, action) => {
      state.employeeInfo = action.payload;
    },
    setReporteesList: (state, action) => {
      state.reportees = action.payload;
    },
    setManagerInfo: (state, action) => {
      state.managerInfo = action.payload;
    },
    resetAppState: () => appState,
  },
});

// Action creators are generated for each case reducer function
export const {
  setEmployeeInfo,
  setReporteesList,
  setManagerInfo,
  resetAppState,
} = counterSlice.actions;

export default counterSlice.reducer;
