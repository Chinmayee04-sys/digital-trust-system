import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComplaintById } from "../services/complaintService";
import "../styles/ComplaintDetails.css";

const ComplaintDetails = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await getComplaintById(id);
        console.log("DETAIL RESPONSE:", res);

        // ✅ BACKEND RETURNS { success, complaint }
        setComplaint(res.complaint);
      } catch (err) {
        console.error(err);
        setError("Failed to load complaint details");
      }
    };

    fetchComplaint();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!complaint) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <h2>📄 Complaint Details</h2>

      <div className="details-card">
        <p><strong>Category:</strong> {complaint.category}</p>
        <p><strong>Description:</strong> {complaint.description}</p>
        <p><strong>Location:</strong> {complaint.location}</p>

        <p className={`status ${complaint.status.toLowerCase()}`}>
          Status: {complaint.status}
        </p>
      </div>

      {/* Documents */}
      <section>
        <h3>📎 Documents</h3>
        {complaint.documents?.length > 0 ? (
          complaint.documents.map((doc, i) => (
            <a
              key={i}
              href={`http://localhost:5000/uploads/${doc}`}
              target="_blank"
              rel="noreferrer"
            >
              {doc}
            </a>
          ))
        ) : (
          <p>No documents uploaded</p>
        )}
      </section>

      {/* Remarks */}
      <section>
        <h3>💬 Remarks</h3>
        {complaint.remarks?.length > 0 ? (
          complaint.remarks.map((r, i) => (
            <div key={i} className="remark">
              <p>{r.text}</p>
              <small>{new Date(r.date).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>No remarks yet</p>
        )}
      </section>
    </div>
  );
};

export default ComplaintDetails;
