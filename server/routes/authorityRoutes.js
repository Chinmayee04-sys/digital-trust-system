const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  getAssignedComplaints,
  getComplaintDetails,
  updateComplaintStatus,
  addRemark,
  authoritySummary
} = require("../controllers/authorityController");

// GET assigned complaints (pagination + filters)
router.get(
  "/complaints",
  auth,
  role("authority"),
  getAssignedComplaints
);

// GET single complaint
router.get(
  "/complaints/:id",
  auth,
  role("authority"),
  getComplaintDetails
);

// UPDATE complaint status
router.patch(
  "/complaints/:id/status",
  auth,
  role("authority"),
  updateComplaintStatus
);

// ADD remark
router.post(
  "/remarks/:id",
  auth,
  role("authority"),
  addRemark
);

// DASHBOARD SUMMARY
router.get(
  "/summary",
  auth,
  role("authority"),
  authoritySummary
);

module.exports = router;
