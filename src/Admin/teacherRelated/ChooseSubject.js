import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableContainer, TableHead, Typography, Paper } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { GreenButton, PurpleButton } from '../../Conponent/buttonStyles';
import { StyledTableCell, StyledTableRow } from '../../Conponent/styles';

const ChooseSubject = ({ situation }) => {
    const params = useParams();
    const navigate = useNavigate();

    const [classID, setClassID] = useState("");
    const [teacherID, setTeacherID] = useState("");
    const [subjectsList, setSubjectsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [response, setResponse] = useState(null);
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                setLoading(true);
                const classID = params.id || params.classID;
                setClassID(classID);
console.log(classID , "classIDclassID")
                const response = await axios.get(`http://localhost:5000/api/subjects/`);
                console.log(response.data, "responsee")
                setSubjectsList(response.data);
                
                if (situation === "Teacher") {
                    setTeacherID(params.teacherID);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, [situation, params.id, params.teacherID]);

    const updateSubjectHandler = async (teacherId, teachSubject) => {
        setLoader(true);
        try {
            await axios.post('http://localhost:5000/api/teachers/updateSubject', {
                teacherId,
                teachSubject
            });
            navigate("/Admin/teachers");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoader(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (response) {
        return (
            <div>
                <h1>Sorry all subjects have teachers assigned already</h1>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                    <PurpleButton variant="contained" onClick={() => navigate("/Admin/addsubject/" + classID)}>
                        Add Subjects
                    </PurpleButton>
                </Box>
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Typography variant="h6" gutterBottom component="div">
                Choose a subject
            </Typography>
            <TableContainer>
                <Table aria-label="subjects table">
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="center">Subject Name</StyledTableCell>
                            <StyledTableCell align="center">Subject Code</StyledTableCell>
                            <StyledTableCell align="center">Actions</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(subjectsList) && subjectsList.length > 0 && subjectsList.map((subject, index) => (
                            <StyledTableRow key={subject.id}>
                                <StyledTableCell component="th" scope="row" style={{ color: "white" }}>
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="center">{subject.subjectName}</StyledTableCell>
                                <StyledTableCell align="center">{subject.code}</StyledTableCell>
                                <StyledTableCell align="center">
                                    {situation === "Norm" ? (
                                        <GreenButton
                                            variant="contained"
                                            onClick={() => navigate(`/Admin/dashboard/teachers/addteacher/${subject.id}` )}
                                        >
                                            Choose
                                        </GreenButton>
                                    ) : (
                                        <GreenButton
                                            variant="contained"
                                            disabled={loader}
                                            onClick={() => updateSubjectHandler(teacherID, subject._id)}
                                        >
                                            {loader ? <div className="load"></div> : 'Choose Sub'}
                                        </GreenButton>
                                    )}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default ChooseSubject;
