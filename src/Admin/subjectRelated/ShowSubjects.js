import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
    Paper, Box, IconButton,
} from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import TableTemplate from '../../Conponent/TableTemplate';

import { BlueButton, GreenButton } from '../../Conponent/buttonStyles';
import SpeedDialTemplate from '../../Conponent/SpeedDialTemplate';
import Popup from '../../Conponent/Popup';

const ShowSubjects = () => {
    const navigate = useNavigate();
    const [subjectsList, setSubjectsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/subjects/');
                setSubjectsList(response.data);
                console.log(response, "response");
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSubjects();
    }, []);

    const deleteHandler = async (deleteID, address) => {
        if (!deleteID) {
            setMessage("Sorry, the delete function has been disabled for now.");
            setShowPopup(true);
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/subjects/${deleteID}`);
            setSubjectsList(subjectsList.filter(subject => subject.id !== deleteID));
            setMessage("Subject deleted successfully.");
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setShowPopup(true);
        }
    };

    const deleteAllSubjects = async () => {
        try {
            await axios.delete('http://localhost:5000/api/subjects/');
            setSubjectsList([]); // Clear the subjects list
            setMessage("All subjects have been deleted.");
        } catch (err) {
            setMessage(`Error: ${err.message}`);
        } finally {
            setShowPopup(true);
        }
    };

    const subjectColumns = [
        { id: 'subjectName', label: 'Subject Name', minWidth: 170 },
        { id: 'sessions', label: 'Sessions', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
    ];

    const subjectRows = subjectsList.map((subject) => ({
        subjectName: subject.subjectName,
        sessions: subject.session,
        sclassName: subject.sclassName, // Adjust if necessary
        id: subject.id // Ensure `id` is included for deletion
    }));

    const SubjectsButtonHaver = ({ row }) => (
        <div>
            <IconButton onClick={() => deleteHandler(row.id, "Subject")}>
                <DeleteIcon color="error" />
            </IconButton>
            <BlueButton variant="contained"
                onClick={() => navigate(`/Admin/subjects/subject/${row.sclassID}/${row.id}`)}>
                View
            </BlueButton>
        </div>
    );

    const actions = [
        {
            icon: <PostAddIcon color="primary" />, name: 'Add New Subject',
            action: () => navigate("/Admin/dashboard/chooseclass")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Subjects',
            action: deleteAllSubjects // Call the deleteAllSubjects function
        }
    ];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <GreenButton variant="contained"
                    onClick={() => navigate("/Admin/dashboard/chooseclass")}>
                    Add Subjects
                </GreenButton>
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                {subjectsList.length > 0 &&
                    <TableTemplate buttonHaver={SubjectsButtonHaver} columns={subjectColumns} rows={subjectRows} />
                }
                <SpeedDialTemplate actions={actions} />
            </Paper>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </div>
    );
};

export default ShowSubjects;
