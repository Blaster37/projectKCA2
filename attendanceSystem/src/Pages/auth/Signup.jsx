import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { Person, Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/auth/register", form);

      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Signup failed");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: 360,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Create Account 🚀
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Sign up to get started
        </Typography>

        <TextField
          label="Full Name"
          name="name"
          fullWidth
          margin="normal"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          onChange={handleChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            py: 1.2,
            borderRadius: 2,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #667eea, #764ba2)",
            "&:hover": {
              background: "linear-gradient(90deg, #5a6fd8, #6a4190)",
            },
          }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 2, cursor: "pointer", color: "#667eea" }}
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </Typography>
      </Paper>
    </Box>
  );
};

export default Signup;