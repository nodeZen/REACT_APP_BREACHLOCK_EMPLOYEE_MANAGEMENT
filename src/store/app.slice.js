import { createSlice } from "@reduxjs/toolkit";
import appState from "./app.state";

export const counterSlice = createSlice({
  name: "app",
  initialState: appState,
  reducers: {
    setEmployeeInfo: (state, action) => {
      state.employeeInfo = action.payload;
      state.errorMessage = "";
    },
    setReporteesList: (state, action) => {
      state.reportees = action.payload;
    },
    setManagerInfo: (state, action) => {
      state.managerInfo = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    resetAppState: () => appState
  }
});

// Action creators are generated for each case reducer function
export const {
  setEmployeeInfo,
  setReporteesList,
  setManagerInfo,
  setErrorMessage,
  resetAppState
} = counterSlice.actions;

export default counterSlice.reducer;
