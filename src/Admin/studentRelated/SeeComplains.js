import React, { useState, useEffect } from 'react';
import {
  Paper, Box, Checkbox
} from '@mui/material';
import axios from 'axios';
import TableTemplate from '../../Conponent/TableTemplate';

const SeeComplains = () => {
  const [complainsList, setComplainsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const currentUser = { _id: 'currentUser_id' }; // Replace this with actual user data

  useEffect(() => {
    const fetchComplains = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/complain/`);
        setComplainsList(data);
        console.log(data ,"data data")
        setResponse(data.length === 0); // Check if there are no complains
      } catch (err) {
        setError('Failed to fetch complaints');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplains();
  }, [currentUser._id]);

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = complainsList && complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: complain.user,
      complaint: complain.content,
      date: complain.date,
      id: complain._id,
    };
  });

  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
        <Checkbox inputProps={{ 'aria-label': 'Checkbox demo' }} />
      </>
    );
  };

  if (error) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>{error}</Box>;
  }

  return (
    <>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>Loading...</Box>
      ) : (
        <>
          {response ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              No Complains Right Now
            </Box>
          ) : (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              {complainsList.length > 0 && (
                <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
              )}
            </Paper>
          )}
        </>
      )}
    </>
  );
};

export default SeeComplains;
