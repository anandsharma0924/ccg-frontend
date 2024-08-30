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
    const [getresponse, setGetresponse] = useState(false); // Replace this if needed with appropriate condition

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/sclasses');
                setSclassesList(response.data);
                setGetresponse(true); // Set based on response if needed
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
            navigate(`Admin/teachers/choosesubject/${classID}`);
        } else if (situation === "Subject") {
            navigate(`/Admin/addsubject/${classID}`);
        }
    };

    const sclassColumns = [
        { id: 'name', label: 'Class Name', minWidth: 170 },
    ];

    const sclassRows = sclassesList.map((sclass) => ({
        name: sclass.sclassName,
        id: sclass._id,
    }));

    const SclassButtonHaver = ({ row }) => (
        <div>
            <PurpleButton variant="contained" onClick={() => navigateHandler(row.id)}>
                Choose
            </PurpleButton>
        </div>
    );

    // Handle error state rendering
    if (error) {
        console.log(error);
        return <div>Error: {error}</div>;
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {getresponse ? (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <Button variant="contained" onClick={() => navigate("/Admin/addclass")}>
                                Add Class
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Typography variant="h6" gutterBottom component="div">
                                Choose a class
                            </Typography>
                            {Array.isArray(sclassesList) && sclassesList.length > 0 && (
                                <TableTemplate buttonHaver={SclassButtonHaver} columns={sclassColumns} rows={sclassRows} />
                            )}
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default ChooseClass;
