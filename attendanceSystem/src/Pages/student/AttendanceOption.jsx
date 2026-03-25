import { Box, Paper, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AttendanceOption = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Example QR link: on scan, it will redirect to AttendanceForm with params
  const qrLink = `https://yourdomain.com/attendance?unit=&date=`; // this could be dynamic later

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
          Attendance Options
        </Typography>

        <Typography variant="body1" mb={4}>
          Welcome, {user?.name}. Please choose how you want to mark your attendance.
        </Typography>

        <Stack spacing={2}>
          {/* Manual Form Button */}
          <Button
            variant="contained"
            sx={{
              py: 1.5,
              fontWeight: "bold",
              background: "linear-gradient(90deg, #6a11cb, #2575fc)",
              "&:hover": { background: "linear-gradient(90deg, #2575fc, #6a11cb)" },
            }}
            onClick={() => navigate("/attendance")}
          >
            Fill Attendance Form Here
          </Button>

          {/* QR Scan Button */}
          <Button
            variant="outlined"
            sx={{
              py: 1.5,
              fontWeight: "bold",
              borderColor: "#2575fc",
              color: "#2575fc",
              "&:hover": { backgroundColor: "#e6f0ff", borderColor: "#2575fc" },
            }}
            onClick={() => {
              // Open the QR page or scanner (simulate scan redirect)
              window.open(qrLink, "_blank");
            }}
          >
            Scan QR to Fill on Phone
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default AttendanceOption;