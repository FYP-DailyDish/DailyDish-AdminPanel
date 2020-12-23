import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "react-bootstrap";
import PersonIcon from "@material-ui/icons/Person";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "50%",
    maxWidth: "100vw",
    maxHeight: "50%",
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
function ChefModal({ userInfo }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const closeModalHandler = () => {
    setOpen(false);
    setInput("");
  };

  return (
    <>
      <Modal open={open} onClose={closeModalHandler}>
        <div className={classes.paper}>
          <h1>{userInfo.UserName}</h1>
          <p>Current Address : {userInfo.CurrentAddress}</p>
          <p>Kitchen Name: {userInfo.KitchenName}</p>
          <p>Phone Number : {userInfo.phnumber}</p>
          <p>Ban Status: {userInfo.Disable.toString()}</p>
          <p>
            SignUp on: {userInfo.timestamp.toDate().toString().slice(0, 21)}{" "}
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

export default ChefModal;
