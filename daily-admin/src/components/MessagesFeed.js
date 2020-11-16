import React from "react";
import { db } from "../Firebase";
import { useAuth } from "../context/AuthContext";
import DeleteIcon from "@material-ui/icons/Delete";
import "./ChatAdmin.css";

function MessagesFeed({ message }) {
  const { currentUser } = useAuth();
  const handleDel = () => {
    db.collection("admin-message").doc(message.MessageRefID).delete();
  };
  return (
    <div>
      <li
        key={message.MessageRefID}
        style={{ listStyleType: "none" }}
        className="chat-list"
      >
        <div className="chat-box">
          <p className="message-text">
            <strong>{message.AdminName}:</strong> {message.message}
          </p>
          
          {currentUser.uid === message.Userid ? (
            <DeleteIcon onClick={handleDel} className="del-icon" />
          ) : (
            <></>
          )}
         
        </div>
      </li>
    </div>
  );
}

export default MessagesFeed;
