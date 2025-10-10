import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./purchaseHistory.css";

function PurchaseHistory() {
  const { userId } = useParams();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get(`http://localhost:5004/api/purchases/user/${userId}`);
        setPurchases(res.data.purchases);
      } catch (err) {
        console.error("Error fetching purchases:", err);
      }
    };
    fetchPurchases();
  }, [userId]);

  return (
    <div className="purchase-history-container">
      <h3>Purchase History</h3>
      <Link to="/users" className="back-btn">← Back</Link>
      <table className="purchase-table">
        <thead>
          <tr>
            <th>Purchase ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {purchases.length > 0 ? (
            purchases.map((p) => (
              <tr key={p._id}>
                <td>{p._id}</td>
                <td>₹{p.amount}</td>
                <td>{new Date(p.createdAt).toLocaleString()}</td>
                <td>{p.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No purchases found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PurchaseHistory;
