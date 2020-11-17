import React from "react";
import "./Dashboard.css"

function AdminActivityList({ admin }) {
  return (
    <>
      <li
      className="list-design" 
      key={admin.id}>
        An Admin with Name <strong>{admin.UserName}</strong> and Email ID:{" "}
        <strong>{admin.UserEmail}</strong> added on{" "}
        <strong>{admin.timestamp.toDate().toString().slice(0, 21)}</strong>
      </li>
    </>
  );
}

export default AdminActivityList;
