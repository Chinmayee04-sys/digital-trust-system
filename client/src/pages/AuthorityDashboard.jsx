import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/dashboard.css";

const AuthorityDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      const res = await api.get("/authority/complaints");
      setComplaints(res.data.complaints || []);
    };
    fetchComplaints();
  }, []);

  return (
    <div className="container">
      <h2 className="dashboard-header">Authority Dashboard</h2>

      {complaints.length === 0 ? (
        <p>No complaints assigned</p>
      ) : (
        complaints.map((c) => (
          <div
            key={c._id}
            className="dashboard-card"
            onClick={() => navigate(`/complaints/${c._id}`)}
          >
            <strong>{c.category}</strong>
            <p>Status: {c.status}</p>
            <small>{c.location}</small>
          </div>
        ))
      )}
    </div>
  );
};

export default AuthorityDashboard;
