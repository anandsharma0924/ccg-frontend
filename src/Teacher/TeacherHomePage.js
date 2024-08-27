import { Container, Grid, Paper } from '@mui/material';
import SeeNotice from '../Conponent/SeeNotice';
import CountUp from 'react-countup';
import styled from 'styled-components';
import Students from "../assets/img1.png";
import Lessons from "../assets/subjects.svg";
import Tests from "../assets/assignment.svg";
import Time from "../assets/time.svg";
import axios from 'axios';
import { useEffect, useState } from 'react';

const TeacherHomePage = () => {
    const [subjectDetails, setSubjectDetails] = useState({});
    const [sclassStudents, setSclassStudents] = useState([]);
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Assuming user data is stored in localStorage

    const classID = currentUser?.teachSclass?._id;
    const subjectID = currentUser?.teachSubject?._id;

    useEffect(() => {
        const fetchSubjectDetails = async () => {
            try {
                const response = await axios.get(`/api/subjectDetails/${subjectID}`);
                setSubjectDetails(response.data);
            } catch (error) {
                console.error('Error fetching subject details:', error);
            }
        };

        const fetchClassStudents = async () => {
            try {
                const response = await axios.get(`/api/classStudents/${classID}`);
                setSclassStudents(response.data);
            } catch (error) {
                console.error('Error fetching class students:', error);
            }
        };

        if (subjectID) fetchSubjectDetails();
        if (classID) fetchClassStudents();
    }, [subjectID, classID]);

    const numberOfStudents = sclassStudents.length;
    const numberOfSessions = subjectDetails.sessions || 0;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      
            <Grid container spacing={3}>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Students} alt="Students" />
                        <Title>Class Students</Title>
                        <Data start={0} end={numberOfStudents} duration={2.5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Lessons} alt="Lessons" />
                        <Title>Total Lessons</Title>
                        <Data start={0} end={numberOfSessions} duration={5} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Tests} alt="Tests" />
                        <Title>Tests Taken</Title>
                        <Data start={0} end={24} duration={4} />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                    <StyledPaper>
                        <img src={Time} alt="Time" />
                        <Title>Total Hours</Title>
                        <Data start={0} end={30} duration={4} suffix="hrs" />
                    </StyledPaper>
                </Grid>
                <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                        <SeeNotice />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + .6vw);
  color: green;
`;

export default TeacherHomePage;
