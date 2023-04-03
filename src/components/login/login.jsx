import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginEmployee } from "../../services/employee-service";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userNameHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (email && password) {
      dispatch(loginEmployee(email, password));
    }
  };
  return (
    <div className="container py-5">
      <div>
      <form onSubmit={formSubmitHandler}>
        <div className="row">
          <div className="py-1">
            <label htmlFor="email">Email:</label>
          </div>
          <div className="py-1">
            <input
              type="email"
              name="email"
              label="Username"
              value={email}
              onChange={userNameHandler}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="py-1">
            <label htmlFor="password">Password:</label>
          </div>
          <div className="py-1">
            <input
              type="password"
              name="password"
              label="password"
              value={password}
              onChange={passwordHandler}
            />
          </div>
        </div>
        <button type="submit" name="login" className="primary-button">
          Login
        </button>
      </form>
      </div>
    </div>
  );
};

export default Login;
