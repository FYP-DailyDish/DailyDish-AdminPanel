import React, { useEffect, useState } from "react";
import CustomNavbar from "./CustomNav";
import SideMenuComp from "./SideMenuComp";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { Link, useHistory } from "react-router-dom";
import "./Sidemenu.css";
import { Button, Spinner } from "react-bootstrap";

function Dashboard() {
  const [dataload, setdataload] = useState(false);
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
  useEffect(() => {
    const unsub = getStatus();
    return unsub;
  }, []);
  async function handleLogout() {
    try {
      await logout();
      history.push("/login");
    } catch (err) {
      console.log(err);
    }
  }
  // const logingout = async()=>{
  //   await logout();
  // }
  return (
    <div className="dash-container">
      {dataload === true ? (
        <div className="spinner-holder">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {Astatus == true ? (
            <>
              {/* <div>
                <h1>You have been disabled by the Super Admin</h1>
              </div>
              <Button variant="outline-dark" onClick={handleLogout}>
                Logout
              </Button> */}
              
              {history.push("/disabled")}
              
            </>
          ) : (
            <>
              <CustomNavbar />
              <SideMenuComp />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
