const express = require("express");
const AttendanceService = require("../services/attendanceService");
const router = express.Router();

// Create attendance
exports.postAttendance= async (req, res) => {
  try {
    const { studentId, date, unit_name, admission_no } = req.body;
    const attendance = await AttendanceService.createAttendance({
      studentId,
      date,
      unit_name,
      admission_no,
    });
    res.json(attendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get attendance for a student
exports.getStudentAttendance= async (req, res) => {
  try {
    const studentId = parseInt(req.params.id);
    const attendances = await AttendanceService.getAttendanceByStudent(studentId);
    res.json(attendances);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all attendance (admin)
exports.getAllAttendance= async (req, res) => {
  try {
    const attendances = await AttendanceService.getAllAttendance();
    res.json(attendances);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

