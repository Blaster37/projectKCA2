const AppDataSource  = require("../config/data-source");
const { v4: uuidv4 } = require("uuid");
const AttendanceSession = require("../entities/AttendanceSession");


const sessionRepository = () => AppDataSource.getRepository(AttendanceSession);

const AttendanceSessionService = {
  // Create a new session
  createSession: async (lecturerId, unit_name, start_time, end_time) => {
    const session = sessionRepository().create({
      unit_name,
      qr_token: uuidv4(), // unique token for QR
      qr_enabled: false,
      start_time,
      end_time,
      lecturer: { id: lecturerId }, // relation
    });
    return await sessionRepository().save(session);
  },

  // Enable / Disable QR code
  toggleQR: async (sessionId, enable) => {
    const session = await sessionRepository().findOne({ where: { id: sessionId } });
    if (!session) throw new Error("Session not found");
    session.qr_enabled = enable;
    return await sessionRepository().save(session);
  },

  // Get all sessions for a lecturer
  getLecturerSessions: async (lecturerId) => {
    return await sessionRepository().find({ where: { lecturer: { id: lecturerId } } });
  },

  // Get session by QR token
  getByToken: async (qr_token) => {
    return await sessionRepository().findOne({ where: { qr_token } });
  },

  getActiveSessions: async (currentTime) => {
  return await sessionRepository().find({
    where: {
      qr_enabled: true,
     
    },
    relations: ["lecturer"]
  });
}
};

module.exports = AttendanceSessionService;