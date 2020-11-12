import React, { useState, useEffect } from "react";
import { Navbar, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Logo from "../images/Logo.png";
import { db } from "../Firebase";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GradeIcon from "@material-ui/icons/Grade";

import "./Sidemenu.css";

function CustomNavbar() {
  const { currentUser, logout } = useAuth();
  const [error, seterror] = useState("");
  const history = useHistory();
  const [adminUsers, setadminUsers] = useState([]);

  const getallAdminUsers = async () => {
    await db
      .collection("admin-users")
      .doc(currentUser.uid)
      .get()
      .then((cred) => {
        setadminUsers(cred.data().AdminStatus);
      });
  };

  async function handleLogout() {
    seterror("");
    try {
      await logout();
      history.push("/login");
    } catch {
      seterror("Failed to logout! ");
    }
  }

  useEffect(() => {
    getallAdminUsers();
    // getPicture();

    return () => {
      setadminUsers([]);
    };
  }, []);

  return (
    <Navbar className="nav" fixed="top">
      {error && <Alert variant="danger"> {error}</Alert>}
      <Navbar.Brand className="title-control">
        <Link to="/" style={{ textDecoration: "none" }}>
          {" "}
          
          <div className="title-response">
          <img className="nav-logo" alt="logo" src={Logo} />
            <strong className="nav-title">DailyDish Admin-Panel</strong>
          </div>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="nav-text">
          <AccountCircleIcon /> Signed in as:{" "}
          <Link to="/update-profile">
            <strong className="user-email">{currentUser.email}</strong>
          </Link>
        </Navbar.Text>
        <Navbar.Text className="admin-statusholder">
          <strong>
            {" "}
            <GradeIcon style={{ color: "#f39c12" }} />
            Position :
          </strong> {" "}
          {adminUsers}
        </Navbar.Text>
        <Button variant="outline-dark" onClick={handleLogout}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
