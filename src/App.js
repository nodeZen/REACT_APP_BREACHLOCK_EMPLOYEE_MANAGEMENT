import "./App.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/login/login";
import { useDispatch } from "react-redux";
import {
  getEmployeeByEmail,
  logoutEmployee,
} from "./services/employee-service";
import { setEmployeeInfo } from "./store/app.slice";

const App = () => {
  const { employeeInfo } = useSelector((state) => state.app);
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (
      (employeeInfo && Object.keys(employeeInfo).length) ||
      localStorage.getItem("loggedInEmail")
    ) {
      setLoggedIn(true);
      if (employeeInfo && !Object.keys(employeeInfo).length) {
        dispatch(
          setEmployeeInfo(
            getEmployeeByEmail(localStorage.getItem("loggedInEmail"))
          )
        );
      }
    } else {
      setLoggedIn(false);
    }
  }, [employeeInfo, dispatch]);

  
  const logoutHandler = () => {
    dispatch(logoutEmployee());
  };

  return (
    <div className="App">
      <div className="py-3 employee-header row">
        <div className="col-md-11">
          <h3 className="ms-5 ps-5">Employee Management App</h3>
        </div>
        <div className="col-md-1">
          {loggedIn && (
            <button className="primary-button" onClick={logoutHandler}>
              Logout
            </button>
          )}
        </div>
      </div>
      {loggedIn ? <Dashboard /> : <Login />}
    </div>
  );
};

export default App;
