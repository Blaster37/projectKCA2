const express = require("express");
const router = express.Router();
const AttendanceSessionService = require("../services/AttendanceSessionService");

// Create session
router.post("/", async (req, res) => {
  try {
    const { lecturerId, unit_name, start_time, end_time } = req.body;
    const session = await AttendanceSessionService.createSession(lecturerId, unit_name, start_time, end_time);
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Enable / Disable QR
router.patch("/:id/qr", async (req, res) => {
  try {
    const { id } = req.params;
    const { enable } = req.body; // boolean
    const session = await AttendanceSessionService.toggleQR(id, enable);
    res.json(session);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all sessions for a lecturer
router.get("/lecturer/:lecturerId", async (req, res) => {
  try {
    const { lecturerId } = req.params;
    const sessions = await AttendanceSessionService.getLecturerSessions(lecturerId);
    res.json(sessions);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;