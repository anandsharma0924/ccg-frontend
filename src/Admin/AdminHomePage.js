import { Container, Grid, Paper } from "@mui/material";

import Students from "../assets/img1.png";
import Classes from "../assets/img2.png";
import Teachers from "../assets/img3.png";
import Fees from "../assets/img4.png";
import styled from "styled-components";

import CountUp from "react-countup";
import React, { useState, useEffect } from "react";
import axios from "axios";
const AdminHomePage = () => {
  const [studentsList, setStudentsList] = useState([]);
  const [sclassesList, setSclassesList] = useState([]);
  const [teachersList, setTeachersList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await axios.get(
          `http://localhost:5000/api/teachers/`
        );
        const classesRes = await axios.get(
          `http://localhost:5000/api/teachers/`
        );

        const teachersRes = await axios.get(
          `http://localhost:5000/api/teachers/`
        );

        // console.log(teachersRes , "teachersRes")
        setStudentsList(studentsRes.data);
        setSclassesList(classesRes.data);
        setTeachersList(teachersRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  });

  const numberOfStudents = studentsList.length;
  const numberOfClasses = sclassesList.length;
  const numberOfTeachers = teachersList.length;

  return (
    <React.Fragment>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Students} alt="Students" />
              <Title>Total Students</Title>
              <Data start={0} end={numberOfStudents} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Classes} alt="Classes" />
              <Title>Total Classes</Title>
              <Data start={0} end={numberOfClasses} duration={5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Teachers} alt="Teachers" />
              <Title>Total Teachers</Title>
              <Data start={0} end={numberOfTeachers} duration={2.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <img src={Fees} alt="Fees" />
              <Title>Fees Collection</Title>
              <Data start={0} end={23000} duration={2.5} prefix="$" />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              {/* <SeeNotice />*/}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
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
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default AdminHomePage;
