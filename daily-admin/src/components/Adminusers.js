import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNav";
import SideMenuComp from "./SideMenuComp";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { Button, Spinner } from "react-bootstrap";
import "./AdminUser.css";
import RefreshIcon from "@material-ui/icons/Refresh";
import AdminViewList from "./AdminViewList";
import "./AdminViewList.css";
import "./content.css";

function Adminusers() {
  const { currentUser, disable } = useAuth();
  const [dataLoading, setdataLoading] = useState(false);
  const [adminUsers, setadminUsers] = useState([]);
  const [loginUserAdminStatus, setloginUserAdminStatus] = useState("");
  // const [Pimage, setPimage] = useState("");

  const currentUserAdminStatus = async () => {
    await db
      .collection("admin-users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        console.log("Admin Status", doc.data().AdminStatus);
        setloginUserAdminStatus(doc.data().AdminStatus);
      });
  };

  const getallAdminUsers = async () => {
    setdataLoading(true);

    await db
      .collection("admin-users")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setadminUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            UserName: doc.data().UserName,
            timestamp: doc.data().timestamp,
            AdminStatus: doc.data().AdminStatus,
            Disable: doc.data().Disable,
          

          }))
        );
      });

    setdataLoading(false);
  };
  useEffect(() => {
    getallAdminUsers();
    currentUserAdminStatus();

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
    getallAdminUsers();
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
            <p className="title-size">DailyDish Admins</p>
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
                  <AdminViewList
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

export default Adminusers;
