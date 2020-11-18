import React from "react";
import "./Dashboard.css"

function UserActivityList({ user }) {
  return (
    <>
      <li
      className="list-design" 
      key={user.id}>
        An User with Name <strong>{user.UserName}</strong> and Email ID:{" "}
        <strong>{user.UserEmail}</strong> added on{" "}
        <strong>{user.timestamp.toDate().toString().slice(0, 21)}</strong>
      </li>
    </>
  );
}

export default UserActivityList;
