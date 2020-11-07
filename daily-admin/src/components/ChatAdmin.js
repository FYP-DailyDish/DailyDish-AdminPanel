import React from 'react'
import  CustomNavbar from './CustomNav'
import SideMenuComp from './SideMenuComp'


function ChatAdmin() {
    return (
        <div className="dash-container">
        <CustomNavbar />
        <SideMenuComp />
        <div className="content-div">
          <div className="activity-feed">
            <h3>I am chat module  from Firebase</h3>
          </div>
        </div>
      </div>
    )
}

export default ChatAdmin
