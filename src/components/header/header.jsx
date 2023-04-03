import React from "react";
import { useDispatch } from "react-redux";
import { logoutEmployee } from "../../services/employee-service";

const Header = ({ loggedIn }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutEmployee());
  };
  return (
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
  );
};

export default Header;
