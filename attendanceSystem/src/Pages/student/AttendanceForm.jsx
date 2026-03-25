import { useState } from "react";
import { Box, Paper, TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const AttendanceForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    unit_name: "",
    date: "",
    admission_no: "",
  });

  const [status, setStatus] = useState({ success: "", error: "" });
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit attendance
  const handleSubmit = async () => {
    try {
      if (!form.unit_name || !form.date || !form.admission_no) {
        setStatus({ success: "", error: "All fields are required" });
        return;
      }

      await api.post("/attendance", {
        ...form,
        userId: user.id,
      });

      setStatus({ success: "Attendance submitted successfully!", error: "" });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setStatus({
        success: "",
        error: err.response?.data?.message || "Submission failed",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 5,
          width: 450,
          borderRadius: 4,
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Attendance Form
        </Typography>

        {status.success && <Alert severity="success" sx={{ mb: 2 }}>{status.success}</Alert>}
        {status.error && <Alert severity="error" sx={{ mb: 2 }}>{status.error}</Alert>}

        <TextField
          label="Unit Name"
          name="unit_name"
          fullWidth
          margin="normal"
          value={form.unit_name}
          onChange={handleChange}
          sx={{ borderRadius: 2 }}
        />

        <TextField
          label="Date"
          name="date"
          type="date"
          fullWidth
          margin="normal"
          value={form.date}
          onChange={handleChange}
          sx={{ borderRadius: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Admission Number"
          name="admission_no"
          fullWidth
          margin="normal"
          value={form.admission_no}
          onChange={handleChange}
          sx={{ borderRadius: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #6a11cb, #2575fc)",
            "&:hover": { background: "linear-gradient(90deg, #2575fc, #6a11cb)" },
          }}
          onClick={handleSubmit}
          disabled={submitted}
        >
          {submitted ? "Submitted" : "Submit Attendance"}
        </Button>

        <Button
          variant="outlined"
          fullWidth
          sx={{
            mt: 2,
            py: 1.5,
            color: "#ff4d4f",
            borderColor: "#ff4d4f",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#ffe6e6", borderColor: "#ff7875" },
          }}
          onClick={() => navigate("/student")}
        >
          Back to Dashboard
        </Button>
      </Paper>
    </Box>
  );
};

export default AttendanceForm;