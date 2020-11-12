import React from "react";
import { Button } from "react-bootstrap";
import "./AdminViewList.css";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

function AdminViewList({
  key,
  userID,
  user,
  time,
  adminstatus,
  loginUserAdminStatus,
  disable,
}) {
  async function handleDisable(e) {
    e.preventDefault();
    console.log("i am triggered ❌ ");
    try {
      // console.log(user)
      // console.log(userID)
      // await disable(userID);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="adminfeed-holder">
      <ul style={{ listStyleType: "none" }} className="active-feedlist">
        <li className="list-item" key={key}>
          <div className="admindiv-list">
            <SupervisorAccountIcon /> {user}
            <div className="admin-timestamp">
              <p>
                <strong> Joined on:</strong> {time.slice(0, 21)}
              </p>
              <div className="admin-info">
                <p>
                  <strong>Admin Position: </strong> {adminstatus}
                </p>
              </div>
            </div>
            {/* {console.log(
              "Passed down admin status to judge 👩‍⚖️ ",
              loginUserAdminStatus
            )} */}
            {loginUserAdminStatus == "Super" ? (
              <div>
                {adminstatus != "Super" ? (
                  <div className="super-controls">
                    <Button style={{ marginRight: "2%" }} variant="info">
                      View Profile
                    </Button>
                    <Button
                      style={{ marginRight: "2%" }}
                      variant="warning"
                      onClick={handleDisable}
                    >
                      Disable Admin
                    </Button>
                    <Button style={{ marginRight: "2%" }} variant="danger">
                      Remove this Admin
                    </Button>
                  </div>
                ) : (
                  <div className="super-controls">
                    <p className="superadmin-control">
                      You are Currently Logged-in
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="super-controls">
                <Button style={{ marginRight: "2%" }} variant="info">
                  View Profile
                </Button>
              </div>
            )}
            {/* {console.log(CurrentUserAdminStatus)} */}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default AdminViewList;
