import React, { useState, useEffect } from "react";
import {
  getGiftcodes,
  createGiftcode,
  deleteGiftcode,
} from "./api"; // import all API functions
import "./Giftcodes.css";

const Giftcodes = () => {
  const [giftcodeAmount, setGiftcodeAmount] = useState("");
  const [numUsers, setNumUsers] = useState("");
  const [hasExpiry, setHasExpiry] = useState(false);
  const [expiryDateTime, setExpiryDateTime] = useState("");
  const [onlyNewUsers, setOnlyNewUsers] = useState(false);
  const [giftcodes, setGiftcodes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all giftcodes
  const fetchGiftcodes = async () => {
    setLoading(true);
    try {
      const data = await getGiftcodes();
      setGiftcodes(data.giftcodes);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGiftcodes();
  }, []);

  const handleCreateGiftcode = async () => {
    if (!giftcodeAmount || !numUsers) return;
    if (hasExpiry && !expiryDateTime) return;

    const giftcodeData = {
      creator: "9120735656",
      amount: giftcodeAmount,
      users: numUsers,
      newUsersOnly: onlyNewUsers,
      expiry: hasExpiry ? expiryDateTime : "No",
    };

    try {
      await createGiftcode(giftcodeData);
      fetchGiftcodes(); // refresh list
      setGiftcodeAmount("");
      setNumUsers("");
      setHasExpiry(false);
      setExpiryDateTime("");
      setOnlyNewUsers(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this giftcode?")) return;
    try {
      await deleteGiftcode(id);
      fetchGiftcodes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <header className="header">
          <h1 className="header-title">Giftcodes</h1>
        </header>

        {/* Form */}
        <div className="form-card">
          <div className="form-group">
            <h2>Giftcode Amount</h2>
            <input
              type="number"
              value={giftcodeAmount}
              onChange={(e) => setGiftcodeAmount(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <h2>Users</h2>
            <input
              type="number"
              value={numUsers}
              onChange={(e) => setNumUsers(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-check">
              <input
                type="checkbox"
                checked={hasExpiry}
                onChange={(e) => setHasExpiry(e.target.checked)}
              />
              <span>Expiry Date & Time</span>
            </label>
            {hasExpiry && (
              <input
                type="datetime-local"
                value={expiryDateTime}
                onChange={(e) => setExpiryDateTime(e.target.value)}
                className="form-input"
              />
            )}
          </div>

          <div className="form-check">
            <input
              type="checkbox"
              checked={onlyNewUsers}
              onChange={(e) => setOnlyNewUsers(e.target.checked)}
            />
            <span>Only New Users</span>
          </div>

          <button className="btn-create" onClick={handleCreateGiftcode}>
            Create
          </button>
        </div>

        {/* Table */}
        <div className="table-wrapper">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="gift-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Creator</th>
                  <th>Amount</th>
                  <th>Users</th>
                  <th>New Users Only</th>
                  <th>Expiry</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {giftcodes.map((code) => (
                  <tr key={code._id}>
                    <td>{code._id}</td>
                    <td className="blue-text">{code.creator}</td>
                    <td>{code.amount}</td>
                    <td>{code.users}</td>
                    <td>{code.newUsersOnly ? "Yes" : "No"}</td>
                    <td>{code.expiry}</td>
                    <td>
                      <button
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => handleDelete(code._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Giftcodes;
