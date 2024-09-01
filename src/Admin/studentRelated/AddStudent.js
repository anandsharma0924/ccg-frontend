import React, { useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from '../../Conponent/Popup';  // Update the path according to your project structure

const AddStudent = () => {
    const [student, setStudent] = useState({
        StudentName: "",
        email: "",
        password: "",
        age: "",
        address: ""
    });
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    
    const navigate = useNavigate();

    // Handle input field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudent({ ...student, [name]: value });
    };

    // Form submission handler
    const submitHandler = async (event) => {
        event.preventDefault();
        setLoader(true);

        try {
            const response = await axios.post('http://localhost:5000/api/students', student);  // Update API URL accordingly
            if (response.status === 201) {
                navigate("/students");  // Update navigation path as needed
            } else {
                setMessage(response.data.message || "Failed to add student");
                setShowPopup(true);
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Network Error");
            setShowPopup(true);
        } finally {
            setLoader(false);
        }
    };

    return (
        <form onSubmit={submitHandler}>
            <Box mb={2}>
                <Typography variant="h6">Add Student</Typography>
            </Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Student Name"
                        variant="outlined"
                        name="StudentName"
                        value={student.StudentName}
                        onChange={handleChange}
                        sx={styles.inputField}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        variant="outlined"
                        name="email"
                        type="email"
                        value={student.email}
                        onChange={handleChange}
                        sx={styles.inputField}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Password"
                        variant="outlined"
                        name="password"
                        type="password"
                        value={student.password}
                        onChange={handleChange}
                        sx={styles.inputField}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Age"
                        variant="outlined"
                        name="age"
                        type="number"
                        inputProps={{ min: 0 }}
                        value={student.age}
                        onChange={handleChange}
                        sx={styles.inputField}
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Address"
                        variant="outlined"
                        name="address"
                        value={student.address}
                        onChange={handleChange}
                        sx={styles.inputField}
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" type="submit" disabled={loader}>
                            {loader ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                'Save'
                            )}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </form>
    );
}

export default AddStudent;

const styles = {
    inputField: {
        '& .MuiInputLabel-root': {
            color: '#838080',
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#838080',
        },
    },
};


