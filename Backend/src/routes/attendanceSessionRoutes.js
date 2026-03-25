const express = require("express");
const router = express.Router();
const AttendanceSessionService = require("../services/AttendanceSessionService");

// Create a new attendance session
router.post("/", async (req, res) => {
  try {
    const { lecturerId, unit_name, start_time, end_time } = req.body;
    const session = await AttendanceSessionService.createSession(
      lecturerId,
      unit_name,
      start_time,
      end_time
    );
    res.status(201).json(session);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Enable or disable QR code for a session
router.patch("/:sessionId/qr", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { enable } = req.body;
    const updatedSession = await AttendanceSessionService.toggleQR(sessionId, enable);
    res.json(updatedSession);
  } catch (err) {
    console.error(err);
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
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});
// GET /attendance-session/active
router.get("/active", async (req, res) => {
  try {
    const now = new Date();
    const sessions = await AttendanceSessionService.getActiveSessions(now);
    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;