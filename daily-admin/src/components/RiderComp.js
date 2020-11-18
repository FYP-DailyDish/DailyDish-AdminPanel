import React from "react";
import CustomNavbar from "./CustomNav";
import SideMenuComp from "./SideMenuComp";

function RiderComp() {
  return (
    <div className="dash-container">
      <CustomNavbar />
      <SideMenuComp />
      <div className="content-div">
        <div className="activity-feed">
          <h3>I am Rider </h3>
          <h3>Coming Soon....</h3>
        </div>
      </div>
    </div>
  );
}

export default RiderComp;
