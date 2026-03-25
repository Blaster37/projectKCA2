// attendanceRoutes.js
const express = require("express");
const router = express.Router();
const AttendanceService = require("../services/attendanceService");

// POST: mark attendance
router.post("/mark", async (req, res) => {
  try {
    const { qr_token, admission_no } = req.body;
    const attendance = await AttendanceService.markAttendance(qr_token, admission_no);
    res.json({ message: "Attendance marked successfully", attendance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
//✅ GET: Get all attendance for a session
router.get("/session/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const records = await AttendanceService.getSessionAttendance(sessionId);
    res.json(records);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router; // ✅ Must export router