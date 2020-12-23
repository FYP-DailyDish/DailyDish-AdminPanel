import React from "react";
import "./Dashboard.css";
import "./OrderActivityList.css";

function OrderActivityList({ user }) {
  return (
    <>
      <h1 className="title-order">Orders Placed </h1>
      {console.log("i am here=====>", user)}
      {user.map((user) => (
        <li className="listdesign" key={user.id}>
          {/* An Rider with Name <strong>{user.UserName}</strong> and Email ID:{" "}
           <strong>{user.UserEmail}</strong> added on{" "}
           <strong>{user.timestamp.toDate().toString().slice(0, 21)}</strong> */}
          <div className="list-styl">
            <p>
              <b>Order Id:</b> {user.id}
            </p>
            <p>
              <b>Customer Name: </b>
              {user.CustomerName}
            </p>
            <p>
              <b>Customer Phone Number:</b> {user.phnumber}
            </p>
            <p>
              <b>Customer Address:</b> {user.CurrentAddr}
            </p>
            <p>
              <b>Total Amount: </b>
              {user.totalAmount}
            </p>
            <p>
              <b>Order Status: </b>
              {user.orderStatus}
            </p>
            <p>
              <b>Delivery Status:</b> {user.deliverystatus}
            </p>
            <p>
              <b>Placed On: </b>
              {user.timestamp}
            </p>
            <h4 className="title-order">Ordered Items:</h4>
            {user.item.map((use) => (
              <ul>
                <li className="sublist-styl">
                  <div>
                    <p>
                      <b>Kitchen Name:</b> {use.kitchenName}
                    </p>
                    <p>
                      <b>Product Name: </b>
                      {use.productTitle}
                    </p>
                    <p>
                      <b>Product Price: </b>
                      {use.productPrice}
                    </p>
                    <p>
                      <b>Quantity:</b> {use.quantity}
                    </p>
                    <p>
                      <b>Sum:</b> {use.sum}
                    </p>
                  </div>
                </li>
              </ul>
            ))}
          </div>
        </li>
      ))}
    </>
  );
}

export default OrderActivityList;
