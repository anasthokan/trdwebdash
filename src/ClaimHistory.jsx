import React, { useState } from "react";
import claimData from "./claimData.json";
import "./ClaimHistory.css";

const ClaimHistory = () => {
  const [search, setSearch] = useState("");
  const [cycleFilter, setCycleFilter] = useState("All Cycles");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredData = claimData
    .filter((item) =>
      item.mobile.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      cycleFilter === "All Cycles" ? true : item.cycle === Number(cycleFilter)
    )
    .sort((a, b) => {
      const dateA = new Date(a.claimDate);
      const dateB = new Date(b.claimDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="claim-history-container">
      <h2>Claim History</h2>
      <p>Hello Guest!</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search claim history..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filters">
        <select value={cycleFilter} onChange={(e) => setCycleFilter(e.target.value)}>
          <option>All Cycles</option>
          <option value="30">Cycle 30</option>
          <option value="38">Cycle 38</option>
        </select>

        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Sort by Date (Asc)</option>
          <option value="desc">Sort by Date (Desc)</option>
        </select>
      </div>

      <table className="claim-history-table">
        <thead>
          <tr>
            <th style={{background:"#f5f569ff"}}>Mobile Number</th>
            <th style={{background:"#f5f569ff"}}>Order ID</th>
            <th style={{background:"#f5f569ff"}}>Daily Amount</th>
            <th style={{background:"#f5f569ff"}}>Cycle</th>
            <th style={{background:"#f5f569ff"}}>Claim Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.mobile}</td>
                <td>{item.orderId}</td>
                <td>{item.dailyAmount}</td>
                <td>{item.cycle}</td>
                <td>{item.claimDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimHistory;
