import React, { useState, useEffect } from "react";
import { Button, Collapse, TextField, Typography } from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const [showTab, setShowTab] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const buttonText = showTab ? "Cancel" : "Edit profile";

  useEffect(() => {
    // Fetch user data from an API
    axios
      .get("http://localhost:5000/api/admin/profile/1")
      .then((response) => {
        setCurrentUser(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
      })
      .catch((error) => console.error(error));
  }, []);

  const fields = password === "" ? { name, email } : { name, email, password };

  const submitHandler = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/admin/profile/${currentUser._id}`, fields)
      .then((response) => {
        setCurrentUser(response.data);
        setShowTab(false);
      })
      .catch((error) => console.error(error));
  };

  const deleteHandler = () => {
    axios
      .delete(`http://localhost:5000/api/admin/profile/${currentUser._id}`)
      .then(() => {
        navigate("/admin/login");
      })
      .catch((error) => console.error(error));
  };

  return (
    <div style={styles.container}>
      <Typography variant="h4" style={styles.title}>
        Admin Profile
      </Typography>
      <div style={styles.info}>
        <Typography variant="body1">
          <strong>Name:</strong> {currentUser.name}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {currentUser.email}
        </Typography>
      </div>
      <Button
        variant="contained"
        color="error"
        onClick={deleteHandler}
        style={styles.deleteButton}
      >
        Delete
      </Button>
      <Button
        variant="contained"
        sx={styles.showButton}
        onClick={() => setShowTab(!showTab)}
        startIcon={showTab ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
      >
        {buttonText}
      </Button>
      <Collapse in={showTab} timeout="auto" unmountOnExit>
        <form style={styles.form} onSubmit={submitHandler}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            sx={styles.submitButton}
          >
            Update
          </Button>
        </form>
      </Collapse>
    </div>
  );
};

export default AdminProfile;

const styles = {
  container: {
    padding: "20px",
    maxWidth: "600px",
    margin: "auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#270843",
  },
  info: {
    marginBottom: "20px",
  },
  showButton: {
    backgroundColor: "#270843",
    "&:hover": {
      backgroundColor: "#3f1068",
    },
    marginBottom: "10px",
    display: "block",
    margin: "auto",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  submitButton: {
    backgroundColor: "#270843",
    "&:hover": {
      backgroundColor: "#3f1068",
    },
  },
  deleteButton: {
    marginBottom: "10px",
  },
};
