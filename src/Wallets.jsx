import React from "react";
import "./Wallets.css";
import walletData from "./walletData.json"; // Import JSON file

function Wallets() {
  return (
    <div className="wallets-container">
      <h3>Wallet Management</h3>

      <div className="wallets-stats">
        <div>Total Wallets: {walletData.length}</div>
        <div>Total Balance: ₹7,880.00</div>
        <div>Total Income: ₹0.00</div>
      </div>

      <table className="wallets-table">
        <thead>
          <tr>
            <th style={{background:"#f5f569ff"}}>ID</th>
            <th style={{background:"#f5f569ff"}}>Mobile</th>
            <th style={{background:"#f5f569ff"}}>Personal Wallet</th>
            <th style={{background:"#f5f569ff"}}>Income</th>
            <th style={{background:"#f5f569ff"}}>Balance Meter</th>
            <th style={{background:"#f5f569ff"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {walletData.map((wallet, index) => (
            <tr key={`${wallet.id}-${index}`}>
              <td>{wallet.id}</td>
              <td>{wallet.mobile}</td>
              <td>{wallet.personalWallet}</td>
              <td>{wallet.income}</td>
              <td>{wallet.balanceMeter}</td>
              <td className="editbtn">Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Wallets;
