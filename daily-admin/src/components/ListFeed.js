import React from "react";
import "./ListFeed.css";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

function ListFeed({ key, user, time }) {
  return (
    <div className="feed-holder">
      <ul style={{ listStyleType: "none" }} className="active-feedlist">
        <li className="list-item" key={key}>
          <div className="div-list">
            <SupervisorAccountIcon /> {user}
            <div className="timestamp">
              <p><strong>Joined on:</strong> {time}</p>
            </div>
            {/* {console.log(time)} */}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ListFeed;
