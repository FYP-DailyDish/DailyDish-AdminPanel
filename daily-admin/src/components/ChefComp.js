import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNav";
import SideMenuComp from "./SideMenuComp";
import "./AdminViewList.css";
import "./content.css";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { Button, Spinner } from "react-bootstrap";
import "./AdminUser.css";
import RefreshIcon from "@material-ui/icons/Refresh";
import ChefUserView from './ChefUserView'

function ChefComp() {
  const { currentUser, disable } = useAuth();
  const [dataLoading, setdataLoading] = useState(false);
  const [adminUsers, setadminUsers] = useState([]);
  const [loginUserAdminStatus, setloginUserAdminStatus] = useState("");
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
  const getallchefs = async () => {
    setdataLoading(true);

    await db
      .collection("chefs")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setadminUsers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            UserName: doc.data().ChefName,
            KitchenName: doc.data().KitchenName,
            timestamp: doc.data().timestamp,
            //reviewStatus: doc.data().reviewStatus,
            CurrentAddress: doc.data().CurrentAddress,
            phnumber: doc.data().phnumber,
            Disable: doc.data().Disable,
          }))
        );
      });
    setdataLoading(false);
  };
  useEffect(() => {
    getallchefs();
    currentAppStatus();

    return () => {
      setadminUsers([]);
    };
  }, []);
  const reloadHandler = async () => {
    console.log("i am clicked  👨‍🚀 ");
    setdataLoading(true);
    getallchefs();
    setdataLoading(false);
  };
  return (
    <div className="dash-container">
      <CustomNavbar />
      <SideMenuComp />
      <div className="content-div">
        <div className="activity-feed">
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
            <div className="num-admin">
              Number of Registered Chefs: {adminUsers.length}
            </div>
            {console.log(adminUsers)}
            {dataLoading ? (
              <Spinner animation="border" />
            ) : (
              <div>
                {/* {adminUsers.map((user) => {
                  console.log(user.Disable);
                })} */}

                {adminUsers.map((user) => (
                  <ChefUserView
                  loginUserAdminStatus={loginUserAdminStatus}
                   
                  userInfo={user}
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

export default ChefComp;
