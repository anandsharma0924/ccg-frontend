import React, { useState } from "react";
import { Button, TextField, Grid, Box, Typography, CircularProgress } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Popup from '../../Conponent/Popup';  // Update the path according to your project structure

const AnotherComponent = () => {
    const [data, setData] = useState([{ fieldName: "", fieldCode: "", fieldSession: "" }]);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const [loader, setLoader] = useState(false);
    
    const navigate = useNavigate();

    const handleFieldChange = (index, field) => (event) => {
        const newData = [...data];
        newData[index][field] = event.target.value;
        setData(newData);
    };

    const handleAddField = () => {
        setData([...data, { fieldName: "", fieldCode: "", fieldSession: "" }]);
    };

    const handleRemoveField = (index) => () => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoader(true);
        const fields = {
            data: data.map((item) => ({
                fieldName: item.fieldName,
                fieldCode: item.fieldCode,
                fieldSession: parseInt(item.fieldSession, 10) || 0,
            })),
        };

        try {
            const response = await axios.post('http://localhost:5000/api/data/', fields);  // Update API URL accordingly
            if (response.status === 201) {
                navigate("/somewhere");  // Update navigation path
            } else {
                setMessage(response.data.message || "Failed to add data");
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
                <Typography variant="h6">Add student</Typography>
            </Box>
            <Grid container spacing={2}>
                {data.map((item, index) => (
                    <React.Fragment key={index}>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Student Name"
                                variant="outlined"
                                value={item.fieldName}
                                onChange={handleFieldChange(index, "fieldName")}
                                sx={styles.inputField}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="Student Code"
                                variant="outlined"
                                type="number"
                                value={item.fieldCode}
                                onChange={handleFieldChange(index, "fieldCode")}
                                sx={styles.inputField}
                                required
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                fullWidth
                                label="student Session"
                                variant="outlined"
                                type="number"
                                inputProps={{ min: 0 }}
                                value={item.fieldSession}
                                onChange={handleFieldChange(index, "fieldSession")}
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
                                        onClick={handleAddField}
                                    >
                                        Add Student
                                    </Button>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleRemoveField(index)}
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

export default AnotherComponent;

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
