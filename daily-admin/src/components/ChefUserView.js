import React, { useState } from "react";
import { Button } from "react-bootstrap";
import UserModal from './UserModal'
import "./AdminViewList.css";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import PersonIcon from "@material-ui/icons/Person";
import CancelIcon from "@material-ui/icons/Cancel";
import SettingsBackupRestoreIcon from "@material-ui/icons/SettingsBackupRestore";
import GradeIcon from "@material-ui/icons/Grade";
import { db } from "../Firebase";
import ChefModal from "./ChefModal";
import KitchenIcon from '@material-ui/icons/Kitchen';
import ProductsModal from "./ProductsModal";
function ChefUserView({userInfo,loginUserAdminStatus}) {
  const [disableStatus, setdisableStatus] = useState(false);

//   const SuperAdminMaker = () => {
//     console.log("You Have Upgraded an admin");
//     db.collection("app-users").doc(userInfo.id).set(
//       {
//         AdminStatus: "Super",
//       },
//       { merge: true }
//     );
//   };

  const DisableStatusHandlerFalse = () => {
    db.collection("chefs").doc(userInfo.id).update(
      {
        Disable: false,
      },
    
    );
    setdisableStatus(false);
  };

  const DisableStatusHandlerTrue = () => {
    db.collection("chefs").doc(userInfo.id).update(
      {
        Disable: true,
      },
     
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
        <li className="list-item" key={userInfo.id}>
          <div className="admindiv-list">
            <SupervisorAccountIcon /> {userInfo.UserName}
        <div className="kitchen-name" ><KitchenIcon /> {userInfo.KitchenName}</div>
            <div className="admin-timestamp">
              <p>
                <strong> Joined on:</strong> {userInfo.timestamp.toDate().toString().slice(0, 21)}
              </p>
              <div className="admin-info"></div>
            </div>
            {/* {console.log(
              "Passed down admin status to judge 👩‍⚖️ ",
              loginUserAdminStatus
            )} */}
            {loginUserAdminStatus === "Super" ? (
              <div>
                <div className="super-controls">
                  {/* <Button style={{ marginRight: "2%" }} variant="info">
                    <PersonIcon /> View Profile
                  </Button> */}
                  <ChefModal userInfo={userInfo}/>
                  <ProductsModal userInfo={userInfo}/>
                  {console.log(userInfo.Disable)}
                  {userInfo.Disable === false ? (
                    <>
                      <Button
                        style={{ marginRight: "2%" }}
                        variant="warning"
                        onClick={TruehandleDisable}
                      >
                        <CancelIcon /> Disable User
                      </Button>
                    </>
                  ) : (
                    <Button
                      style={{ marginRight: "2%" }}
                      variant="warning"
                      onClick={FalsehandleDisable}
                    >
                      <SettingsBackupRestoreIcon /> Restore User
                    </Button>
                  )}
                </div>
                
              </div>
            ) : (
              <div className="super-controls">
                {/* <Button style={{ marginRight: "2%" }} variant="info">
                  View Profile
                </Button> */}
                <ChefModal  userInfo={userInfo}/>
                <ProductsModal userInfo={userInfo}/>
              </div>
            )}
            {/* {console.log(CurrentUserAdminStatus)} */}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ChefUserView;
