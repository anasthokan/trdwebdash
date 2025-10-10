import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./teams2.css";

function TeamsPage() {
  const { userId } = useParams();
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [team3, setTeam3] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`http://localhost:5004/api/users/teams/${userId}`);
        if (res.data.success) {
          setTeam1(res.data.team1 || []);
          setTeam2(res.data.team2 || []);
          setTeam3(res.data.team3 || []);
        }
      } catch (err) {
        console.error("❌ Error fetching teams:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [userId]);

  const getVIPLevel = (totalBuy = 0) => {
    if (totalBuy >= 6000) return "VIP6";
    if (totalBuy >= 5000) return "VIP5";
    if (totalBuy >= 4000) return "VIP4";
    if (totalBuy >= 3000) return "VIP3";
    if (totalBuy >= 2000) return "VIP2";
    if (totalBuy >= 1000) return "VIP1";
    return "VIP0";
  };

  if (loading) {
    return (
      <div className="teams-container">
        <p>Loading team data...</p>
      </div>
    );
  }

  const renderTeamTable = (title, teamData) => (
    <div className="team-section">
      <h4 className="team-title">
        {title} <span className="member-count">({teamData.length} Members)</span>
      </h4>
      {teamData.length === 0 ? (
        <p className="no-members">No members in this team</p>
      ) : (
        <table className="team-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Total Buy</th>
              <th>Relation</th>
              <th>Balance Profit</th>
              <th>VIP Level</th>
              <th>Purchase</th> 
            </tr>
          </thead>
          <tbody>
            {teamData.map((member) => (
              <tr key={member._id}>
                <td>{member.name || "—"}</td>
                <td>{member.phone || "—"}</td>
                <td>₹{member.totalBuy || 0}</td>
                <td>{member.relation || "—"}</td>
                <td>₹{member.balance || 0}</td>
                <td>{getVIPLevel(member.totalBuy)}</td>
                <td>
                <button onClick={() => navigate(`/purchase-history/${user._id}`)}>
                  View
                </button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  return (
    <div className="teams-container">
      <div className="teams-header">
        <h3>Teams Overview</h3>
        <Link to="/users" className="back-btn">← Back</Link>
      </div>

      {/* ✅ Three separate tables */}
      {renderTeamTable("Team 1 (Direct Referrals)", team1)}
      {renderTeamTable("Team 2", team2)}
      {renderTeamTable("Team 3", team3)}
    </div>
  );
}

export default TeamsPage;
