import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const getVIPLevel = (totalBuy) => {
    if (totalBuy >= 6000) return "VIP6";
    if (totalBuy >= 5000) return "VIP5";
    if (totalBuy >= 4000) return "VIP4";
    if (totalBuy >= 3000) return "VIP3";
    if (totalBuy >= 2000) return "VIP2";
    if (totalBuy >= 1000) return "VIP1";
    return "-";
  };

  return (
    <div className="users-container">
      <h3>All Users</h3>
      <table className="users-table">
        <thead>
          <tr>
            <th>Phone</th>
            <th>Referred By</th>
            <th>Total Buy</th>
            <th>VIP Level</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.phone}</td>
              <td>{user.referredBy}</td>
              <td>₹{user.totalBuy}</td>
              <td>{getVIPLevel(user.totalBuy)}</td>
              <td>₹{user.balance}</td>
              <td>
                <button onClick={() => navigate(`/teams/${user._id}`)}>Teams</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
