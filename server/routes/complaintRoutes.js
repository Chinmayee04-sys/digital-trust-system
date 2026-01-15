const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  createComplaint,
  myComplaints,
  uploadDocuments,
  getComplaintById
} = require("../controllers/complaintController");

// Create complaint
router.post("/", auth, role("citizen"), createComplaint);

// ✅ STATIC route first
router.get("/my", auth, role("citizen"), myComplaints);

// ✅ DYNAMIC route last
router.get("/:id", auth, role("citizen"), getComplaintById);

// Upload documents
router.post(
  "/:id/upload",
  auth,
  role("citizen"),
  upload.array("documents", 5),
  uploadDocuments
);

module.exports = router;
