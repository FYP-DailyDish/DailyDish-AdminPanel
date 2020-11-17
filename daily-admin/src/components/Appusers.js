import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNav";
import SideMenuComp from "./SideMenuComp";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { Button, Spinner } from "react-bootstrap";
import "./AdminUser.css";
import RefreshIcon from "@material-ui/icons/Refresh";
import AppuserView from "./AppuserView"
import "./AdminViewList.css";
import "./content.css";

function Appusers() {
  const { currentUser, disable } = useAuth();
  const [dataLoading, setdataLoading] = useState(false);
  const [adminUsers, setadminUsers] = useState([]);
  const [loginUserAdminStatus, setloginUserAdminStatus] = useState("");
  // const [Pimage, setPimage] = useState("");

  const currentAppStatus = async () => {
    await db
      .collection("admin-users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        console.log("Admin Status", doc.data().AdminStatus);
        setloginUserAdminStatus(doc.data().AdminStatus);
      });
  };

  const getallAppUsers = async () => {
    setdataLoading(true);

    await db
      .collection("app-users")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setadminUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            UserName: doc.data().UserName,
            timestamp: doc.data().timestamp,
            Disable: doc.data().Disable

          }))
        );
      });

    setdataLoading(false);
  };
  useEffect(() => {
    getallAppUsers();
    currentAppStatus();

    return () => {
      setadminUsers([]);
    };
  }, []);

  // const getPicture = async () => {
  //   setdataLoading(true);
  //   await firebase
  //     .storage()
  //     .ref("users/" + currentUser.uid + "/profile.jpg")
  //     .getDownloadURL()
  //     .then((imgUrl) => {
  //       setdataLoading(false);
  //       setPimage(imgUrl);
  //       setPavail(true);
  //     })
  //     .catch(() => {
  //       setdataLoading(false);
  //     });
  // };
  const reloadHandler = async () => {
    console.log("i am clicked  👨‍🚀 ");
    setdataLoading(true);
    getallAppUsers()
    setdataLoading(false);
   
    // db.collection("admin-users")
    //   .onSnapshot((snapshot) => {
    //     setadminUsers(
    //       snapshot.docs.map((doc) => ({
    //         id: doc.id,
    //         UserName: doc.data().UserName,
    //         // console.log(doc.data().UserName);
    //       }))
    //     );
    //     setdataLoading(fals);
    //   })
  };
  return (
    <div className="dash-container">
      <CustomNavbar />
      <SideMenuComp />
      <div className="content-div">
        <div className="adminactivity-feed">
          <div className="title-holder">
            <p className="title-size">DailyDish Application Users</p>
            <Button
              className="btn-refresh"
              variant="dark"
              onClick={reloadHandler}
            >
              <RefreshIcon />
              Refresh List
            </Button>
          </div>

          <div>
            {console.log(adminUsers)}
            {dataLoading ? (
              <Spinner animation="border" />
            ) : (
              <div>
                {/* {adminUsers.map((user) => {
                  console.log(user.Disable);
                })} */}

                {adminUsers.map((user) => (
                  <AppuserView
                    key={user.id}
                    userID={user.id}
                    user={user.UserName}
                    time={user.timestamp.toDate().toString()}
                    adminstatus={user.AdminStatus}
                    loginUserAdminStatus={loginUserAdminStatus}
                    disable={user.Disable}
                    full={user}
                  />
                ))}
              </div>
            )}

            {/* {adminUsers.map((user) => (
              // <li key={user.id}>{user.UserName}</li>
              <ListFeed key={user.id} user={user.UserName} />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Appusers;
