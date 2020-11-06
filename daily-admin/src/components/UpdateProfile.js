import React from "react";
import { Navbar } from "react-bootstrap";
import CustomNavbar from "./CustomNav";
import "./Sidemenu.css";
import SideMenuComp from "./SideMenuComp";

function UpdateProfile() {
  return <div className="dash-container">
      
       <CustomNavbar/>
      <SideMenuComp/> 
      
      

  </div>;
}

export default UpdateProfile;
