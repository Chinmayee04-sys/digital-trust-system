import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyComplaints } from "../services/complaintService";
import "../styles/CitizenDashboard.css";

const CitizenDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await getMyComplaints();
        console.log("API RESPONSE:", res);

        // ✅ FIX HERE
        setComplaints(res.data || []);
      } catch (err) {
        console.error("Failed to load complaints", err);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>👤 Citizen Dashboard</h2>
        <button onClick={() => navigate("/add-complaint")}>
          + Add Complaint
        </button>
      </div>

      {complaints.length === 0 ? (
        <p className="empty">No complaints found</p>
      ) : (
        <div className="complaint-list">
          {complaints.map((c) => (
            <div
              key={c._id}
              className="complaint-card"
              onClick={() => navigate(`/complaints/${c._id}`)}
            >
              <h4>{c.category}</h4>
              <p>{c.description}</p>
              <span className={`status ${c.status.toLowerCase()}`}>
                {c.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitizenDashboard;
