import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNav";
import SideMenuComp from "./SideMenuComp";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { Button, Spinner } from "react-bootstrap";

import RefreshIcon from "@material-ui/icons/Refresh";
import ListFeed from "./ListFeed";
import firebase from "firebase";
import './Appuser.css'


function Appusers() {
  const { currentUser } = useAuth();
  const [dataLoading, setdataLoading] = useState(false);
  const [adminUsers, setadminUsers] = useState([]);
  // const [Pimage, setPimage] = useState("");

  const getallAdminUsers = async () => {
    setdataLoading(true);

    await db.collection("app-users").onSnapshot((snapshot) => {
      setadminUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          UserName: doc.data().UserName,
          timestamp: doc.data().timestamp.toDate().toString()
         
        }))
      );
    });
    setdataLoading(false);
  };
  useEffect(() => {
    getallAdminUsers();
    // getPicture();

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
        <div className="activity-feed">
          <div className="title-holder">
            <h1>
              Registered DailyDish Application Users
              <Button
                className="btn-refresh"
                variant="dark"
                onClick={reloadHandler}
              >
                <RefreshIcon />
              </Button>
            </h1>
          </div>

          <div>
            {console.log(adminUsers)}
            {dataLoading ? (
              <Spinner animation="border" />
            ) : (
              <div>
                {/* <img src={Pimage}  /> */}
                
                {adminUsers.map((user) => (
                  <ListFeed key={user.id} user={user.UserName}  time={user.timestamp}/>
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
