import React from "react";
import "./Dashboard.css"

function ChefActivityList({ user }) {
  return (
    <>
      <li
      className="list-design" 
      key={user.id}>
        A Chef with Name <strong>{user.UserName}</strong> and Email ID:{" "}
        <strong>{user.UserEmail}</strong> added on{" "}
        <strong>{user.timestamp.toDate().toString().slice(0, 21)}</strong> with 
        Kitchen Name of {user.KitchenName}
      </li>
    </>
  );
}

export default ChefActivityList;
