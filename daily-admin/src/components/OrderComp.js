import React from 'react'
import  CustomNavbar from './CustomNav'
import SideMenuComp from './SideMenuComp'


function OrderComp() {
    return (
        <div className="dash-container">
        <CustomNavbar />
        <SideMenuComp />
        <div className="content-div">
          <div className="activity-feed">
            <h3>I am order feed from Firebase</h3>
            <h3>Coming Soon....</h3>
          </div>
        </div>
      </div>
    )
}

export default OrderComp
