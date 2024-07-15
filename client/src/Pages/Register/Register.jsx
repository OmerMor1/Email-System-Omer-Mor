import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.scss";

const Register = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [error, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isEmptyField = Object.values(inputs).some((value) => value === "");
      if (isEmptyField) {
        setErr("All fields are required");
      } else if (inputs.password !== inputs.repeatPassword) {
        setErr("Passwords do not match");
      } else {
        const { firstName, lastName, email, password } = inputs;
        const res = await axios.post("http://localhost:5000/auth/register", {
          firstName,
          lastName,
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        navigate("/login");
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

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <Container component="main" maxWidth="xs" className="container">
      <Paper className="paper">
        <IconButton className="back-to-login" onClick={handleBackToLogin}>
          <ArrowBackIcon />
        </IconButton>
        <Typography component="h1" variant="h5" className="title">
          SIGN-UP
        </Typography>
        <Box
          component="form"
          noValidate
          className="form"
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" className="field">
                First Name
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                name="firstName"
                autoComplete="given-name"
                autoFocus
                placeholder="Hello"
                className="textField"
                value={inputs.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" className="field">
                Last Name
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                name="lastName"
                autoComplete="family-name"
                placeholder="World"
                className="textField"
                value={inputs.lastName}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
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
            placeholder="me123@email.com"
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
            autoComplete="new-password"
            className="textField"
            value={inputs.password}
            onChange={handleChange}
          />
          <Typography variant="body1" className="field">
            Repeat Password
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="repeatPassword"
            type="password"
            id="repeatPassword"
            autoComplete="new-password"
            className="textField"
            value={inputs.repeatPassword}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            Sign-Up
          </Button>
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

export default Register;
