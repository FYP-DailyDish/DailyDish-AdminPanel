import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNav";
import SideMenuComp from "./SideMenuComp";
import { InputGroup, FormControl } from "react-bootstrap";
import SendIcon from "@material-ui/icons/Send";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import firebase from "firebase";
import MesaageFeed from "./MessagesFeed";
import "./ChatAdmin.css";

function ChatAdmin() {
  const [getChat, setgetChat] = useState([]);
  const { currentUser } = useAuth();
  const [input, setInput] = useState("");
  const [userName, setuserName] = useState("");
  const [messages, setmessages] = useState([]);

// const getDataChat= async()=>{
//   await db
//     .collection("admin-message")
//     .doc()
//     .get()
//     .then((cred) => {
//       console.log(cred.data())
//     });
// }


  const getUserName = async () => {
    await db
      .collection("admin-users")
      .doc(currentUser.uid)
      .get()
      .then((cred) => {
        console.log(cred.data().UserName);
        setuserName(cred.data().UserName);
      });
  };
  useEffect(() => {
    const unsub = getUserName();
    // getDataChat();

    return unsub;
  }, []);

  const messageHandler = async (e) => {
    e.preventDefault();
    await db.collection("admin-message").add({
      AdminName: userName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setmessages([...messages, input]);

    setInput("");
  };

  return (
    <div className="dash-container">
      <CustomNavbar />
      <SideMenuComp />
      <div className="content-div">
        <div className="activity-feed">
          <div className="title-holder">
            <p>
              <strong>Admin Chat Center</strong>
            </p>
          </div>

          <div className="input-holder">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Type Your Message"
                aria-label="Type Your Message"
                aria-describedby="basic-addon2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <InputGroup.Append>
                <InputGroup.Text
                  className="btn-chat"
                  id="basic-addon2"
                  onClick={messageHandler}
                >
                  <SendIcon />
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </div>
          {/* {console.log(input)} */}
          {console.log(messages)}
          {messages.map((message, id) => (
            <li key={id} style={{ listStyleType: "none" }}>
              <div>
                {userName}: {message}
              </div>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatAdmin;
