import React, { useEffect, useState } from "react";
import CustomNavbar from "./CustomNav";
import SideMenuComp from "./SideMenuComp";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { Link, useHistory } from "react-router-dom";
import "./Sidemenu.css";
import { Button, Spinner } from "react-bootstrap";
import "./Dashboard.css";
import RefreshIcon from "@material-ui/icons/Refresh";
import AdminActivityList from "./AdminActivityList";
import UserActivityList from "./UserActivityList";
import * as functions from "firebase/functions";
import ChefActivityList from "./ChefActivityList";
import RiderActivityList from "./RiderActivityList";

function Dashboard() {
  const [dataload, setdataload] = useState(false);
  const [adminData, setadminData] = useState([]);
  const [userData, setuserData] = useState([]);
  const [ChefData, setChefData] = useState([]);
  const [RiderData, setRiderData] = useState([]);
  const [dataLoading, setdataLoading] = useState(false);
  const history = useHistory();
  const [Astatus, setAstatus] = useState(false);
  const { logout, currentUser } = useAuth();
  const getStatus = async () => {
    setdataload(true);
    await db
      .collection("admin-users")
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        console.log("Yolo ☮️ ", doc.data());
        setAstatus(doc.data().Disable);
      });
    setdataload(false);
  };
  const getallAdminUsers = async () => {
    setdataLoading(true);

    await db
      .collection("admin-users")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setadminData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            UserEmail: doc.data().Useremail,
            UserName: doc.data().UserName,
            timestamp: doc.data().timestamp,
            AdminStatus: doc.data().AdminStatus,
            Disable: doc.data().Disable,
          }))
        );
      });
  };
  const getallChefs = async () => {
    setdataLoading(true);
    const chefsref = db.collection("chefs").orderBy("timestamp", "desc");
    await chefsref.onSnapshot((snapshot) => {
      setChefData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          UserName: doc.data().ChefName,
          UserEmail: doc.data().Useremail,
          KitchenName: doc.data().KitchenName,
          timestamp: doc.data().timestamp,
          CurrentAddress: doc.data().CurrentAddress,
          phnumber: doc.data().phnumber,
          Disable: doc.data().Disable,
        }))
      );
    });
  };
  const getallRiders = async () => {
    setdataLoading(true);
    const chefsref = db.collection("riders").orderBy("timestamp", "desc");
    await chefsref.onSnapshot((snapshot) => {
      setRiderData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          UserName: doc.data().UserName,
          UserEmail: doc.data().UserEmail,
          timestamp: doc.data().timestamp,
          phnumber: doc.data().phnumber,
          Disable: doc.data().Disable,
        }))
      );
    });
  };
  const getallUsers = async () => {
    setdataLoading(true);

    await db
      .collection("app-users")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setuserData(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            UserEmail: doc.data().UserEmail,
            UserName: doc.data().UserName,
            timestamp: doc.data().timestamp,
            Disable: doc.data().Disable,
          }))
        );
      });
  };
  const handleRefresh = async () => {
    console.log("HandleRefresh() triggered");
    getallAdminUsers();
    getallUsers();
    getallChefs();
    getallRiders();
  };

  useEffect(() => {
    const unsub = getStatus();
    const adminUnsub = getallAdminUsers();
    const userUnsub = getallUsers();
    const chefunsub = getallChefs();
    const riderunsub = getallRiders();

    return unsub && adminUnsub && userUnsub && chefunsub && riderunsub;
  }, []);

  return (
    <div className="dash-container">
      {dataload === true ? (
        <div className="spinner-holder">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {Astatus == true ? (
            <>{history.push("/disabled")}</>
          ) : (
            <>
              <CustomNavbar />
              <SideMenuComp />

              <div className="Dashcontent-div">
                <div className="dashactivity-feed">
                  <p className="admintitle-size">
                    <strong>Activity Feed</strong>
                    <Button
                      onClick={handleRefresh}
                      className="feedbtn-refresh"
                      variant="dark"
                    >
                      <RefreshIcon />
                    </Button>
                  </p>
                  <div>
                    <ul className="listStyle">
                      <li>Administrators: {adminData.length}</li>
                      <li> Customers: {userData.length}</li>
                      <li>Chefs: {ChefData.length}</li>
                      <li>Riders: {RiderData.length}</li>
                    </ul>
                  </div>
                  <div>
                    <p className="activity-descTitle">
                      <strong>Admin Activity</strong>
                    </p>
                    <ul>
                      {adminData.map((admin) => (
                        <AdminActivityList admin={admin} />
                      ))}
                    </ul>
                    <p className="activity-descTitle">
                      <strong>New User Activity</strong>
                    </p>
                    <ul>
                      {userData.map((user) => (
                        <UserActivityList user={user} />
                      ))}
                    </ul>
                    <p className="activity-descTitle">
                      <strong>New Chefs</strong>
                    </p>
                    <ul>
                      {ChefData.map((user) => (
                        <ChefActivityList user={user} />
                      ))}
                    </ul>
                    <p className="activity-descTitle">
                      <strong>New Riders</strong>
                    </p>
                    <ul>
                      {RiderData.map((user) => (
                        <RiderActivityList user={user} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
