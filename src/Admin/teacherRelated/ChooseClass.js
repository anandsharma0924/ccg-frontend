import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PurpleButton } from '../../Conponent/buttonStyles';
import TableTemplate from '../../Conponent/TableTemplate';
import axios from 'axios';

const ChooseClass = ({ situation }) => {
    const navigate = useNavigate();
    const [sclassesList, setSclassesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/classes/');
                console.log(response , "res")
                setSclassesList(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const navigateHandler = (classID) => {
        if (situation === "Teacher") {
            navigate(`/Admin/dashboard/teachers/choosesubject/${classID}`);
        } else if (situation === "Subject") {
            navigate(`/Admin/addsubject/${classID}`);
        }
    };

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ];

    const sclassRows = sclassesList.map((sclass) => ({
        name: sclass.name,
        id: sclass.id,
    }));

    const SclassButtonHaver = ({ row }) => (
        <PurpleButton variant="contained" onClick={() => navigateHandler(row.id)}>
            Choose
        </PurpleButton>
    );

    if (error) {
        return <Typography color="error">Error: {error}</Typography>;
    }

    return (
        <>
            {loading ? (
                <Typography>Loading...</Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '16px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                        <Button variant="contained" onClick={() => navigate("/Admin/addclass")}>
                            Add Class
                        </Button>
                    </Box>
                    {Array.isArray(sclassesList) && sclassesList.length > 0 ? (
                        <>
                            <Typography variant="h6" gutterBottom>
                                Choose a class
                            </Typography>
                            <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                        </>
                    ) : (
                        <Typography>No classes available.</Typography>
                    )}
                </Box>
            )}
        </>
    );
};

export default ChooseClass;
