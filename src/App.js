import "./App.css";
import { useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/login/login";
import Header from "./components/header/header";
import { getEmployeeByEmail } from "./services/employee-service";
import { setEmployeeInfo } from "./store/app.slice";


const App = () => {
  const dispatch = useDispatch();

  const { employeeInfo: ef, errorMessage } = useSelector(state => state.app);
  const employeeInfo = useMemo(() => ef, [ef]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (
      (employeeInfo && Object.keys(employeeInfo).length) ||
      localStorage.getItem("loggedInEmail")
    ) {
      setLoggedIn(true);
      if (employeeInfo && !Object.keys(employeeInfo).length) {
        const activeEmployeeEmail = localStorage.getItem("loggedInEmail");
        const activeEmployee = getEmployeeByEmail(activeEmployeeEmail);
        dispatch(setEmployeeInfo(activeEmployee));
      }
    } else {
      setLoggedIn(false);
    }
  }, [employeeInfo, dispatch]);

  return (
    <div className="App">
      <div>
        <Header {...{ loggedIn }} />
      </div>
      <div>{loggedIn ? <Dashboard /> : <Login />}</div>{" "}
      {errorMessage && <span className="text-danger">{errorMessage}</span>}
    </div>
  );
};

export default App;
