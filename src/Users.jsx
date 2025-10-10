import React, { useEffect, useState } from "react";
import "./users.css";
import { fetchUsers } from "./api";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For bank modal
  const [editingField, setEditingField] = useState(null); // 'spinsToday' or 'withdrawLimit'
  const [tempValue, setTempValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetchUsers();
        if (res.data.success) {
          setUsers(res.data.users);
        }
      } catch (err) {
        console.error("❌ Error fetching users:", err);
      }
    };
    getUsers();
  }, []);

  const getVIPLevel = (totalBuy) => {
    if (totalBuy >= 6000) return "VIP6";
    if (totalBuy >= 5000) return "VIP5";
    if (totalBuy >= 4000) return "VIP4";
    if (totalBuy >= 3000) return "VIP3";
    if (totalBuy >= 2000) return "VIP2";
    if (totalBuy >= 1000) return "VIP1";
    return "VIP0";
  };

  const handleEdit = (userId, field, value) => {
    setSelectedUser(userId);
    setEditingField(field);
    setTempValue(value);
  };

  const saveEdit = (userId, field) => {
    setUsers((prev) =>
      prev.map((u) =>
        u._id === userId
          ? {
              ...u,
              luckySpin:
                field === "spinsToday"
                  ? { ...u.luckySpin, spinsToday: tempValue }
                  : u.luckySpin,
              withdrawLimit:
                field === "withdrawLimit" ? Number(tempValue) : u.withdrawLimit,
            }
          : u
      )
    );
    setEditingField(null);
    setTempValue("");
  };

  return (
    <div className="users-container">
      <h3>All Users</h3>
      <table className="users-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Phone</th>
            <th>Referred By</th>
            <th>Total Buy</th>
            <th>VIP Level</th>
            <th>Balance</th>
            <th>Spins Today</th>
            <th>Withdraw Limit</th>
            <th>Actions</th>
            <th>Purchase History</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.phone}</td>
              <td>{user.referredBy?.phone || "—"}</td>
              <td>₹{user.totalBuy || 0}</td>
              <td>{getVIPLevel(user.totalBuy || 0)}</td>
              <td>₹{user.balance || 0}</td>

              {/* ✅ Editable Spins Today */}
              <td>
                {editingField === "spinsToday" && selectedUser === user._id ? (
                  <>
                    <input
                      type="number"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                    <button onClick={() => saveEdit(user._id, "spinsToday")}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {user.luckySpin?.spinsToday || 0}
                    <button
                      onClick={() =>
                        handleEdit(user._id, "spinsToday", user.luckySpin?.spinsToday || 0)
                      }
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>

              {/* ✅ Editable Withdraw Limit */}
              <td>
                {editingField === "withdrawLimit" && selectedUser === user._id ? (
                  <>
                    <input
                      type="number"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                    />
                    <button onClick={() => saveEdit(user._id, "withdrawLimit")}>
                      Save
                    </button>
                  </>
                ) : (
                  <>
                    {user.withdrawLimit}
                    <button
                      onClick={() =>
                        handleEdit(user._id, "withdrawLimit", user.withdrawLimit)
                      }
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>

              {/* ✅ Action Buttons */}
              <td>
                <button onClick={() => navigate(`/teams/${user._id}`)}>Teams</button>
                <button onClick={() => setSelectedUser(user)}>Show Bank</button>
              </td>

              {/* ✅ Purchase History Link */}
              <td>
                <button onClick={() => navigate(`/purchase-history/${user._id}`)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Bank Details Modal */}
      {selectedUser && selectedUser.bankDetails && (
        <div className="modal-overlay" onClick={() => setSelectedUser(null)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h4>Bank Details</h4>
            <p>
              <strong>Holder Name:</strong>{" "}
              {selectedUser.bankDetails.holderName || "—"}
            </p>
            <p>
              <strong>Account Number:</strong>{" "}
              {selectedUser.bankDetails.accountNumber || "—"}
            </p>
            <p>
              <strong>IFSC Code:</strong>{" "}
              {selectedUser.bankDetails.ifscCode || "—"}
            </p>
            <p>
              <strong>Bank Name:</strong>{" "}
              {selectedUser.bankDetails.bankName || "—"}
            </p>
            <p>
              <strong>UPI ID:</strong>{" "}
              {selectedUser.bankDetails.upiId || "—"}
            </p>
            <button onClick={() => setSelectedUser(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
