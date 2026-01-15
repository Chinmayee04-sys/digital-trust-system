import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/dashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    };
    fetchStats();
  }, []);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2 className="dashboard-header">Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Complaints</h3>
          <p>{stats.total}</p>
        </div>
        <div className="stat-card">
          <h3>Open</h3>
          <p>{stats.open}</p>
        </div>
        <div className="stat-card">
          <h3>Resolved</h3>
          <p>{stats.resolved}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
