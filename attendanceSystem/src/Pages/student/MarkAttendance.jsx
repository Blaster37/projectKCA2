import React, { useState } from "react";

import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import api from "../../services/api";

const MarkAttendance = () => {
  const [admissionNo, setAdmissionNo] = useState("");
  const [message, setMessage] = useState({ open: false, text: "", severity: "success" });

  // Get token from URL
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");

  const handleSubmit = async () => {
    if (!admissionNo) return alert("Enter admission number");

    try {
      const res = await api.post("/attendance/mark", {
        qr_token: token,
        admission_no: admissionNo,
      });

      setMessage({ open: true, text: res.data.message, severity: "success" });
      setAdmissionNo("");
    } catch (err) {
      setMessage({
        open: true,
        text: err.response?.data?.error || err.message,
        severity: "error",
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper elevation={4} sx={{ p: 4, width: 350 }}>
        <Stack spacing={2}>
          <Typography variant="h5">Mark Attendance</Typography>

          <TextField
            label="Admission Number"
            value={admissionNo}
            onChange={(e) => setAdmissionNo(e.target.value)}
            fullWidth
          />

          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Paper>

      <Snackbar
        open={message.open}
        autoHideDuration={4000}
        onClose={() => setMessage({ ...message, open: false })}
      >
        <Alert severity={message.severity}>{message.text}</Alert>
      </Snackbar>
    </Box>
  );
};

export default MarkAttendance;