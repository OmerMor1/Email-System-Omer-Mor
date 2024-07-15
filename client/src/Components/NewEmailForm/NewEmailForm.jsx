import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  IconButton,
  Box,
  Grid,
  Chip,
  Dialog,
  DialogContent,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import "./NewEmailForm.scss";

const NewEmailForm = ({ open, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    to: "",
    cc: "",
    subject: "",
    body: "",
  });

  useEffect(() => {
    if (open) {
      setFormData({
        to: "",
        cc: "",
        subject: "",
        body: "",
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.to) {
      alert("Please enter a recipient email.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/email",
        {
          recipientEmail: formData.to,
          subject: formData.subject,
          body: formData.body,
          isDraft: false,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Email sent:", response.data);
      onSubmit();
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  const handleSaveDraft = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/email",
        {
          recipientEmail: formData.to || "",
          subject: formData.subject,
          body: formData.body,
          isDraft: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("Draft saved:", response.data);
      onClose();
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Box className="email-box">
          <Grid container justifyContent="space-between" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<SendIcon />}
              className="send-button"
              onClick={handleSubmit}
            >
              Send
            </Button>
            <Box className="right-buttons">
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                className="cancel-button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <IconButton className="close-button" onClick={handleSaveDraft}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Grid>
          <Box component="form" noValidate className="form">
            <Box className="input-row">
              <Chip label="To" className="chip-label" />
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder=""
                className="textField"
                name="to"
                value={formData.to}
                onChange={handleChange}
              />
            </Box>
            <Box className="input-row">
              <Chip label="Cc" className="chip-label" />
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                placeholder=""
                className="textField"
                name="cc"
                value={formData.cc}
                onChange={handleChange}
              />
            </Box>
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              placeholder="Enter Subject"
              className="textField subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              multiline
              rows={4}
              placeholder=""
              className="textField body"
              name="body"
              value={formData.body}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewEmailForm;
