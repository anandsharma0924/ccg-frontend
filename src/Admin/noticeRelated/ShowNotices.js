import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Paper, Box, IconButton, CircularProgress, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import DeleteIcon from "@mui/icons-material/Delete";
import { GreenButton } from '../../Conponent/buttonStyles';
import TableTemplate from '../../Conponent/TableTemplate';
import SpeedDialTemplate from '../../Conponent/SpeedDialTemplate';

const ShowNotices = () => {
    const navigate = useNavigate();
    const [noticesList, setNoticesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/notice/all`);
                setNoticesList(response.data);
                console.log(response)
            } catch (err) {
                setError(err.response ? err.response.data.message : "Failed to fetch notices");
            } finally {
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

    const deleteHandler = async (deleteID, address) => {
        try {
            await axios.delete(`http://localhost:5000/api/notice/all/${address}/${deleteID}`);
            setNoticesList((prev) => prev.filter((notice) => notice._id !== deleteID));
        } catch (err) {
            setError(err.response ? err.response.data.message : "Failed to delete notice");
        }
    };

    const noticeColumns = [
        { id: 'id', label: 'id', minWidth: 170 },
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'description', label: 'description', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 170 },
    ];

    const noticeRows = noticesList.map((notice) => {
        const date = new Date(notice.date);
        const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
        return {
            id: notice.id,
            title: notice.title,
            description: notice.description,
            date: dateString,
        };
    });

    const NoticeButtonHaver = ({ row }) => (
        <IconButton onClick={() => deleteHandler(row.id, "notice")}>
            <DeleteIcon color="error" />
        </IconButton>
    );

    const actions = [
        {
            icon: <NoteAddIcon color="primary" />, name: 'Add New Notice',
            action: () => navigate("/Admin/dashboard/addnotice")
        },
        {
            icon: <DeleteIcon color="error" />, name: 'Delete All Notices',
            action: () => deleteHandler("all", "notices") // Assuming API supports deleting all notices at once

        }
    ];

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                <GreenButton variant="contained" onClick={() => navigate("/Admin/dashboard/addnotice" , )}>
                    Add Notice
                </GreenButton>
            </Box>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                {noticesList.length > 0 ? (
                    <TableTemplate buttonHaver={NoticeButtonHaver} columns={noticeColumns} rows={noticeRows} />
                ) : (
                    <Typography variant="h6" align="center" sx={{ padding: '16px' }}>
                        No notices available.
                    </Typography>
                )}
                <SpeedDialTemplate actions={actions} />
            </Paper>
            <Outlet/>

        </React.Fragment>
    );
};


export default ShowNotices;
