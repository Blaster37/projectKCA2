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
    <Box
  sx={{
    minHeight: "100vh",
    p: { xs: 2, md: 4 },
    background: "linear-gradient(135deg, #eef2ff, #e0f2fe, #ecfeff)",
  }}
>
      <Typography
  variant="h4"
  gutterBottom
  sx={{
    textAlign:"center",
    color: "#5d67b9",
    fontWeight: "bold",
    
    textShadow: "0 2px 10px rgba(0,0,0,0.3)",
    
  }}
>
  Admin Dashboard
</Typography>

      {/* ➕ Add Session Form */}
      <Paper
  elevation={6}
  sx={{
    p: { xs: 3, md: 5 },
    mb: 4,
    borderRadius: 4,
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  }}
>
  {/* 🔹 Header */}
  <Box mb={3}>
    <Typography variant="h5" fontWeight="bold" color="#4f46e5">
      Create Attendance Session
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Fill in the details below to create a new session
    </Typography>
  </Box>

  {/* 🔹 Form */}
  <Grid container spacing={3}>
    
    <Grid item xs={12} md={4}>
      <TextField
        label="Unit Name"
        fullWidth
        value={unitName}
        onChange={(e) => setUnitName(e.target.value)}
        sx={{
          background: "#fff",
          borderRadius: 2,
        }}
      />
    </Grid>

    <Grid item xs={12} md={4}>
      <TextField
        label="Start Time"
        type="datetime-local"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        sx={{
          background: "#fff",
          borderRadius: 2,
        }}
      />
    </Grid>

    <Grid item xs={12} md={4}>
      <TextField
        label="End Time"
        type="datetime-local"
        fullWidth
        InputLabelProps={{ shrink: true }}
        value={endTime}
        onChange={(e) => setEndTime(e.target.value)}
        sx={{
          background: "#fff",
          borderRadius: 2,
        }}
      />
    </Grid>

    {/* 🔹 Button */}
    <Grid item xs={12}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          onClick={handleCreateSession}
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: 2,
            fontWeight: "bold",
            background: "linear-gradient(135deg, #4f46e5, #6366f1)",
            boxShadow: "0 4px 12px rgba(79,70,229,0.3)",
            "&:hover": {
              background: "linear-gradient(135deg, #4338ca, #4f46e5)",
            },
          }}
        >
          Create Session
        </Button>
      </Box>
    </Grid>
  </Grid>
</Paper>

      {/* ➖ Sessions Cards */}
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3} >
          {sessions.map((session) => (
            <Grid item xs={12} sm={6} md={4} key={session.id}>
              <Paper elevation={4} sx={{ p: 3 }}>
                <Stack spacing={1}>
                  <Typography variant="h6">{session.unit_name}</Typography>
                  
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
      width: { xs: "95%", md: "80%" },
      maxHeight: "85vh",
      overflow: "hidden",
      borderRadius: 4,
      background: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* 🔹 Header */}
    <Box
      sx={{
        p: 3,
        background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
        color: "#fff",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight="bold">
          Attendance Records
        </Typography>
        <Typography variant="body2">
          {currentSession?.unit_name}
        </Typography>
      </Box>

      {/* ❌ Close Button */}
      <Typography
        sx={{ cursor: "pointer", fontWeight: "bold", fontSize: "20px" }}
        onClick={() => setOpenModal(false)}
      >
        ✕
      </Typography>
    </Box>

    {/* 🔹 Content */}
    <Box
      sx={{
        p: 3,
        overflowY: "auto",
        flex: 1,
      }}
    >
      {attendanceList.length === 0 ? (
        <Box textAlign="center" mt={5}>
          <Typography variant="h6" gutterBottom>
            No Attendance Yet
          </Typography>
          <Typography color="text.secondary">
            Students have not marked attendance for this session.
          </Typography>
        </Box>
      ) : (
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#f1f5f9",
              }}
            >
              <TableCell sx={{ fontWeight: "bold" }}>
                Admission No
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
              
            </TableRow>
          </TableHead>

          <TableBody>
            {attendanceList.map((att, index) => (
              <TableRow
                key={att.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc",
                  "&:hover": {
                    backgroundColor: "#e0f2fe",
                  },
                }}
              >
                <TableCell>{att.admission_no}</TableCell>
                <TableCell>
                  {new Date(att.date).toLocaleDateString()}
                </TableCell>
               
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  </Box>
</Modal>
    </Box>
  );
};

export default AdminDashboard;