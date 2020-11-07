import React from 'react'
import  CustomNavbar from './CustomNav'
import SideMenuComp from './SideMenuComp'


function Adminusers() {
    return (
        <div className="dash-container">
        <CustomNavbar />
        <SideMenuComp />
        <div className="content-div">
          <div className="activity-feed">
            <h3>I am admin users in Firebase</h3>
          </div>
        </div>
      </div>
    )
}

export default Adminusers
