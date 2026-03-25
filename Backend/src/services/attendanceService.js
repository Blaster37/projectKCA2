const  AppDataSource  = require("../config/data-source");
const Attendance = require("../entities/Attendance");
const AttendanceSessionService = require("./AttendanceSessionService");
const User = require("../entities/User");

const attendanceRepository = () => AppDataSource.getRepository("Attendance");

const AttendanceService = {
  markAttendance: async (qr_token, admission_no, userId) => {
  // 1. Find session by QR token
  const session = await AttendanceSessionService.getByToken(qr_token);
  if (!session) throw new Error("Invalid QR token");
  if (!session.qr_enabled) throw new Error("QR code is disabled");

  // 2. Find student by userId (logged-in user)
  const user = await AppDataSource.getRepository("User").findOne({ where: { id: userId } });
  if (!user) throw new Error("Student not found");

  // 3. Prevent double marking
  const existing = await attendanceRepository().findOne({
    where: { user: { id: user.id }, session: { id: session.id } }
  });
  if (existing) throw new Error("Attendance already marked");

  // 4. Create attendance record
  const attendance = attendanceRepository().create({
    date: new Date(),
    unit_name: session.unit_name,
    admission_no, // entered by student
    user: { id: user.id },
    session: { id: session.id }
  });

  return await attendanceRepository().save(attendance);
},

  getSessionAttendance: async (sessionId) => {
    return await attendanceRepository().find({ where: { session: { id: sessionId } } });
  }
};

module.exports = AttendanceService;