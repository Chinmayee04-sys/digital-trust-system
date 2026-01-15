const Complaint = require("../models/Complaint");
const { v4: uuidv4 } = require("uuid");

const User = require("../models/User");

exports.createComplaint = async (req, res) => {
  try {
    const { category, description, location } = req.body;

    if (!category || !description || !location) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // 🔍 Find authority for category
    const authority = await User.findOne({
      role: "authority",
      department: category
    });

    const complaint = await Complaint.create({
      complaintId: uuidv4(),
      user: req.user.id,
      category,
      description,
      location,
      assignedAuthority: authority ? authority._id : null
    });

    res.status(201).json({
      success: true,
      complaintId: complaint.complaintId,
      assignedTo: authority ? authority.name : "Not assigned"
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error while creating complaint"
    });
  }
};


/**
 * GET MY COMPLAINTS
 * GET /api/complaints/my
 */
exports.myComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id })
      .select("-__v -updatedAt")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: complaints.length,
      data: complaints,
    });
  } catch (err) {
    console.error("Get My Complaints Error:", err);
    res.status(500).json({
      success: false,
      message: "Server error while fetching complaints",
    });
  }
};

exports.uploadDocuments = async (req, res) => {
  try {
    console.log("FILES:", req.files);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded"
      });
    }

    const complaint = await Complaint.findOne({
      complaintId: req.params.id
    });

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    const fileNames = req.files.map(file => file.filename);

    complaint.documents.push(...fileNames);
    await complaint.save();

    return res.status(200).json({
      success: true,
      message: "Documents uploaded successfully",
      documents: complaint.documents
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Error uploading documents"
    });
  }
};

exports.getComplaintById = async (req, res) => {
  try {
    const complaint = await Complaint.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ complaint });
  } catch (error) {
    console.error("GET COMPLAINT ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
};

