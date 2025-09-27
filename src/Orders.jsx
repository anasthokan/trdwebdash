import React from "react";
import "./Orders.css";
import ordersData from "./ordersData.json"; // import JSON file

function Orders() {
  return (
    <div className="orders-container">
      <h2>All Orders</h2>
      
      <div className="orders-stats">
        <div>
          Total Orders<br />
          <strong>31</strong>
        </div>
        <div>
          Total Revenue<br />
          <strong>₹161,955.00</strong>
        </div>
        <div>
          Avg Order Value<br />
          <strong>₹5,224.35</strong>
        </div>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search orders..." />
      </div>

      <table className="orders-table">
        <thead>
          <tr>
            <th style={{background:"#f5f569ff"}}>Mobile</th>
            <th style={{background:"#f5f569ff"}}>Order ID</th>
            <th style={{background:"#f5f569ff"}}>Product</th>
            <th style={{background:"#f5f569ff"}}>Created At</th>
            <th style={{background:"#f5f569ff"}}>Expiry Status</th>
            <th style={{background:"#f5f569ff"}}>Price</th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order) => (
            <tr key={order.orderId}>
              <td>{order.mobile}</td>
              <td>{order.orderId}</td>
              <td>{order.product}</td>
              <td>{order.createdAt}</td>
              <td>{order.expiryStatus}</td>
              <td>{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
