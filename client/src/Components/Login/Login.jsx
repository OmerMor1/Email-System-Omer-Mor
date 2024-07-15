import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Link,
  Button,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [error, setErr] = useState(null);
  const navigate = useNavigate();

  function handleChange(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isEmptyField = Object.values(inputs).some((value) => value === "");
      if (isEmptyField) {
        setErr("All fields are required");
      } else {
        console.log("inputs", inputs);
        const { email, password } = inputs;
        const res = await axios.post("http://localhost:5000/auth/login", {
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/inbox");
      }
    } catch (err) {
      console.error("Error caught:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setErr(err.response.data.message);
      } else {
        setErr("An unexpected error occurred.");
      }
    }
  };

  const handleBackToRegister = () => {
    navigate("/register");
  };

  return (
    <Container component="main" maxWidth="xs" className="container">
      <Paper className="paper">
        <Typography component="h1" variant="h5" className="title">
          WELCOME
        </Typography>
        <Box
          component="form"
          noValidate
          className="form"
          onSubmit={handleSubmit}
        >
          <Typography variant="body1" className="field">
            Email
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            placeholder="some@email.com"
            className="textField"
            value={inputs.email}
            onChange={handleChange}
          />
          <Typography variant="body1" className="field">
            Password
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            type="password"
            id="password"
            autoComplete="current-password"
            className="textField"
            value={inputs.password}
            onChange={handleChange}
          />
          <Link href="#" variant="body2" className="link">
            Forgot your password?
          </Link>
          <Grid container spacing={2} className="buttonContainer">
            <Grid item xs={5}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="button"
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={2} className="divider">
              /
            </Grid>
            <Grid item xs={5}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                className="button"
                onClick={handleBackToRegister}
              >
                Sign-Up
              </Button>
            </Grid>
          </Grid>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;
