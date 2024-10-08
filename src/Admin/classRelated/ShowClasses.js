import React, { useEffect, useState } from "react";
import {
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Outlet, useNavigate } from "react-router-dom";
import { BlueButton, GreenButton } from "../../Conponent/buttonStyles";
import TableTemplate from "../../Conponent/TableTemplate";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddCardIcon from "@mui/icons-material/AddCard";
import styled from "styled-components";
import SpeedDialTemplate from "../../Conponent/SpeedDialTemplate";
import Popup from "../../Conponent/Popup";
import axios from "axios";

const ShowClasses = () => {
  const navigate = useNavigate();
  const [sclassesList, setSclassesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const currentUser = { _id: "adminID123" }; // Example current user data
  const adminID = currentUser._id;

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/classes/`);
        setSclassesList(response.data);
      } catch (err) {
        setError(err.message || "Error fetching classes.");
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const deleteHandler = async (deleteID) => {
    try {
      await axios.delete(`http://localhost:5000/api/classes/${deleteID}`);
      setMessage("Class deleted successfully.");
      setShowPopup(true);
      setSclassesList(sclassesList.filter(sclass => sclass.id !== deleteID));
    } catch (err) {
      setMessage(`Error deleting class: ${err.message || "An error occurred."}`);
      setShowPopup(true);
    }
  };

  const sclassColumns = [
    { id: "name", label: "Class Name", minWidth: 170 },
    { id: "date", label: "Create Date", minWidth: 170 },
  ];

  const sclassRows = sclassesList.map((sclass) => ({
    name: sclass.name, 
    id: sclass.id,
    date: sclass.date,
  }));

  const SclassButtonHaver = ({ row }) => {
    const actions = [
      {
        icon: <PostAddIcon />,
        name: "Add Subjects",
        action: () => navigate("/Admin/dashboard/Admin/addsubject/" + row.id),
      },
      {
        icon: <PersonAddAlt1Icon />,
        name: "Add Student",
        action: () => navigate(`/Admin/dashboard/class/addstudents/${row.id}`  ),
      },
    ];

    return (
      <ButtonContainer>
        <IconButton
          onClick={() => deleteHandler(row.id)}
          color="secondary"
        >
          <DeleteIcon color="error" />
        </IconButton>
        <BlueButton
          variant="contained"
          onClick={() => navigate(`/Admin/dashboard/Time/${row.id}`)}
        >
          View
        </BlueButton>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <React.Fragment>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Tooltip title="Add Students & Subjects">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <h5>Add</h5>
              <SpeedDialIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: styles.styledPaper,
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {actions.map((action, index) => (
            <MenuItem key={index} onClick={action.action}>
              <ListItemIcon fontSize="small">{action.icon}</ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  };

  const actions = [
    {
      icon: <AddCardIcon color="primary" />,
      name: "Add New Class",
      action: () => navigate("/Admin/dashboard/Admin/addclass"),
    },
    {
      icon: <DeleteIcon color="error" />,
      name: "Delete All Classes",
      action: () => deleteHandler(adminID),
    },
  ];

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {error ? (
            <div>Error: {error}</div>
          ) : (
            <div>
              {sclassesList.length > 0 && (
                <TableTemplate
                  buttonHaver={SclassButtonHaver}
                  columns={sclassColumns}
                  rows={sclassRows}
                />
              )}
              <SpeedDialTemplate actions={actions} />
            </div>
          )}
        </>
      )}
      <Popup
        message={message}
        setShowPopup={setShowPopup}
        showPopup={showPopup}
      />
      <Outlet />
    </div>
  );
};

export default ShowClasses;

const styles = {
  styledPaper: {
    overflow: "visible",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    mt: 1.5,
    "& .MuiAvatar-root": {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    "&:before": {
      content: '""',
      display: "block",
      position: "absolute",
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: "background.paper",
      transform: "translateY(-50%) rotate(45deg)",
      zIndex: 0,
    },
  },
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;
