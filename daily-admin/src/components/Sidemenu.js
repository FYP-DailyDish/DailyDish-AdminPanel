import React from "react";
import { Link } from "react-router-dom";
import "./Sidemenu.css";

function Sidemenu() {
  return (
    <div className="menu-container">
      <h1>Test</h1>
      <Link to='/update-profile'> Update Profile</Link>
    </div>
  );
}

export default Sidemenu;
