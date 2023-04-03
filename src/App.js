import "./App.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Dashboard from "./components/dashboard/dashboard";
import Login from "./components/login/login";
import { useDispatch } from "react-redux";
import { getEmployeeByEmail } from "./services/employee-service";
import { setEmployeeInfo } from "./store/app.slice";
import Header from "./components/header/header";

const App = () => {
  const { employeeInfo } = useSelector(state => state.app);
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
    </div>
  );
};

export default App;
