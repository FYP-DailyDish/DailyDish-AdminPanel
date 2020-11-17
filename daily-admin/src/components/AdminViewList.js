import React, { useState } from "react";
import { Button } from "react-bootstrap";
import "./AdminViewList.css";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PersonIcon from "@material-ui/icons/Person";
import CancelIcon from "@material-ui/icons/Cancel";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import GradeIcon from "@material-ui/icons/Grade";
import { db } from "../Firebase";
import AdminModal from "./AdminModal";
function AdminViewList({
  key,
  userID,
  user,
  time,
  adminstatus,
  loginUserAdminStatus,
  disable,
  full,
}) {
  const [disableStatus, setdisableStatus] = useState(false);

  const SuperAdminMaker = () => {
    console.log("You Have Upgraded an admin");
    db.collection("admin-users").doc(userID).set(
      {
        AdminStatus: "Super",
      },
      { merge: true }
    );
  };

  const DisableStatusHandlerFalse = () => {
    db.collection("admin-users").doc(userID).set(
      {
        Disable: false,
      },
      { merge: true }
    );
    setdisableStatus(false);
  };

  const DisableStatusHandlerTrue = () => {
    db.collection("admin-users").doc(userID).set(
      {
        Disable: true,
      },
      { merge: true }
    );
    setdisableStatus(true);
  };
  const TruehandleDisable = (e) => {
    e.preventDefault();
    // console.log("i am triggered ❌ ");
    DisableStatusHandlerTrue();

    // console.log(user);
    // console.log(userID);
    // await disable(userID);
  };
  const FalsehandleDisable = (e) => {
    e.preventDefault();
    // console.log("i am triggered ❌ ");
    DisableStatusHandlerFalse();
    // console.log(user);
    // console.log(userID);
    // await disable(userID);
  };
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
            {loginUserAdminStatus === "Super" ? (
              <div>
                {adminstatus !== "Super" ? (
                  <div className="super-controls">
                    {/* <Button style={{ marginRight: "2%" }} variant="info">
                      <PersonIcon /> View Profile
                    </Button> */}
                    <AdminModal userInfo={full} />
                    {console.log(disable)}
                    {disable === false ? (
                      <>
                        <Button
                          style={{ marginRight: "2%" }}
                          variant="warning"
                          onClick={TruehandleDisable}
                        >
                          <CancelIcon /> Disable Admin
                        </Button>
                        <Button variant="success" onClick={SuperAdminMaker}>
                          <GradeIcon /> Make Super Admin
                        </Button>
                      </>
                    ) : (
                      <Button
                        style={{ marginRight: "2%" }}
                        variant="warning"
                        onClick={FalsehandleDisable}
                      >
                        <SettingsBackupRestoreIcon /> Restore Admin
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="super-controls">
                    <p className="superadmin-control">
                      <p className="admin-info">
                        <GradeIcon /> Super Admin
                      </p>
                      <AdminModal userInfo={full} />
                    </p>
                    {/* <Button style={{marginLeft:"3vmin"}} variant="info">
                      <PersonIcon /> View Profile
                    </Button>  */}
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
