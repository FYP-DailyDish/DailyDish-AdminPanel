import React from "react";
import "./AdminViewList.css";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

function AdminViewList({ key, user, time, adminstatus }) {
  return (
    <div className="feed-holder">
      <ul style={{ listStyleType: "none" }} className="active-feedlist">
        <li className="list-item" key={key}>
          <div className="div-list">
            <SupervisorAccountIcon /> {user}
            <div className="timestamp">
              <p>
                <strong> Joined on:</strong> {time.slice(0, 21)}
              </p>
            </div>
            <div className="admin-info">
              <p>
                <strong>Admin Position: </strong> {adminstatus}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default AdminViewList;
