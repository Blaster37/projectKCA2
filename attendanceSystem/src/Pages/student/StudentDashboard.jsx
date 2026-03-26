import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Stack,
  Chip,
  CircularProgress,
  Divider,
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
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
   <Box
  sx={{
    minHeight: "100vh",
    p: { xs: 2, md: 4 },
    background: "linear-gradient(135deg, #eef2ff, #e0f2fe, #f0fdf4)",
  }}
>

      {/* 🔥 Gradient Header */}
      <Box
        sx={{
          mb: 4,
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
          color: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Student Dashboard
        </Typography>
        <Typography variant="body1">
          Scan the QR code using your phone to mark attendance
        </Typography>
      </Box>

      {/* 🔄 Loading */}
      {loading ? (
        <Box display="flex" justifyContent="center" mt={10}>
          <CircularProgress />
        </Box>
      ) : sessions.length === 0 ? (

        /* 📭 Empty State */
        <Paper
          sx={{
            p: 10,
            textAlign: "center",
            borderRadius: 3,
            background: "#ffffff",
          }}
        >
          <Typography variant="h6" gutterBottom>
            No Active Sessions
          </Typography>
          <Typography color="text.secondary">
            Your lecturer hasn’t started any session yet.
          </Typography>
        </Paper>
      ) : (
        <Grid
          container
          spacing={3}
          justifyContent="center"   // ✅ centers cards horizontally
        >
          {sessions.map((session) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={session.id}
              display="flex"            // ✅ enables centering inside
              justifyContent="center"
            >

              {/* 🎨 Card */}
              <Paper
                elevation={4}
                sx={{
                  p: 6,
                  width: "100%",
                  maxWidth: 320,
                  borderRadius: 4,
                  background: "#ffffff",
                  borderTop: "5px solid #4f46e5",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: 8,
                  },
                }}
              >
                <Stack spacing={2} alignItems="center">

                  {/* 📚 Unit */}
                  <Typography
                    variant="h6"
                    fontWeight="700"
                    textAlign="center"
                    color="#4f46e5"
                  >
                    {session.unit_name}
                  </Typography>

                  {/* 👨‍🏫 Lecturer */}
                  <Typography variant="body2" color="text.secondary">
                    {session.lecturer.name}
                  </Typography>

                  <Divider sx={{ width: "100%" }} />

                  {/* 🟢 QR Status */}
                  <Chip
                    icon={<QrCode />}
                    label={session.qr_enabled ? "QR Active" : "QR Not Active"}
                    sx={{
                      backgroundColor: session.qr_enabled ? "#dcfce7" : "#f1f5f9",
                      color: session.qr_enabled ? "#166534" : "#475569",
                      fontWeight: 600,
                    }}
                  />

                  {/* 🔳 QR Section */}
                  {session.qr_enabled ? (
                    <Box
                      sx={{
                        mt: 2,
                        p: 4,
                        borderRadius: 3,
                        background: "linear-gradient(135deg, #eef2ff, #ecfeff)",
                        border: "2px dashed #4f46e5",
                      }}
                    >
                      <QRCodeCanvas
                        value={`http://localhost:5173/mark-attendance?token=${session.qr_token}`}
                        size={200}
                      />
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Waiting for lecturer to enable QR
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