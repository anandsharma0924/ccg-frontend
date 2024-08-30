import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
  Table,
  TableBody,
  TableHead,
  Typography,
} from "@mui/material";
import CustomBarChart from "../Conponent/CustomBarChart";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { StyledTableCell, StyledTableRow } from "../Conponent/styles";

const StudentSubjects = () => {
  const [subjectMarks, setSubjectMarks] = useState([]);
  const [selectedSection, setSelectedSection] = useState("table");
  const [subjectsList, setSubjectsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const currentUser = {
    _id: "current_user_id", // Replace with actual user ID
    sclassName: { _id: "sclass_id" }, // Replace with actual class ID
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      const storedUserDetails = sessionStorage.getItem("userDetails");
      if (storedUserDetails) {
        setSubjectMarks(JSON.parse(storedUserDetails).examResult || []);
        setLoading(false);
      } else {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/user/${currentUser._id}/Student`
          );
          const userDetails = response.data;
          sessionStorage.setItem("userDetails", JSON.stringify(userDetails));
          setSubjectMarks(userDetails.examResult || []);
        } catch (err) {
          setError("Error fetching user details");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [currentUser._id]);

  useEffect(() => {
    const fetchSubjectList = async () => {
      const storedSubjectsList = sessionStorage.getItem("subjectsList");
      if (storedSubjectsList) {
        setSubjectsList(JSON.parse(storedSubjectsList));
      } else if (subjectMarks.length === 0) {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/class/${currentUser.sclassName._id}/subjects`
          );
          sessionStorage.setItem("subjectsList", JSON.stringify(response.data));
          setSubjectsList(response.data);
        } catch (err) {
          setError("Error fetching subjects list");
        }
      }
    };

    fetchSubjectList();
  }, [subjectMarks, currentUser.sclassName._id]);

  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const renderTableSection = () => (
    <React.Fragment>
      <Typography variant="h4" align="center" gutterBottom>
        Subject Marks
      </Typography>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Subject</StyledTableCell>
            <StyledTableCell>Marks</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {subjectMarks.map((result, index) => {
            if (!result.subName || !result.marksObtained) {
              return null;
            }
            return (
              <StyledTableRow key={index}>
                <StyledTableCell>{result.subName.subName}</StyledTableCell>
                <StyledTableCell>{result.marksObtained}</StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
    </React.Fragment>
  );

  const renderChartSection = () => (
    <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
  );

  const renderClassDetailsSection = () => (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Class Details
      </Typography>
     
      <Typography variant="h6" gutterBottom>
        And these are the subjects:
      </Typography>
      {subjectsList.map((subject, index) => (
        <div key={index}>
          <Typography variant="subtitle1">
            {subject.subName} ({subject.subCode})
          </Typography>
        </div>
      ))}
    </Container>
  );

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {subjectMarks.length > 0 ? (
            <>
              {selectedSection === "table" && renderTableSection()}
              {selectedSection === "chart" && renderChartSection()}

              <Paper
                sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
                elevation={3}
              >
                <BottomNavigation
                  value={selectedSection}
                  onChange={handleSectionChange}
                  showLabels
                >
                  <BottomNavigationAction
                    label="Table"
                    value="table"
                    icon={
                      selectedSection === "table" ? (
                        <TableChartIcon />
                      ) : (
                        <TableChartOutlinedIcon />
                      )
                    }
                  />
                  <BottomNavigationAction
                    label="Chart"
                    value="chart"
                    icon={
                      selectedSection === "chart" ? (
                        <InsertChartIcon />
                      ) : (
                        <InsertChartOutlinedIcon />
                      )
                    }
                  />
                </BottomNavigation>
              </Paper>
            </>
          ) : (
            renderClassDetailsSection()
          )}
        </div>
      )}
    </>
  );
};

export default StudentSubjects;
