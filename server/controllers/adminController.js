const Complaint = require("../models/Complaint");
const User = require("../models/User");

/* ======================================================
   ASSIGN / REASSIGN AUTHORITY TO A COMPLAINT
   PATCH /api/admin/complaints/:id/assign
====================================================== */
exports.assignAuthority = async (req, res) => {
  try {
    const complaintId = req.params.id;
    const { authorityId } = req.body;

    // 1️⃣ Validation
    if (!authorityId) {
      return res.status(400).json({
        success: false,
        message: "authorityId is required"
      });
    }

    // 2️⃣ Check authority user
    const authority = await User.findById(authorityId);
    if (!authority || authority.role !== "authority") {
      return res.status(400).json({
        success: false,
        message: "Invalid authority user"
      });
    }

    // 3️⃣ Assign authority
    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      {
        assignedAuthority: authorityId,
        status: "Under Review"
      },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: "Complaint not found"
      });
    }

    // 4️⃣ Success response
    res.status(200).json({
      success: true,
      message: "Authority assigned successfully",
      complaint
    });

  } catch (error) {
    console.error("ASSIGN AUTHORITY ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while assigning authority"
    });
  }
};


/* ======================================================
   ADMIN DASHBOARD (GLOBAL STATS)
   GET /api/admin/dashboard
====================================================== */
exports.getDashboardStats = async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const open = await Complaint.countDocuments({ status: "Open" });
    const inProgress = await Complaint.countDocuments({ status: "In Progress" });
    const resolved = await Complaint.countDocuments({ status: "Resolved" });

    const authorities = await User.countDocuments({ role: "authority" });
    const citizens = await User.countDocuments({ role: "citizen" });

    res.status(200).json({
      success: true,
      stats: {
        totalComplaints,
        open,
        inProgress,
        resolved,
        authorities,
        citizens
      }
    });

  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Server error while loading dashboard"
    });
  }
};
