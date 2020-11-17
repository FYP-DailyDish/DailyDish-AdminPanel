import React, { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Spinner } from "react-bootstrap";
import PersonIcon from "@material-ui/icons/Person";
import { db } from "../Firebase";
import firebase from "firebase";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import "./AdminModal.css";
import GradeIcon from "@material-ui/icons/Grade";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "50%",
    maxWidth: "120vw",
    maxHeight: "75%",
    position: "fixed",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  button: {
    margin: theme.spacing(1),
  },
}));
function AdminModal({ userInfo }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dataLoading, setdataLoading] = useState(false);
  const [Pavail, setPavail] = useState(false);
  const [Pimage, setPimage] = useState("");
  const [input, setInput] = useState("");
  const closeModalHandler = () => {
    setOpen(false);
    setInput("");
  };
  const getPicture = async () => {
    setdataLoading(true);
    await firebase
      .storage()
      .ref("users/" + userInfo.id + "/profile.jpg")
      .getDownloadURL()
      .then((imgUrl) => {
        console.log(imgUrl);
        setdataLoading(false);
        setPimage(imgUrl);
        setPavail(true);
      })
      .catch(() => {
        setdataLoading(false);
      });
  };
  useEffect(() => {
    const unsub = getPicture();
    return unsub;
  }, []);

  return (
    <>
      <Modal open={open} onClose={closeModalHandler}>
        <div className={classes.paper}>
          {dataLoading ? (
            <div className="spinner-holder">
              <Spinner animation="border" />
            </div>
          ) : (
            <div>
              {Pavail ? (
                <div className="image-holder">
                  <img
                    id="new-image"
                    className="profile-photo"
                    alt="profile image"
                    src={Pimage}
                  />
                </div>
              ) : (
                <div>
                  <p className="modal-text">
                    {" "}
                    <SentimentVeryDissatisfiedIcon /> No Profile Photo
                    Availaible{" "}
                  </p>
                </div>
              )}
            </div>
          )}
          <h1 className="userName-text"> {userInfo.UserName} </h1>
          <p className="modal-text">
            Email: <strong>{userInfo.UserEmail}</strong>{" "}
          </p>
          <p className="modal-text">
            <GradeIcon /> Admin Status: <strong>{userInfo.AdminStatus}</strong>{" "}
          </p>
          <p className="modal-text">
            <PersonAddDisabledIcon /> Banned Status:{" "}
            <strong>{userInfo.Disable.toString()}</strong>
          </p>

          {/* <input
            placeholder={todo.todo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          /> */}
          {/* <Button
            variant="contained"
            color="primary"
            disabled={!input}
            type="submit"
            onClick={updateTodo}
          >
            {" "}
            Update Todo{" "}
          </Button> */}
        </div>
      </Modal>
      <Button
        style={{ marginRight: "2%" }}
        variant="info"
        onClick={(e) => setOpen(true)}
      >
        <PersonIcon /> View Profile
      </Button>
    </>
  );
}

export default AdminModal;
