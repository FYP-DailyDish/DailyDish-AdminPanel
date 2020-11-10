import React, { useState, useEffect } from "react";
import { Navbar, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Logo from "../images/Logo.png";
import { db } from "../Firebase";

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
        console.log();
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
      <Navbar.Brand>
        <Link to="/" style={{ textDecoration: "none" }}>
          {" "}
          <img className="nav-logo" alt="logo" src={Logo} />
          <strong className="nav-title">Welcome DailyDish Admin</strong>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="nav-text">
          {/* {console.log(adminUsers)} */}
          Signed in as:{" "}
          <Link to="/update-profile">
            <strong className="user-email">{currentUser.email}</strong>
          </Link>
          <div>
            {" "}
            <strong>Admin Position :</strong> {adminUsers}
          </div>
        </Navbar.Text>
        <Button variant="outline-dark" onClick={handleLogout}>
          {" "}
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default CustomNavbar;
