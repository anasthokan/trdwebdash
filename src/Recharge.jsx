import React from "react";
import "./Recharge.css";
import rechargeData from "./rechargeData.json";

function Recharge() {
  return (
    <div className="recharge-container">
      <h2>Recharge Management</h2>
      
      <div className="search-box">
        <input type="text" placeholder="Search by mobile or transaction ID..." />
      </div>

      <table className="recharge-table">
        <thead>
          <tr>
            <th style={{background:"#f5f569ff"}}>ID</th>
            <th style={{background:"#f5f569ff"}}>Mobile</th>
            <th style={{background:"#f5f569ff"}}>Amount</th>
            <th style={{background:"#f5f569ff"}}>Date</th>
            <th style={{background:"#f5f569ff"}}>Status</th>
            <th style={{background:"#f5f569ff"}}>Transaction ID</th>
            <th style={{background:"#f5f569ff"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rechargeData.map((rec) => (
            <tr key={rec.id}>
              <td>{rec.id}</td>
              <td>{rec.mobile}</td>
              <td>{rec.amount}</td>
              <td>{rec.date}</td>
              <td>{rec.status}</td>
              <td>{rec.txnId || "-"}</td>
              <td>
                {rec.status === "Pending" ? "Approve" : rec.status === "Approved" ? "Revert" : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button>1</button>
        <button>2</button>
        <button>Next</button>
      </div>
    </div>
  );
}

export default Recharge;
