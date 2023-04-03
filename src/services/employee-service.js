import Employees from "../json/employees.json";

import {
  resetAppState,
  setEmployeeInfo,
  setManagerInfo,
  setReporteesList,
  setErrorMessage
} from "../store/app.slice";

export const loginEmployee = (email, password) => dispatch => {
  if (Array.isArray(Employees) && Employees.length) {
    const existingUser = Employees.find(
      employee => employee.email === email && employee.password === password
    );
    if (existingUser) {
      dispatch(setEmployeeInfo(existingUser));
      localStorage.setItem("loggedInEmail", existingUser.email);
    } else {
      dispatch(setErrorMessage("Incorrect email or password!"));
    }
  }
};

export const logoutEmployee = () => dispatch => {
  dispatch(resetAppState());
  localStorage.removeItem("loggedInEmail");
};

export const getReporteesList = id => dispatch => {
  if (Array.isArray(Employees) && Employees.length) {
    const reporteesList = Employees.filter(
      employee => employee.reportsTo === id
    );
    if (Array.isArray(reporteesList)) {
      dispatch(setReporteesList(reporteesList));
    }
  }
};

export const getManagerDetails = reportsTo => dispatch => {
  if (Array.isArray(Employees) && Employees.length) {
    const managerDetails = Employees.find(
      employee => employee.id === reportsTo
    );
    if (managerDetails && Object.keys(managerDetails).length) {
      dispatch(setManagerInfo(managerDetails));
    }
  }
};

export const getEmployeeByEmail = email => {
  return Employees.find(employee => employee.email === email);
};
