import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Button,
  IconButton,
} from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { StyledTableCell, StyledTableRow } from "../../Conponent/styles";
import { BlueButton } from "../../Conponent/buttonStyles";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import SpeedDialTemplate from "../../Conponent/SpeedDialTemplate";
import Popup from "../../Conponent/Popup";

const ShowTeachers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [teachersList, setTeachersList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/teachers/");
        setTeachersList(response.data);
        console.log(response.data, "response.data");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const deleteHandler = (deleteID, address) => {
    console.log(deleteID);
    console.log(address);
    setMessage("Sorry, the delete function has been disabled for now.");
    setShowPopup(true);
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 170 }, 
    { id: "teachSubject", label: "Subject", minWidth: 100 },
    { id: "teachSclass", label: "Class", minWidth: 170 },
  ];

  const rows = teachersList.map((teacher) => ({
    name: teacher.name,
    email: teacher.email,
    teachSubject: teacher.subject || null,
  }));

  const actions = [
    {
      icon: <PersonAddAlt1Icon color="primary" />,
      name: "Add New Teacher",
      action: () => navigate("/Admin/dashboard/Admin/teachers/chooseclass"),
    },
    {
      icon: <PersonRemoveIcon color="error" />,
      name: "Delete All Teachers",
      action: () => deleteHandler(null, "Teachers"),
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
              <StyledTableCell align="center">Actions</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <StyledTableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    if (column.id === "teachSubject") {
                      return (
                        <StyledTableCell key={column.id} align={column.align}>
                          {value ? (
                            value
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() =>
                                navigate(
                                  `Admin/teachers/choosesubject/${row.teachSclassID}/${row.id}`
                                )
                              }
                            >
                              Add Subject
                            </Button>
                          )}
                        </StyledTableCell>
                      );
                    }
                    return (
                      <StyledTableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </StyledTableCell>
                    );
                  })}
                  <StyledTableCell align="center">
                    <IconButton
                      onClick={() => deleteHandler(row.id, "Teacher")}
                    >
                      <PersonRemoveIcon color="error" />
                    </IconButton>
                    <BlueButton
                      variant="contained"
                      onClick={() => navigate(`Admin/teachers/teacher/1`)}
                    >
                      View
                      </BlueButton>
                      </StyledTableCell>
                      <Outlet />
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        <hr />
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 5));
          setPage(0);
        }}
      />

      <SpeedDialTemplate actions={actions} />
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
    </Paper>
  );
};

export default ShowTeachers;
