import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  InputAdornment,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async () => {
  try {
    const res = await api.post("/auth/login", form);

    console.log(res.data); // debug

    const { user, token } = res.data;

    // save token (important for future requests)
    localStorage.setItem("token", token);

    // save user in context
    login(user);

    const role = user.role.role_name;

    if (role === "Lecturer") {
      navigate("/admin");
    } else if (role === "Student") {
      navigate("/student");
    } else {
      alert("Unknown role");
    }
  } catch (err) {
    console.error(err);
    alert("Login failed");
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
          width: 350,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Welcome Back 👋
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Login to your account
        </Typography>

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
          Login
        </Button>

        <Typography
          variant="body2"
          sx={{ mt: 2, cursor: "pointer", color: "#667eea" }}
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Sign up
        </Typography>
      </Paper>
    </Box>
  );
};

export default Login;