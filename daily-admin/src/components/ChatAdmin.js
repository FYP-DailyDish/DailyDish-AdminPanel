import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNav";
import SideMenuComp from "./SideMenuComp";
import { InputGroup, FormControl, Button, Spinner } from "react-bootstrap";
import SendIcon from "@material-ui/icons/Send";
import { useAuth } from "../context/AuthContext";
import { db } from "../Firebase";
import firebase from "firebase";
import MesaageFeed from "./MessagesFeed";
import DeleteIcon from "@material-ui/icons/Delete";
import "./ChatAdmin.css";

function ChatAdmin() {
  const [getChat, setgetChat] = useState([]);
  const { currentUser } = useAuth();
  const [input, setInput] = useState("");
  const [userName, setuserName] = useState("");
  const [messages, setmessages] = useState([]);
  const [dataloading, setDataloading] = useState(true);
  const [messageRef, setmessageRef] = useState("");

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
    setDataloading(true);
    const unsub = getUserName();
    const anotherUnsub = messageSave();
    setDataloading(false);
    return unsub && anotherUnsub;
  }, []);

  const messageHandler = async (e) => {
    setDataloading(true);
    e.preventDefault();
    await db.collection("admin-message").add({
      id: currentUser.uid,
      AdminName: userName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setmessages([...messages, input]);

    console.log("oye bhae 👨‍🚀 ", messageRef);
    setInput("");
  };

  const messageSave = async () => {
    await db
      .collection("admin-message")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setmessages(
          snapshot.docs.map((doc) => ({
            id: doc.data().id,
            MessageRefID: doc.id,
            AdminName: doc.data().AdminName,
            message: doc.data().message,
          }))
        );
        messages.map((msg) => {
          console.log(msg.MessageRefID)
          setmessageRef(msg.MessageRefID);
        });
        setDataloading(false);
      });
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
            <InputGroup className="mb-3" id="input-area">
              <FormControl
                placeholder="Type Your Message"
                aria-label="Type Your Message"
                aria-describedby="basic-addon2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <InputGroup.Append>
                <InputGroup.Text className="holder">
                  <Button
                    type="submit"
                    className="btn-chat"
                    id="basic-addon2"
                    onClick={messageHandler}
                  >
                    <SendIcon />
                  </Button>
                </InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </div>
          {/* {console.log(input)} */}
          {console.log(messages)}
          {dataloading == true ? (
            <div className="spinner-holder">
              <Spinner animation="border" />
            </div>
          ) : (
            <div>
              {messages.map((message, id) => (
                <li
                  key={id}
                  style={{ listStyleType: "none" }}
                  className="chat-list"
                >
                  <div className="chat-box">
                    <p className="message-text">
                      <strong>{message.AdminName}:</strong> {message.message}.
                    </p>
                    {/* <p className="message-text">Send at: {message.timestamp== null? (<p>Reload To fetch</p>):(<p>{message.timestamp}</p>)}</p> */}

                  </div>
                </li>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatAdmin;
