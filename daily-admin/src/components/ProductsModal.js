import React, { useState, useEffect } from "react";
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "react-bootstrap";
import PersonIcon from "@material-ui/icons/Person";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { db } from "../Firebase";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import "./ProductsModal.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "70%",
    maxWidth: "120vw",
    maxHeight: "70%",
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
function ProductsModal({ userInfo }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [productsData, setproductsData] = useState([]);
  const closeModalHandler = () => {
    setOpen(false);
    setInput("");
  };

  const getproducts = async () => {
    const productRef = db
      .collection("products-view")
      .where("ownerId", "==", userInfo.id);
    await productRef.get().then((res) => {
      setproductsData(
        res.docs.map((doc) => ({
          id: doc.id,
          product: doc.data().title,
          kitchenNme: doc.data().KitchenName,
          img: doc.data().imageUrl,
          description: doc.data().description,
          price: Number.parseInt(doc.data().price),
          time: doc.data().timestamp.toDate().toString().slice(0, 21),
          cat: doc.data().category,
        }))
      );
    });
  };
  useEffect(() => {
    getproducts();
    return () => {
      getproducts();
    };
  }, []);
  return (
    <>
      <Modal open={open} onClose={closeModalHandler}>
        <div className={classes.paper}>
          {/* <h1>{userInfo.UserName}</h1>
          <p>Current Address : {userInfo.CurrentAddress}</p>
          <p>Kitchen Name: {userInfo.KitchenName}</p>
          <p>Phone Number : {userInfo.phnumber}</p>
          <p>Ban Status: {userInfo.Disable.toString()}</p>
          <p>
            SignUp on: {userInfo.timestamp.toDate().toString().slice(0, 21)}{" "}
          </p> */}
          {productsData.length == 0 ? (
            <>
              <h1>No products have been added by this chef</h1>
            </>
          ) : (
            <>
              {productsData.map((data) => (
                <ul key={data.id}>
                  <li className="list">
                    <img className="img" src={data.img} />
                    <p>Product Name: {data.product}</p>
                    <p>Description: {data.description}</p>
                    <p>Price: {data.price}</p>
                    <p>Category: {data.cat}</p>
                    <p>Added on: {data.time}</p>
                  </li>
                </ul>
              ))}
            </>
          )}

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
        variant="danger"
        onClick={(e) => setOpen(true)}
      >
        <AssignmentTurnedInIcon /> View Chef Products
      </Button>
    </>
  );
}

export default ProductsModal;
