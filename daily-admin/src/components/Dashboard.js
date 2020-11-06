import React, { useState } from "react";
import { Navbar, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import Sidemenu from "./Sidemenu";
import { Link, useHistory } from "react-router-dom";


function Dashboard() {
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
    <div className="dash-container">
      <Navbar className="nav" fixed="top">
        {error && <Alert variant="danger"> {error}</Alert>}
        <Navbar.Brand> Welcome DailyDish Admin</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="nav-text">
            Signed in as:{" "}
            <Link to="/profile">
              <strong>{currentUser.email}</strong>
            </Link>
          </Navbar.Text>
          <Button variant="outline-dark" onClick={handleLogout}>
            {" "}
            Logout
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Sidemenu />
    </div>
  );
}

export default Dashboard;
