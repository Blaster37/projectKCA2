const AppDataSource = require("../config/data-source");

const attendanceRepo = AppDataSource.getRepository("Attendance");
const userRepo = AppDataSource.getRepository("User");

class AttendanceService {
  // 1️⃣ Add attendance for a student
  static async createAttendance({ studentId, date, unit_name, admission_no }) {
    // Find the student
    const student = await userRepo.findOneBy({ id: studentId });
    if (!student) {
      throw new Error("Student not found");
    }

    // Create attendance record
    const attendance = attendanceRepo.create({
      date,
      unit_name,
      admission_no,
      user: student,
    });

    // Save to database
    const savedAttendance = await attendanceRepo.save(attendance);
    return savedAttendance;
  }

  // 2️⃣ Get all attendance for a student
  static async getAttendanceByStudent(studentId) {
    const attendances = await attendanceRepo.find({
      where: { user: { id: studentId } },
      order: { date: "DESC" },
      relations: ["user"], // eager: true also works, but this is explicit
    });

    return attendances;
  }

  // 3️⃣ Get all attendance (optional, for admin)
  static async getAllAttendance() {
    const attendances = await attendanceRepo.find({
      order: { date: "DESC" },
      relations: ["user"],
    });
    return attendances;
  }
}

module.exports = AttendanceService;