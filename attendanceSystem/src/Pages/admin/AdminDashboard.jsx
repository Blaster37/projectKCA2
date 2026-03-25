import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  Stack,
  Chip,
  CircularProgress,
  Modal,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { QrCode, Visibility } from "@mui/icons-material";
import api from "../../services/api";

const AdminDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [unitName, setUnitName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [lecturerId, setLecturerId] = useState(1); // Replace with actual ID

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);

  // Fetch sessions
  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/attendance-session/lecturer/${lecturerId}`);
      setSessions(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  // Toggle QR
  const toggleQR = async (sessionId, currentStatus) => {
    try {
      await api.patch(`/attendance-session/${sessionId}/qr`, { enable: !currentStatus });
      fetchSessions();
    } catch (err) {
      console.error(err);
    }
  };

  // Create session
  const handleCreateSession = async () => {
    if (!unitName || !startTime || !endTime) return alert("All fields are required");
    try {
      await api.post("/attendance-session", {
        lecturerId,
        unit_name: unitName,
        start_time: startTime,
        end_time: endTime,
      });
      setUnitName("");
      setStartTime("");
      setEndTime("");
      fetchSessions();
    } catch (err) {
      console.error(err);
    }
  };

  // Open attendance modal
  const viewAttendance = async (session) => {
    try {
      const res = await api.get(`/attendance/session/${session.id}`);
      setAttendanceList(res.data);
      setCurrentSession(session);
      setOpenModal(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* ➕ Add Session Form */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New Attendance Session
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Unit Name"
              fullWidth
              value={unitName}
              onChange={(e) => setUnitName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Start Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="End Time"
              type="datetime-local"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleCreateSession}>
              Create Session
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* ➖ Sessions Cards */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {sessions.map((session) => (
            <Grid item xs={12} sm={6} md={4} key={session.id}>
              <Paper elevation={4} sx={{ p: 3 }}>
                <Stack spacing={1}>
                  <Typography variant="h6">{session.unit_name}</Typography>
                  <Typography variant="body2">Lecturer: {session.lecturer.name}</Typography>
                  <Typography variant="body2">
                    Time: {new Date(session.start_time).toLocaleString()} -{" "}
                    {new Date(session.end_time).toLocaleString()}
                  </Typography>
                  <Chip
                    icon={<QrCode />}
                    label={session.qr_enabled ? "QR Enabled" : "QR Disabled"}
                    color={session.qr_enabled ? "success" : "default"}
                  />
                  <Stack direction="row" spacing={1} mt={1}>
                    <Button
                      variant="contained"
                      color={session.qr_enabled ? "error" : "primary"}
                      onClick={() => toggleQR(session.id, session.qr_enabled)}
                    >
                      {session.qr_enabled ? "Disable QR" : "Enable QR"}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Visibility />}
                      onClick={() => viewAttendance(session)}
                    >
                      View Attendance
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* ➖ Attendance Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Attendance for {currentSession?.unit_name}
          </Typography>
          {attendanceList.length === 0 ? (
            <Typography>No attendance marked yet.</Typography>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Admission No</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Student Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceList.map((att) => (
                  <TableRow key={att.id}>
                    <TableCell>{att.admission_no}</TableCell>
                    <TableCell>{new Date(att.date).toLocaleDateString()}</TableCell>
                    <TableCell>{att.user?.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;