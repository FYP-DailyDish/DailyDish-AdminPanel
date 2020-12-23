import React, { useState, useEffect } from "react";
import CustomNavbar from "./CustomNav";
import SideMenuComp from "./SideMenuComp";
import { db } from "../Firebase";
import OrderActivityList from "./OrderActivityList";
import { Button, Spinner } from "react-bootstrap";
import "./Dashboard.css";

function OrderComp() {
  const [orders, setorders] = useState([]);
  const [dataload, setdataload] = useState(false);
  const getAllorders = async () => {
    setdataload(true);
    let orderRef = db.collection("orders").orderBy("timestamp", "desc");
    await orderRef.get().then((res) => {
      // res.docs.map(doc=>{
      //   console.log(doc.data())
      // })

      setorders(
        res.docs.map((doc) => ({
          id: doc.id,
          CustomerName: doc.data().CustomerName,
          phnumber: doc.data().phnumber,
          CurrentAddr: doc.data().CurrentAddress,
          item: doc.data().items,
          totalAmount: doc.data().totalAmount,
          timestamp: doc.data().timestamp.toDate().toString().slice(0, 21),
          orderStatus: doc.data().orderStatus,
          deliverystatus: doc.data().deliverystatus,
        }))
      );
    });
  };

  useEffect(() => {
    const unsub = getAllorders();
    setdataload(false);
    return unsub;
  }, []);
  return (
    <div className="dash-container">
      <CustomNavbar />
      <SideMenuComp />
      <div className="content-div">
        <div className="activity-feed">
          {/* {orders.map(order=>(
            <p>{order.Total}</p>
          ))} */}
          {dataload == true ? (
            <div className="spinner-holder">
              <Spinner animation="border" />
            </div>
          ) : (
            <>
              <OrderActivityList user={orders} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrderComp;
