import React, { useEffect, useState } from "react";
import axios from "axios";

const SpinItems = () => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    amount: "",
    reward: "",
    priority: ""
  });

  // ✅ Fetch spin items from backend
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/spin/client/spin-items");
      setItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching spin items:", err);
      setItems([]);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // ✅ Add or update spin items
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure numeric fields are numbers
    const payload = {
      ...form,
      amount: Number(form.amount),
      priority: Number(form.priority)
    };

    try {
      await axios.post("http://localhost:5000/api/spin/admin/spin-items", payload, {
        headers: { "Content-Type": "application/json" }
      });
      fetchItems(); // refresh the list
      setForm({ name: "", imageUrl: "", amount: "", reward: "", priority: "" });
    } catch (err) {
      console.error("Error adding spin item:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎡 Manage Spin Items</h2>

      {/* Add/Update Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Reward"
          value={form.reward}
          onChange={(e) => setForm({ ...form, reward: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Priority"
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
          required
        />
        <button type="submit">Save Item</button>
      </form>

      {/* Items List */}
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Amount</th>
            <th>Reward</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="5">No spin items available.</td>
            </tr>
          ) : (
            items.map((it) => (
              <tr key={it._id}>
                <td>{it.name}</td>
                <td>
                  <img src={it.imageUrl} alt={it.name} width="50" />
                </td>
                <td>{it.amount}</td>
                <td>{it.reward}</td>
                <td>{it.priority}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SpinItems;
