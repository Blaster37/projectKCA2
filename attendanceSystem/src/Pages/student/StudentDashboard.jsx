import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import { QrCode } from "@mui/icons-material";
import { QRCodeCanvas } from "qrcode.react";
import api from "../../services/api";

const StudentDashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const res = await api.get("/attendance-session/active");
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

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Student Dashboard
      </Typography>

      <Typography variant="body1" color="text.secondary" mb={3}>
        Scan the QR code below using your phone to mark attendance.
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : sessions.length === 0 ? (
        <Typography>No active sessions available</Typography>
      ) : (
        <Grid container spacing={3}>
          {sessions.map((session) => (
            <Grid item xs={12} sm={6} md={4} key={session.id}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  textAlign: "center",
                  transition: "0.3s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <Stack spacing={2} alignItems="center">
                  <Typography variant="h6">
                    {session.unit_name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {session.lecturer.name}
                  </Typography>

                  <Chip
                    icon={<QrCode />}
                    label={
                      session.qr_enabled
                        ? "QR Active"
                        : "QR Not Active"
                    }
                    color={session.qr_enabled ? "success" : "default"}
                  />

                  {/* ✅ SHOW QR ONLY IF ENABLED */}
                  {session.qr_enabled && (
                    <QRCodeCanvas
                      value={`http://localhost:5173/mark-attendance?token=${session.qr_token}`}
                      size={160}
                    />
                  )}

                  {!session.qr_enabled && (
                    <Typography variant="body2" color="text.secondary">
                      QR will appear when lecturer enables it
                    </Typography>
                  )}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default StudentDashboard;