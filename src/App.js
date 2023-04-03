import "./App.css";
import { useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/login/login";
import { useDispatch } from "react-redux";
import { getEmployeeByEmail } from "./services/employee-service";
import { setEmployeeInfo } from "./store/app.slice";
import Header from "./components/header/header";

const App = () => {
  const { employeeInfo: ef, errorMessage } = useSelector(state => state.app);
  const employeeInfo = useMemo(() => ef, [ef]);
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
