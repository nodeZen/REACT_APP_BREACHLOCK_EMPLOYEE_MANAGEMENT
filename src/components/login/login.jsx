import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginEmployee } from "../../services/employee-service";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userNameHandler = event => {
    setEmail(event.target.value);
  };

  const passwordHandler = event => {
    setPassword(event.target.value);
  };

  const formSubmitHandler = event => {
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
                id="email"
                type="email"
                name="email"
                label="email"
                value={email}
                onChange={userNameHandler}
                required={true}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="py-1">
              <label htmlFor="password">Password:</label>
            </div>
            <div className="py-1">
              <input
                id="password"
                type="password"
                name="password"
                label="password"
                value={password}
                onChange={passwordHandler}
                required={true}
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
