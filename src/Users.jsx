import React from "react";
import "./users.css"; // fixed lowercase import
import usersData from "./users.json"; // your local JSON file

function Users() {
  return (
    <div className="users-container">
      <h3>All Users</h3>

      <div className="users-controls">
        <input
          type="text"
          placeholder="Search users"
          style={{
            width: "25rem",
            marginRight: "12px",
            borderRadius: "1rem",
            height: "1.4rem",
          }}
        />

        <select
          style={{
            border: "2px solid black",
            marginRight: "12px",
            borderRadius: "1rem",
            height: "2.5rem",
          }}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          style={{
            border: "2px solid black",
            marginRight: "12px",
            borderRadius: "1rem",
            height: "2.5rem",
          }}
        >
          <option value={50}>50 rows</option>
          <option value={100}>100 rows</option>
          <option value={200}>200 rows</option>
        </select>
      </div>

      <br />

      <table className="users-table">
        <thead>
          <tr>
            <th style={{ background: "#f5f569ff" }}>ID</th>
            <th style={{ background: "#f5f569ff" }}>Mobile</th>
            <th style={{ background: "#f5f569ff" }}>Own Code</th>
            <th style={{ background: "#f5f569ff" }}>Refer Code</th>
            <th style={{ background: "#f5f569ff" }}>Password</th>
            <th style={{ background: "#f5f569ff" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.mobile}</td>
              <td>{user.ownCode}</td>
              <td>{user.referCode}</td>
              <td>{user.password}</td>
              <td>
                <button>Reset</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
