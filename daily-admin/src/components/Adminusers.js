import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNav";
import SideMenuComp from "./SideMenuComp";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import { Button } from "react-bootstrap";

function Adminusers() {
  const { currentUser } = useAuth();
  const [adminUsers, setadminUsers] = useState([]);

  const getallAdminUsers = async () => {
    await db.collection("admin-users").onSnapshot((snapshot) => {
      setadminUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          UserName: doc.data().UserName,
          // console.log(doc.data().UserName);
        }))
      );
    });
  };
  useEffect(() => {
    getallAdminUsers();
    return () => {
      setadminUsers([]);
    };
  }, []);
  return (
    <div className="dash-container">
      <CustomNavbar />
      <SideMenuComp />
      <div className="content-div">
        <div className="activity-feed">
          <h1>Registered DailyDish Admin </h1>
          <ul>
            {/* {console.log(adminUsers)} */}

            {adminUsers.map((user) => (
              <li key={user.id}>{user.UserName}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Adminusers;
