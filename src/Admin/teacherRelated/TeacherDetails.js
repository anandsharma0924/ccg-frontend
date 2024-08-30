import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const TeacherDetails = () => {
    const navigate = useNavigate();
    const { id: teacherID } = useParams(); // Destructuring params directly
    const [loading, setLoading] = useState(true);
    const [teacherDetails, setTeacherDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTeacherDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/teachers/1`);
                setTeacherDetails(response.data);
                console.log(response.data , "teacher details")
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTeacherDetails();
    }, [teacherID]);

    const handleAddSubject = () => {
        navigate(`Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    return (
        <Container>
            <Typography variant="h4" align="center" gutterBottom>
                Teacher Details
            </Typography>
            <Typography variant="h6" gutterBottom>
                Teacher Name: {teacherDetails?.name}
            </Typography>
            <Typography variant="h6" gutterBottom>
                Class Name: {teacherDetails?.teachSclass?.sclassName}
            </Typography>
            {isSubjectNamePresent ? (
                <>
                    <Typography variant="h6" gutterBottom>
                        Subject Name: {teacherDetails?.teachSubject?.subName}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Subject Sessions: {teacherDetails?.teachSubject?.sessions}
                    </Typography>
                </>
            ) : (
                <Button variant="contained" onClick={handleAddSubject}>
                    Add Subject
                </Button>
            )}
        </Container>
    );
};

export default TeacherDetails;
