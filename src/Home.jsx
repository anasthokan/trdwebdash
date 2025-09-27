import React from "react";
import "./App.css";
import { homeData } from "./data";

function Home() {
  return (
    <div className="dashboard-home">
      <h2 className="dashboard-title">Dashboard</h2>
      {/* Stat Cards */}
      <div className="stat-cards">
        {homeData.stats.map((stat, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <small>{stat.title}</small>
              <div className="display-6">{stat.value}</div>
              <p className={stat.trendClass}>{stat.trend}</p>
            </div>
          </div>
        ))}
      </div>

      {/* API Status */}
      <div className="section">
        <h3 className="dashboard-title">API Status</h3>
        <div className="api-status">
          {homeData.apis.map((api, index) => (
            <div className="status-card" key={index}>
              <h4>{api.name}</h4>
              <p className="expired">{api.status}</p>
              <small>{api.expiry}</small>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="section">
        <h3 className="dashboard-title">Recent Orders (7 Days)</h3>
        <table className="orders-table">
          <thead>
            <tr>
              <th style={{background:"#f5f569ff"}}>Order ID</th>
              <th style={{background:"#f5f569ff"}}>Product</th>
              <th style={{background:"#f5f569ff"}}>Mobile</th>
              <th style={{background:"#f5f569ff"}}>Price</th>
              <th style={{background:"#f5f569ff"}}>Date</th>
            </tr>
          </thead>
          <tbody>
            {homeData.orders.map((order, index) => (
              <tr key={index}>
                <td>{order.id}</td>
                <td>{order.product}</td>
                <td>{order.mobile}</td>
                <td>{order.price}</td>
                <td>{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     <div className="section">
  <h3 className="dashboard-title">Quick Stats</h3>
  <div className="quick-stats">
    {homeData.quickStats.map((q, index) => (
      <div className="q-card" key={index}>
        <div className="q-card-header">
          <div className={`q-icon ${q.iconBg}`}>
            {q.icon} {/* pass react-icon component from data */}
          </div>
          <h4>{q.title}</h4>
        </div>
        {q.details ? (
          <ul>
            {q.details.map((d, i) => (
              <li key={i}>
                {d.label}: <span className={d.className}>{d.status}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>{q.value}</p>
        )}
      </div>
    ))}
  </div>
</div>


      <div className="system-health">
      <h3>System Health</h3>

      <div className="health-item">
        <span>Server Load</span>
        <div className="progress-bar">
          <div className="progress-fill optimal" style={{ width: "35%" }}></div>
        </div>
        <span className="status optimal-text">Optimal</span>
      </div>

      <div className="health-item">
        <span>Database</span>
        <div className="progress-bar">
          <div className="progress-fill stable" style={{ width: "20%" }}></div>
        </div>
        <span className="status stable-text">Stable</span>
      </div>

      <div className="health-item">
        <span>Storage</span>
        <div className="progress-bar">
          <div className="progress-fill warning" style={{ width: "64%" }}></div>
        </div>
        <span className="status warning-text">64% Used</span>
      </div>
    </div>
    </div>
  );
}

export default Home;
