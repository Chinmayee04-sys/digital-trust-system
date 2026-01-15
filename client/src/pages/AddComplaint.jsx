import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComplaint } from "../services/complaintService";
import "../styles/dashboard.css";

const AddComplaint = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    category: "",
    description: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createComplaint(form);
      alert("Complaint submitted successfully");
      navigate("/citizen");
    } catch (err) {
      alert("Failed to submit complaint");
    }
  };

  return (
    <div className="container">
      <h2>Add New Complaint</h2>

      <form onSubmit={handleSubmit} className="card">
        <label>Category</label>
        <select name="category" onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Fraud">Fraud</option>
          <option value="Theft">Theft</option>
          <option value="Cyber Crime">Cyber Crime</option>
        </select>

        <label>Description</label>
        <textarea
          name="description"
          rows="4"
          onChange={handleChange}
          required
        />

        <label>Location</label>
        <input
          type="text"
          name="location"
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Complaint</button>
      </form>
    </div>
  );
};

export default AddComplaint;
