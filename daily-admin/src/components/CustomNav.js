import React, { useState } from "react";
import { Navbar, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Logo from "../images/Logo.png";
import "./Sidemenu.css";

function CustomNavbar() {
  const { currentUser, logout } = useAuth();
  const [error, seterror] = useState("");
  const history = useHistory();
  async function handleLogout() {
    seterror("");
    try {
      await logout();
      history.push("/login");
    } catch {
      seterror("Failed to logout! ");
    }
  }
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
          Signed in as:{" "}
          <Link to="/update-profile">
            <strong className="user-email">{currentUser.email}</strong>
          </Link>
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
