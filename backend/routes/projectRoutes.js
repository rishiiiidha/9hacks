const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/", authenticateToken, projectController.submitProject);

// Additional routes for dashboards, comments, and status updates can go here.

module.exports = router;
