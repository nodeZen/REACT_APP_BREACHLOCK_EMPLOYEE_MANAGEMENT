import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getManagerDetails,
  getReporteesList,
} from "../../services/employee-service";
import "./dashboard.css";

const Dashboard = () => {
  const disptach = useDispatch();

  const { employeeInfo, reportees, managerInfo } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    if (employeeInfo.isManager) {
      disptach(getReporteesList(employeeInfo.id));
    } else {
      disptach(getManagerDetails(employeeInfo.reportsTo));
    }
  }, [employeeInfo, disptach]);

  const reportingManagerCard = ({ firstName, lastName, email, phone }) => {
    return (
      <div>
        <div>Name: {`${firstName || "--"} ${lastName || "--"}`}</div>
        <div>Email: {`${email || "--"}`}</div>
        <div>Phone: {`${phone || "--"}`}</div>
      </div>
    );
  };

  const renderReporteesList = (reporteesList) => (
    <div className="row justify-content-center py-4">
      <div className="col-auto reportee-table">
        <table className="table table-responsive">
          <thead>
            <tr>
              <th bgcolor="#fff">Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {reporteesList.map((reportee) => {
              const { firstName, lastName, email, phone } = reportee;
              return (
                <tr>
                  <td>{`${firstName || "--"} ${lastName || "--"}`}</td>
                  <td>{email || "--"}</td>
                  <td>{phone || "--"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="container">
      {employeeInfo && Object.keys(employeeInfo) && (
        <div>
          <h4 className="mt-4">
            Welcome {`${employeeInfo.firstName} ${employeeInfo.lastName}`}
          </h4>
          {managerInfo && Object.keys(managerInfo).length > 0 && (
            <div className="py-5">
              <h5>Your Reporting Manager Details</h5>
              <div>{reportingManagerCard(managerInfo)}</div>
            </div>
          )}

          {Array.isArray(reportees) && reportees.length > 0 && (
            <div className="py-5">
              <h5>Your Reportees Details</h5>
              <div>{renderReporteesList(reportees)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
