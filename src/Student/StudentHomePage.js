import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import styled from "styled-components";
import CountUp from "react-countup";
import Subject from "../assets/subjects.svg";
import Assignment from "../assets/assignment.svg";
// import CustomPieChart from '../components/CustomPieChart';
import SeeNotice from "../Conponent/SeeNotice";
// import { calculateOverallAttendancePercentage } from '../../components/attendanceCalculator';
import axios from "axios";

const StudentHomePage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [subjectsList, setSubjectsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [subjectAttendance, setSubjectAttendance] = useState([]);

  // Mock currentUser data; replace with actual data source
  const currentUser = {
    _id: "user-id", // Replace with actual user ID
    sclassName: { _id: "class-id" }, // Replace with actual class ID
  };

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const result = await axios.get(`/api/users/${currentUser._id}`);
        setUserDetails(result.data);
        setLoading(false);
      } catch (error) {
        setResponse(error.message);
        setLoading(false);
      }
    };

    // Fetch subjects list
    const fetchSubjectsList = async () => {
      try {
        const result = await axios.get(
          `/api/classes/${currentUser.sclassName._id}/subjects`
        );
        setSubjectsList(result.data);
      } catch (error) {
        setResponse(error.message);
      }
    };

    fetchUserDetails();
    fetchSubjectsList();
  }, [currentUser._id, currentUser.sclassName._id]);

  useEffect(() => {
    if (userDetails) {
      setSubjectAttendance(userDetails.attendance || []);
    }
  }, [userDetails]);

  const numberOfSubjects = subjectsList.length;
  {
    /*
    const overallAttendancePercentage = calculateOverallAttendancePercentage(subjectAttendance);
    const overallAbsentPercentage = 100 - overallAttendancePercentage;

    const chartData = [
        { name: 'Present', value: overallAttendancePercentage },
        { name: 'Absent', value: overallAbsentPercentage }
    ]; */
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Subject} alt="Subjects" />
              <Title>Total Subjects</Title>
              <Data start={0} end={numberOfSubjects} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Assignment} alt="Assignments" />
              <Title>Total Assignments</Title>
              <Data start={0} end={15} duration={4} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <ChartContainer>
              {response ? (
                <Typography variant="h6">No Attendance Found</Typography>
              ) : (
                <>
                  {loading ? (
                    <Typography variant="h6">Loading...</Typography>
                  ) : (
                    <>
                      {subjectAttendance &&
                      Array.isArray(subjectAttendance) &&
                      subjectAttendance.length > 0 ? (
                        {
                          /*    <CustomPieChart data={chartData} />*/
                        }
                      ) : (
                        <Typography variant="h6">
                          No Attendance Found
                        </Typography>
                      )}
                    </>
                  )}
                </>
              )}
            </ChartContainer>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <SeeNotice />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

const ChartContainer = styled.div`
  padding: 2px;
  display: flex;
  flex-direction: column;
  height: 240px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

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
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default StudentHomePage;
