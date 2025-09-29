import React from "react";
import "./Teams.css";

function Teams() {
  const dummyData = [
    {
      id: 1,
      name: "John Doe",
      number: "9876543210",
      totalBuy: 500,
      purchaseHistory: ["100", "200", "200"],
      relation: "Direct",
      balanceProfit: 5000,
    },
    {
      id: 2,
      name: "Jane Smith",
      number: "8765432109",
      totalBuy: 300,
      purchaseHistory: ["150", "150"],
      relation: "Indirect",
      balanceProfit: 3000,
    },
  ];

  return (
    <div className="teams-container">
      <h3>Teams</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Total Buy</th>
            <th>Purchase History</th>
            <th>Relation</th>
            <th>Balance Profit</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.number}</td>
              <td>{user.totalBuy}</td>
              <td>{user.purchaseHistory.join(", ")}</td>
              <td>{user.relation}</td>
              <td>{user.balanceProfit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teams;
