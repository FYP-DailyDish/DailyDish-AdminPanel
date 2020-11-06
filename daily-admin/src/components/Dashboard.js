import React from "react";
import CustomNavbar from "./CustomNav";
import SideMenuComp from "./SideMenuComp";
import "./Sidemenu.css";
function Dashboard() {
  return (
    <div className="dash-container">
      <CustomNavbar />
      <SideMenuComp />
    </div>
  );
}

export default Dashboard;
