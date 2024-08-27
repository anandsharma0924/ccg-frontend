import { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
    Paper, Box, IconButton, Button, ButtonGroup, ClickAwayListener, Grow, Popper, MenuItem, MenuList
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { BlackButton, BlueButton, GreenButton } from '../../Conponent/buttonStyles';
import TableTemplate from '../../Conponent/TableTemplate';
import SpeedDialTemplate from '../../Conponent/SpeedDialTemplate';
import Popup from '../../Conponent/Popup';
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';

const ShowStudents = () => {
    const navigate = useNavigate();
    const [studentsList, setStudentsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");
    const currentUser = { _id: 'user_id_placeholder' };  // Replace with actual user ID

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                // const response = await axios.get(`/api/students/${currentUser._id}`);
                const response = await axios.get(`http://localhost:5000/api/student/`);
                setStudentsList(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, [currentUser._id]);

    const deleteHandler = (deleteID, address) => {
        setMessage("Sorry, the delete function has been disabled for now.");
        setShowPopup(true);
    };

    const studentColumns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'rollNum', label: 'Roll Number', minWidth: 100 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];

    const studentRows = studentsList.map((student) => ({
        name: student.name,
        rollNum: student.rollNum,
        sclassName: student.sclassName,
        id: student._id,
    }));

    const StudentButtonHaver = ({ row }) => {
        const options = ['Take Attendance', 'Provide Marks'];
        const [open, setOpen] = useState(false);
        const anchorRef = useRef(null);
        const [selectedIndex, setSelectedIndex] = useState(0);

        const handleClick = () => {
            if (selectedIndex === 0) {
                navigate(`/Admin/students/student/attendance/${row.id}`);
            } else if (selectedIndex === 1) {
                navigate(`/Admin/students/student/marks/${row.id}`);
            }
        };

        const handleToggle = () => setOpen((prevOpen) => !prevOpen);
        const handleMenuItemClick = (event, index) => {
            setSelectedIndex(index);
            setOpen(false);
        };
        const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) return;
            setOpen(false);
        };

        return (
            <div>
                <IconButton onClick={() => deleteHandler(row.id, "Student")}>
                    <PersonRemoveIcon color="error" />
                </IconButton>
                <BlueButton variant="contained" onClick={() => navigate(`/Admin/students/student/${row.id}`)}>
                    View
                </BlueButton>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                    <Button onClick={handleClick}>{options[selectedIndex]}</Button>
                    <BlackButton
                        size="small"
                        onClick={handleToggle}
                    >
                        {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </BlackButton>
                </ButtonGroup>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                        <Grow {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList autoFocusItem>
                                        {options.map((option, index) => (
                                            <MenuItem key={option} selected={index === selectedIndex} onClick={(event) => handleMenuItemClick(event, index)}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        );
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
            action: () => navigate("/Admin/addstudents")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
            action: () => deleteHandler(currentUser._id, "Students")
        },
    ];

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                        <GreenButton variant="contained" onClick={() => navigate("/Admin/addstudents")}>
                            Add Students
                        </GreenButton>
                    </Box>
                    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                        {studentsList.length > 0 && (
                            <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                        )}
                        <SpeedDialTemplate actions={actions} />
                    </Paper>
                </>
            )}
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    );
};

export default ShowStudents;
