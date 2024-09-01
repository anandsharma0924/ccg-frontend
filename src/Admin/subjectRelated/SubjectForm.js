import React, { useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from '../../Conponent/Popup';

const SubjectForm = () => {
    const [subjects, setSubjects] = useState([{ subjectName: "", code: "", session: "" }]);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    
    const navigate = useNavigate();

    // Update subject fields based on input
    const handleSubjectChange = (index, field) => (event) => {
        const newSubjects = [...subjects];
        newSubjects[index][field] = event.target.value;
        setSubjects(newSubjects);
    };

    // Add a new subject input
    const handleAddSubject = () => {
        setSubjects([...subjects, { subjectName: "", code: "", session: "" }]);
    };

    // Remove a specific subject input
    const handleRemoveSubject = (index) => () => {
        const newSubjects = [...subjects];
        newSubjects.splice(index, 1);
        setSubjects(newSubjects);
    };

    // Form submission handler
    const submitHandler = async (event) => {
        event.preventDefault();
        setLoader(true);
        const fields = {
            subjects: subjects.map((subject) => ({
                subjectName: subject.subjectName,
                code: subject.code,
                session: parseInt(subject.session, 10) || 0,
            })),
        };

        try {
            const response = await axios.post('http://localhost:5000/api/subjects/', fields);
            console.log(response , "u")
            if (response.status === 201) {
                navigate("/Admin/dashboard/Admin/subjects");
            } else {
                setMessage(response.data.message || "Failed to add subjects");
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
                <Typography variant="h6">Add Subjects</Typography>
            </Box>
            <Grid container spacing={2}>
                {subjects.map((subject, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Subject Name"
                                variant="outlined"
                                value={subject.subjectName}
                                onChange={handleSubjectChange(index, "subjectName")}
                                sx={styles.inputField}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Subject Code"
                                variant="outlined"
                                type="number"
                                value={subject.code}
                                onChange={handleSubjectChange(index, "code")}
                                sx={styles.inputField}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Sessions"
                                variant="outlined"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={subject.session}
                                onChange={handleSubjectChange(index, "session")}
                                sx={styles.inputField}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Box display="flex" alignItems="flex-end">
                                {index === 0 ? (
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleAddSubject}
                                    >
                                        Add Subject
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleRemoveSubject(index)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </Box>
                        </Grid>
                    </React.Fragment>
                ))}
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
                <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
            </Grid>
        </form>
    );
}

export default SubjectForm;

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
