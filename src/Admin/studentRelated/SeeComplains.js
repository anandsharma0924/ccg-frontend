import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Paper, Box, Checkbox
} from '@mui/material';
import TableTemplate from '../../Conponent/TableTemplate';

const SeeComplains = () => {
  const [complainsList, setComplainsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('currentUser')); // Assuming the user is stored in localStorage

  useEffect(() => {
    const fetchComplains = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/complains/Complain`);
        setComplainsList(res.data);
        console.log("hello")
        setLoading(false);
        setResponse(res.data.length === 0);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchComplains();
  });

  if (error) {
    console.log(error);
  }

  const complainColumns = [
    { id: 'user', label: 'User', minWidth: 170 },
    { id: 'complaint', label: 'Complaint', minWidth: 100 },
    { id: 'date', label: 'Date', minWidth: 170 },
  ];

  const complainRows = complainsList.map((complain) => {
    const date = new Date(complain.date);
    const dateString = date.toString() !== "Invalid Date" ? date.toISOString().substring(0, 10) : "Invalid Date";
    return {
      user: complain.user.name,
      complaint: complain.complaint,
      date: dateString,
      id: complain._id,
    };
  });

  const ComplainButtonHaver = ({ row }) => {
    return (
      <>
        <Checkbox />
      </>
    );
  };

  return (
    <>
      {loading ?
        <div>Loading...</div>
        :
        <>
          {response ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              No Complains Right Now
            </Box>
            :
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              {complainsList.length > 0 &&
                <TableTemplate buttonHaver={ComplainButtonHaver} columns={complainColumns} rows={complainRows} />
              }
            </Paper>
          }
        </>
      }
    </>
  );
};

export default SeeComplains;
