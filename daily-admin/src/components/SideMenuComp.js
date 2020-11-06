import React from 'react'
import {SideBarData} from './Sidemenu'
import "./Sidemenu.css";

function SideMenuComp() {
    return (
        <div className="menu-container">
        {SideBarData.map((val, key) => {
          return (
            <ul className="sidebar-list">
              <li
                className="row"
                key={key}
                onClick={(e) => {
                  e.preventDefault();
                  window.location.pathname = val.Link;
                }}
              >
                <div id="icon">{val.icon}</div>
                <div id="title">{val.title}</div>
              </li>
            </ul>
          );
        })}
      </div>
    )
}

export default SideMenuComp
