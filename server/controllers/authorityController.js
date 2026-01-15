const Complaint = require("../models/Complaint");

/**
 * GET assigned complaints (pagination + filters)
 */
exports.getAssignedComplaints = async (req, res) => {
  try {
    const authorityId = req.user.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const { status, category, search } = req.query;

    const filter = { assignedAuthority: authorityId };

    if (status) filter.status = status;
    if (category) filter.category = category;

    if (search) {
      filter.$or = [
        { description: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } }
      ];
    }

    const total = await Complaint.countDocuments(filter);

    const complaints = await Complaint.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name email");

    res.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      total,
      complaints
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * GET single complaint
 */
exports.getComplaintDetails = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)
      .populate("user", "name email");

    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.json({ success: true, complaint });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * UPDATE complaint status
 */
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      status: complaint.status
    });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * ADD authority remark
 */
exports.addRemark = async (req, res) => {
  try {
    const { remark } = req.body;

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { authorityRemarks: remark },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.json({ success: true, message: "Remark added successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/**
 * AUTHORITY SUMMARY
 */
exports.authoritySummary = async (req, res) => {
  try {
    const authorityId = req.user.id;

    const summary = await Complaint.aggregate([
      { $match: { assignedAuthority: authorityId } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    res.json({ success: true, summary });

  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
