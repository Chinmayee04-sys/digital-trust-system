const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const {
  assignAuthority,
  getDashboardStats
} = require("../controllers/adminController");

/* ======================================================
   ADMIN ROUTES
   Role: ADMIN only
====================================================== */

/**
 * Assign / Reassign complaint to authority
 * PATCH /api/admin/complaints/:id/assign
 */
router.patch(
  "/complaints/:id/assign",
  auth,
  role("admin"),
  assignAuthority
);

/**
 * Admin dashboard statistics
 * GET /api/admin/dashboard
 */
router.get(
  "/dashboard",
  auth,
  role("admin"),
  getDashboardStats
);

module.exports = router;
