import React from "react";
import "./Withdrawal.css";
import withdrawData from "./withdrawData.json"; // Import JSON file

function Withdrawal() {
  return (
    <div className="withdraw-container">
      <h2>Withdrawal Management</h2>
      <p>Hello Guest!</p>

      <div className="withdraw-stats">
        <div>
          Approved Withdrawals<br />
          <strong>₹5,664.00</strong><br />
          12 transactions
        </div>
        <div>
          Pending Withdrawals<br />
          <strong>₹0.00</strong><br />
          0 transactions
        </div>
        <div>
          Rejected Withdrawals<br />
          <strong>₹7,836.00</strong><br />
          20 transactions
        </div>
      </div>

      <div className="search-box">
        <input type="text" placeholder="Search withdraw requests..." />
      </div>

      <table className="withdraw-table">
        <thead>
          <tr>
            <th style={{background:"#f5f569ff"}}>ID</th>
            <th style={{background:"#f5f569ff"}}>Mobile</th>
            <th style={{background:"#f5f569ff"}}>Amount</th>
            <th style={{background:"#f5f569ff"}}>Account Number</th>
            <th style={{background:"#f5f569ff"}}>IFSC Code</th>
            <th style={{background:"#f5f569ff"}}>Account Name</th>
            <th style={{background:"#f5f569ff"}}>Date/Time</th>
            <th style={{background:"#f5f569ff"}}>Status</th>
            <th style={{background:"#f5f569ff"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {withdrawData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.mobile}</td>
              <td>{item.amount}</td>
              <td>{item.accountNumber}</td>
              <td>{item.ifsc}</td>
              <td>{item.accountName}</td>
              <td>{item.dateTime}</td>
              <td>{item.status}</td>
              <td>
                {item.status === "pending" && "Approve | Reject"}
                {item.status === "approved" && "Reject"}
                {item.status === "rejected" && "Approve | Reject"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Withdrawal;
